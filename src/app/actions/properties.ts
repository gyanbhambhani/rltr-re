'use server'

import { revalidatePath } from 'next/cache'
import * as propertiesQueries from '@/lib/supabase/queries/properties'

export async function createPropertyAction(formData: FormData) {
  const address = formData.get('address') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const zip = formData.get('zip') as string
  const mls_id = formData.get('mls_id') as string | null
  const list_price = formData.get('list_price') ? parseFloat(formData.get('list_price') as string) : null
  const beds = formData.get('beds') ? parseInt(formData.get('beds') as string) : null
  const baths = formData.get('baths') ? parseFloat(formData.get('baths') as string) : null
  const sqft = formData.get('sqft') ? parseInt(formData.get('sqft') as string) : null

  try {
    const property = await propertiesQueries.createProperty({
      address,
      city,
      state,
      zip,
      mls_id: mls_id || null,
      list_price,
      beds,
      baths,
      sqft,
    })
    revalidatePath('/properties')
    return { success: true, data: property }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updatePropertyAction(id: string, formData: FormData) {
  const updates: any = {}
  
  if (formData.has('address')) updates.address = formData.get('address') as string
  if (formData.has('city')) updates.city = formData.get('city') as string
  if (formData.has('state')) updates.state = formData.get('state') as string
  if (formData.has('zip')) updates.zip = formData.get('zip') as string
  if (formData.has('mls_id')) updates.mls_id = formData.get('mls_id') as string | null
  if (formData.has('list_price')) {
    const price = formData.get('list_price') as string
    updates.list_price = price ? parseFloat(price) : null
  }
  if (formData.has('beds')) {
    const beds = formData.get('beds') as string
    updates.beds = beds ? parseInt(beds) : null
  }
  if (formData.has('baths')) {
    const baths = formData.get('baths') as string
    updates.baths = baths ? parseFloat(baths) : null
  }
  if (formData.has('sqft')) {
    const sqft = formData.get('sqft') as string
    updates.sqft = sqft ? parseInt(sqft) : null
  }

  try {
    const property = await propertiesQueries.updateProperty(id, updates)
    revalidatePath('/properties')
    revalidatePath(`/properties/${id}`)
    return { success: true, data: property }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

