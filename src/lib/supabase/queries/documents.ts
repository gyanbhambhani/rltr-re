import { createClient } from '../server'
import type { TransactionDocument, DocumentType } from '@/types/supabase'

export async function getDocumentsByTransaction(transactionId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Verify transaction belongs to user
  const { data: transaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('id', transactionId)
    .eq('user_id', user.id)
    .single()

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  const { data, error } = await supabase
    .from('transaction_documents')
    .select('*')
    .eq('transaction_id', transactionId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as TransactionDocument[]
}

export async function createDocument(
  transactionId: string,
  document: {
    name: string
    type?: DocumentType
    file_url: string
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Verify transaction belongs to user
  const { data: transaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('id', transactionId)
    .eq('user_id', user.id)
    .single()

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  const { data, error } = await supabase
    .from('transaction_documents')
    .insert({
      ...document,
      transaction_id: transactionId,
    })
    .select()
    .single()

  if (error) throw error
  return data as TransactionDocument
}

