import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { EmptyState } from '@/app/components/ui/EmptyState'

export default async function WorkflowsPage() {
  return (
    <div>
      <PageHeader
        title="Workflows"
        description="Automate your real estate operations with custom workflows"
        action={
          <Button disabled>New Workflow</Button>
        }
      />

      <Card>
        <CardContent className="py-12">
          <EmptyState
            title="Workflows Coming Soon"
            description="Create custom automations to streamline your real estate operations. Build workflows that trigger actions based on transaction stages, send automated emails, schedule follow-ups, and more."
          />
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              What you'll be able to do
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Create custom automation rules for your business logic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Send automated emails and notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Trigger actions based on transaction stages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Schedule follow-ups and reminders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Integrate with external services via MCP</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Example workflows
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Auto-send comps to clients when new listings match criteria</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Create tasks when a transaction moves to a new stage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Send offer notifications when market updates occur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Schedule showing reminders based on calendar events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Generate and send documents automatically</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



