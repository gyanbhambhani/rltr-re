import { createClient } from '../server'
import type { Transaction, TransactionStage } from '@/types/supabase'

export async function getAllTransactions() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      buyer:contacts!transactions_buyer_contact_id_fkey(*),
      seller:contacts!transactions_seller_contact_id_fkey(*),
      property:properties(*)
    `)
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as any[]
}

export async function getTransactionById(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      buyer:contacts!transactions_buyer_contact_id_fkey(*),
      seller:contacts!transactions_seller_contact_id_fkey(*),
      property:properties(*)
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) throw error
  return data as any
}

export async function getTransactionsByStage(stage: TransactionStage) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .eq('stage', stage)

  if (error) throw error
  return data as Transaction[]
}

export async function createTransaction(
  transaction: {
    buyer_contact_id: string
    seller_contact_id?: string | null
    property_id: string
    stage?: TransactionStage
    offer_price?: number | null
    close_date?: string | null
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...transaction,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw error
  return data as Transaction
}

export async function updateTransaction(
  id: string,
  updates: Partial<Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data as Transaction
}

