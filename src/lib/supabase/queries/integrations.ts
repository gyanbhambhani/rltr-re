import { createClient } from '../server'
import type { IntegrationConnection, IntegrationType, IntegrationStatus } from '@/types/supabase'

export async function getIntegration(
  type: IntegrationType,
  provider?: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  let query = supabase
    .from('integration_connections')
    .select('*')
    .eq('user_id', user.id)
    .eq('type', type)

  if (provider) {
    query = query.eq('provider', provider)
  }

  const { data, error } = await query.single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return data as IntegrationConnection | null
}

export async function createOrUpdateIntegration(
  integration: {
    type: IntegrationType
    provider: string
    config: any
    status: IntegrationStatus
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Check if integration exists
  const existing = await getIntegration(integration.type, integration.provider)

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from('integration_connections')
      .update({
        config: integration.config,
        status: integration.status,
      })
      .eq('id', existing.id)
      .select()
      .single()

    if (error) throw error
    return data as IntegrationConnection
  } else {
    // Create new
    const { data, error } = await supabase
      .from('integration_connections')
      .insert({
        ...integration,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) throw error
    return data as IntegrationConnection
  }
}

