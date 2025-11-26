import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { getEmbeddingForText } from '@/lib/embeddings';

const ENTITY_TYPES = ['contacts', 'properties', 'transactions', 'documents'] as const;

type EntityType = (typeof ENTITY_TYPES)[number];

type ResultType = 'contact' | 'property' | 'transaction' | 'document';

type SearchResult = {
  type: ResultType;
  id: string;
  title: string;
  subtitle: string;
  score: number;
  href: string;
};

const searchSchema = z.object({
  query: z.string().min(2).max(2000),
  types: z
    .array(z.enum(ENTITY_TYPES))
    .optional()
    .transform((value) => value?.length ? value : undefined),
  limit: z.number().int().min(1).max(50).optional(),
});

const typeMap: Record<EntityType, ResultType> = {
  contacts: 'contact',
  properties: 'property',
  transactions: 'transaction',
  documents: 'document',
};

const DEFAULT_LIMIT = 20;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { query, types, limit } = searchSchema.parse(body);
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const embedding = await getEmbeddingForText(query);
    const requestedTypes: EntityType[] = types ?? [...ENTITY_TYPES];
    const perTypeLimit = limit ?? DEFAULT_LIMIT;

    const resultBuckets = await Promise.all(
      requestedTypes.map(async (type) => {
        switch (type) {
          case 'contacts':
            return fetchContactResults(supabase, embedding, user.id, perTypeLimit);
          case 'properties':
            return fetchPropertyResults(supabase, embedding, user.id, perTypeLimit);
          case 'transactions':
            return fetchTransactionResults(supabase, embedding, user.id, perTypeLimit);
          case 'documents':
            return fetchDocumentResults(supabase, embedding, user.id, perTypeLimit);
          default:
            return [];
        }
      })
    );

    const merged = resultBuckets
      .flat()
      .sort((a, b) => b.score - a.score)
      .slice(0, perTypeLimit);

    return NextResponse.json({ results: merged });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues.map((i) => i.message).join(', ') }, { status: 400 });
    }

    console.error('Semantic search failed', error);
    return NextResponse.json({ error: 'Unable to process search right now.' }, { status: 500 });
  }
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

const formatPrice = (value?: number | string | null) => {
  const numeric = typeof value === 'string' ? Number(value) : value;
  return typeof numeric === 'number' && !Number.isNaN(numeric)
    ? `$${numeric.toLocaleString()}`
    : '';
};

async function fetchContactResults(
  supabase: SupabaseServerClient,
  queryEmbedding: number[],
  userId: string,
  matchCount: number
): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc('match_contacts', {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    target_user_id: userId,
  });

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    type: typeMap.contacts,
    id: row.id,
    title: `${row.first_name} ${row.last_name}`.trim(),
    subtitle: [row.email, row.phone].filter(Boolean).join(' • ') || 'Contact',
    score: Number(row.similarity ?? 0),
    href: `/contacts/${row.id}`,
  }));
}

async function fetchPropertyResults(
  supabase: SupabaseServerClient,
  queryEmbedding: number[],
  userId: string,
  matchCount: number
): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc('match_properties', {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    target_user_id: userId,
  });

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    type: typeMap.properties,
    id: row.id,
    title: [row.address, row.city, row.state].filter(Boolean).join(', '),
    subtitle:
      [
        row.beds ? `${row.beds} bd` : '',
        row.baths ? `${Number(row.baths).toFixed(1)} ba` : '',
        formatPrice(row.list_price),
      ]
        .filter(Boolean)
        .join(' • ') || 'Property',
    score: Number(row.similarity ?? 0),
    href: `/properties/${row.id}`,
  }));
}

async function fetchTransactionResults(
  supabase: SupabaseServerClient,
  queryEmbedding: number[],
  userId: string,
  matchCount: number
): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc('match_transactions', {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    target_user_id: userId,
  });

  if (error) throw error;

  return (data ?? []).map((row: any) => {
    const buyer = row.buyer_name?.trim();
    const location = row.property_address
      ? `${row.property_address}, ${row.property_city ?? ''}`.trim()
      : 'Transaction';

    return {
      type: typeMap.transactions,
      id: row.id,
      title: buyer ? `${location} • ${buyer}` : location,
      subtitle: [row.stage ? `Stage: ${row.stage}` : '', formatPrice(row.offer_price)].filter(Boolean).join(' • '),
      score: Number(row.similarity ?? 0),
      href: `/transactions/${row.id}`,
    } satisfies SearchResult;
  });
}

async function fetchDocumentResults(
  supabase: SupabaseServerClient,
  queryEmbedding: number[],
  userId: string,
  matchCount: number
): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc('match_transaction_documents', {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    target_user_id: userId,
  });

  if (error) throw error;

  return (data ?? []).map((row: any) => {
    const property = row.property_address ? `${row.property_address}, ${row.property_city ?? ''}` : undefined;
    const subtitleParts = [property, row.stage ? `Stage: ${row.stage}` : undefined].filter(Boolean);

    return {
      type: typeMap.documents,
      id: row.id,
      title: row.name ?? 'Document',
      subtitle: subtitleParts.join(' • ') || 'Transaction document',
      score: Number(row.similarity ?? 0),
      href: `/transactions/${row.transaction_id}?doc=${row.id}`,
    } satisfies SearchResult;
  });
}
