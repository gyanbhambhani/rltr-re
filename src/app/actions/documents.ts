'use server'

import { revalidatePath } from 'next/cache'
import * as documentsQueries from '@/lib/supabase/queries/documents'
import type { DocumentType } from '@/types/supabase'

export async function createDocumentAction(transactionId: string, formData: FormData) {
  const name = formData.get('name') as string
  const type = (formData.get('type') as DocumentType) || 'other'
  const file_url = formData.get('file_url') as string

  try {
    const document = await documentsQueries.createDocument(transactionId, {
      name,
      type,
      file_url,
    })
    revalidatePath(`/transactions/${transactionId}`)
    return { success: true, data: document }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

