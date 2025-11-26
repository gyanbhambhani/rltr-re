import { createClient } from '../server'
import type { Contact, ContactType, ContactSource } from '@/types/supabase'

export async function getAllContacts() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Contact[]
}

export async function getContactById(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) throw error
  return data as Contact
}

export async function createContact(
  contact: {
    first_name: string
    last_name: string
    email?: string | null
    phone?: string | null
    type?: ContactType
    source?: ContactSource
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert({
      ...contact,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw error
  return data as Contact
}

export async function updateContact(
  id: string,
  updates: Partial<Omit<Contact, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('contacts')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data as Contact
}

