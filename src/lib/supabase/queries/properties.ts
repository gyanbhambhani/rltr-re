import { createClient } from '../server'
import type { Property } from '@/types/supabase'

export async function getAllProperties() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Property[]
}

export async function getPropertyById(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) throw error
  return data as Property
}

export async function createProperty(
  property: {
    mls_id?: string | null
    address: string
    city: string
    state: string
    zip: string
    list_price?: number | null
    beds?: number | null
    baths?: number | null
    sqft?: number | null
    raw_mls_json?: any
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('properties')
    .insert({
      ...property,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw error
  return data as Property
}

export async function updateProperty(
  id: string,
  updates: Partial<Omit<Property, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data as Property
}

