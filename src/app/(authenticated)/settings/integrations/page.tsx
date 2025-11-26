import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { getIntegration } from '@/lib/supabase/queries/integrations'
import { MLSIntegrationCard } from './components/MLSIntegrationCard'

export default async function IntegrationsPage() {
  const mlsIntegration = await getIntegration('mls')

  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect external services to enhance your workflow"
      />

      <div className="space-y-6">
        {/* MLS Integration */}
        <MLSIntegrationCard initialIntegration={mlsIntegration} />

        {/* Placeholder for other integrations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Email Integration</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Sync your email for automatic contact creation
                </p>
              </div>
              <Badge variant="default">Coming Soon</Badge>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">CRM Integration</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Connect with popular CRM platforms
                </p>
              </div>
              <Badge variant="default">Coming Soon</Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

