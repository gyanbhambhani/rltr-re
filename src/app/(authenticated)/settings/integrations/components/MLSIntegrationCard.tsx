'use client'

import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { createOrUpdateIntegrationAction } from '@/app/actions/integrations'
import { useState, useTransition } from 'react'
import type { IntegrationConnection, IntegrationStatus } from '@/types/supabase'

interface MLSIntegrationCardProps {
  initialIntegration: IntegrationConnection | null
}

export function MLSIntegrationCard({ initialIntegration }: MLSIntegrationCardProps) {
  const [integration, setIntegration] = useState(initialIntegration)
  const [isConnecting, setIsConnecting] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [provider, setProvider] = useState('crmls')
  const [isPending, startTransition] = useTransition()

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      alert('Please enter an API key')
      return
    }

    setIsConnecting(true)
    startTransition(async () => {
      const result = await createOrUpdateIntegrationAction({
        type: 'mls',
        provider,
        config: { api_key: apiKey },
        status: 'connected',
      })
      if (result.success && result.data) {
        setIntegration(result.data)
        setApiKey('')
        setIsConnecting(false)
      } else {
        alert('Failed to connect: ' + (result.error || 'Unknown error'))
        setIsConnecting(false)
      }
    })
  }

  const handleDisconnect = async () => {
    if (!confirm('Are you sure you want to disconnect MLS integration?')) {
      return
    }

    startTransition(async () => {
      const result = await createOrUpdateIntegrationAction({
        type: 'mls',
        provider: integration?.provider || 'crmls',
        config: {},
        status: 'disconnected',
      })
      if (result.success) {
        setIntegration(null)
      } else {
        alert('Failed to disconnect: ' + (result.error || 'Unknown error'))
      }
    })
  }

  const isConnected = integration?.status === 'connected'

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">MLS Integration</h2>
            <p className="text-sm text-slate-600 mt-1">
              Connect to your MLS provider to import properties automatically
            </p>
          </div>
          <Badge variant={isConnected ? 'success' : 'default'}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm font-medium text-slate-900 mb-1">
                Connected to {integration.provider}
              </div>
              <div className="text-xs text-slate-600">
                Last updated: {new Date(integration.updated_at).toLocaleDateString()}
              </div>
            </div>
            <Button variant="outline" onClick={handleDisconnect} disabled={isPending}>
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="crmls">CRMLS</option>
                <option value="bright">Bright MLS</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your MLS API key"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <Button onClick={handleConnect} disabled={isPending || isConnecting}>
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

