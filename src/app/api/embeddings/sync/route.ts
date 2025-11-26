import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { syncEmbeddings } from '@/lib/search/embedding-sync';

const TYPES = ['contacts', 'properties', 'transactions', 'documents'] as const;

const bodySchema = z.object({
  types: z.array(z.enum(TYPES)).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const payload = bodySchema.parse(await request.json().catch(() => ({})));
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const types = payload.types ?? [...TYPES];
    await syncEmbeddings(supabase, user.id, types);

    return NextResponse.json({ status: 'ok', synced: types });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues.map((i) => i.message).join(', ') }, { status: 400 });
    }

    console.error('Failed to sync embeddings', err);
    return NextResponse.json({ error: 'Failed to sync embeddings' }, { status: 500 });
  }
}
