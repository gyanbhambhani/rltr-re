'use server'

import { revalidatePath } from 'next/cache'
import * as contactsQueries from '@/lib/supabase/queries/contacts'
import type { ContactType, ContactSource } from '@/types/supabase'

export async function createContactAction(formData: FormData) {
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string
  const email = formData.get('email') as string | null
  const phone = formData.get('phone') as string | null
  const type = (formData.get('type') as ContactType) || 'other'
  const source = (formData.get('source') as ContactSource) || 'manual'

  try {
    const contact = await contactsQueries.createContact({
      first_name,
      last_name,
      email: email || null,
      phone: phone || null,
      type,
      source,
    })
    revalidatePath('/contacts')
    return { success: true, data: contact }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateContactAction(id: string, formData: FormData) {
  const updates: any = {}
  
  if (formData.has('first_name')) updates.first_name = formData.get('first_name') as string
  if (formData.has('last_name')) updates.last_name = formData.get('last_name') as string
  if (formData.has('email')) updates.email = formData.get('email') as string | null
  if (formData.has('phone')) updates.phone = formData.get('phone') as string | null
  if (formData.has('type')) updates.type = formData.get('type') as ContactType

  try {
    const contact = await contactsQueries.updateContact(id, updates)
    revalidatePath('/contacts')
    revalidatePath(`/contacts/${id}`)
    return { success: true, data: contact }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

