'use server'

import { revalidatePath } from 'next/cache'
import * as integrationsQueries from '@/lib/supabase/queries/integrations'
import type { IntegrationType, IntegrationStatus } from '@/types/supabase'

export async function createOrUpdateIntegrationAction(
  integration: {
    type: IntegrationType
    provider: string
    config: any
    status: IntegrationStatus
  }
) {
  try {
    const result = await integrationsQueries.createOrUpdateIntegration(integration)
    revalidatePath('/settings/integrations')
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

