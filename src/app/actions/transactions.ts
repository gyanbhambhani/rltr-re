'use server'

import { revalidatePath } from 'next/cache'
import * as transactionsQueries from '@/lib/supabase/queries/transactions'
import type { TransactionStage } from '@/types/supabase'

export async function createTransactionAction(formData: FormData) {
  const buyer_contact_id = formData.get('buyer_contact_id') as string
  const seller_contact_id = formData.get('seller_contact_id') as string | null
  const property_id = formData.get('property_id') as string
  const stage = (formData.get('stage') as TransactionStage) || 'lead'
  const offer_price = formData.get('offer_price') ? parseFloat(formData.get('offer_price') as string) : null
  const close_date = formData.get('close_date') as string | null

  try {
    const transaction = await transactionsQueries.createTransaction({
      buyer_contact_id,
      seller_contact_id: seller_contact_id || null,
      property_id,
      stage,
      offer_price,
      close_date: close_date || null,
    })
    revalidatePath('/transactions')
    revalidatePath('/dashboard')
    return { success: true, data: transaction }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateTransactionAction(id: string, formData: FormData) {
  const updates: any = {}
  
  if (formData.has('buyer_contact_id')) updates.buyer_contact_id = formData.get('buyer_contact_id') as string
  if (formData.has('seller_contact_id')) updates.seller_contact_id = formData.get('seller_contact_id') as string | null
  if (formData.has('property_id')) updates.property_id = formData.get('property_id') as string
  if (formData.has('stage')) updates.stage = formData.get('stage') as TransactionStage
  if (formData.has('offer_price')) {
    const price = formData.get('offer_price') as string
    updates.offer_price = price ? parseFloat(price) : null
  }
  if (formData.has('close_date')) updates.close_date = formData.get('close_date') as string | null

  try {
    const transaction = await transactionsQueries.updateTransaction(id, updates)
    revalidatePath('/transactions')
    revalidatePath(`/transactions/${id}`)
    revalidatePath('/dashboard')
    return { success: true, data: transaction }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

