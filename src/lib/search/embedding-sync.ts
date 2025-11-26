import { getEmbeddingForText, buildContactEmbeddingText, buildPropertyEmbeddingText, buildTransactionEmbeddingText, buildDocumentEmbeddingText } from '@/lib/embeddings';
import type { createClient } from '@/lib/supabase/server';

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

type SyncEntity = 'contacts' | 'properties' | 'transactions' | 'documents';

const MAX_RECORDS_PER_SYNC = 100;

export async function syncEmbeddings(
  supabase: SupabaseServerClient,
  userId: string,
  types: SyncEntity[]
) {
  for (const type of types) {
    switch (type) {
      case 'contacts':
        await syncContacts(supabase, userId);
        break;
      case 'properties':
        await syncProperties(supabase, userId);
        break;
      case 'transactions':
        await syncTransactions(supabase, userId);
        break;
      case 'documents':
        await syncDocuments(supabase, userId);
        break;
      default:
        break;
    }
  }
}

async function syncContacts(supabase: SupabaseServerClient, userId: string) {
  const { data } = await supabase
    .from('contacts')
    .select('*')
    .eq('user_id', userId)
    .limit(MAX_RECORDS_PER_SYNC);

  for (const row of data ?? []) {
    const text = buildContactEmbeddingText(row);
    const embedding = await safeEmbedding(text);
    if (!embedding) continue;

    await supabase.from('contacts').update({ embedding }).eq('id', row.id);
  }
}

async function syncProperties(supabase: SupabaseServerClient, userId: string) {
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', userId)
    .limit(MAX_RECORDS_PER_SYNC);

  for (const row of data ?? []) {
    const text = buildPropertyEmbeddingText(row);
    const embedding = await safeEmbedding(text);
    if (!embedding) continue;

    await supabase.from('properties').update({ embedding }).eq('id', row.id);
  }
}

async function syncTransactions(supabase: SupabaseServerClient, userId: string) {
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .limit(MAX_RECORDS_PER_SYNC);

  if (!transactions?.length) return;

  const propertyIds = Array.from(new Set(transactions.map((t) => t.property_id).filter(Boolean)));
  const contactIds = Array.from(
    new Set(
      transactions
        .flatMap((t) => [t.buyer_contact_id, t.seller_contact_id])
        .filter(Boolean)
    )
  );

  const [{ data: properties }, { data: contacts }] = await Promise.all([
    propertyIds.length
      ? supabase.from('properties').select('id, address, city, state, zip').in('id', propertyIds)
      : Promise.resolve({ data: [] }),
    contactIds.length
      ? supabase.from('contacts').select('id, first_name, last_name').in('id', contactIds)
      : Promise.resolve({ data: [] }),
  ]);

  const propertyMap = new Map((properties ?? []).map((p: any) => [p.id, p]));
  const contactMap = new Map((contacts ?? []).map((c: any) => [c.id, c]));

  for (const row of transactions) {
    const buyer = row.buyer_contact_id ? contactMap.get(row.buyer_contact_id) : undefined;
    const seller = row.seller_contact_id ? contactMap.get(row.seller_contact_id) : undefined;
    const property = row.property_id ? propertyMap.get(row.property_id) : undefined;

    const text = buildTransactionEmbeddingText({
      property_address: property
        ? `${property.address}, ${property.city}, ${property.state} ${property.zip}`
        : undefined,
      buyer_name: buyer ? `${buyer.first_name} ${buyer.last_name}` : undefined,
      seller_name: seller ? `${seller.first_name} ${seller.last_name}` : undefined,
      stage: row.stage,
      offer_price: row.offer_price,
    });
    const embedding = await safeEmbedding(text);
    if (!embedding) continue;

    await supabase.from('transactions').update({ embedding }).eq('id', row.id);
  }
}

async function syncDocuments(supabase: SupabaseServerClient, userId: string) {
  const { data } = await supabase
    .from('transaction_documents')
    .select('*, transaction:transactions!inner(user_id)')
    .eq('transaction.user_id', userId)
    .limit(MAX_RECORDS_PER_SYNC);

  for (const row of data ?? []) {
    const text = buildDocumentEmbeddingText(row);
    const embedding = await safeEmbedding(text);
    if (!embedding) continue;

    await supabase.from('transaction_documents').update({ embedding }).eq('id', row.id);
  }
}

async function safeEmbedding(text: string) {
  try {
    return await getEmbeddingForText(text);
  } catch (error) {
    console.error('Failed to build embedding', error);
    return null;
  }
}
