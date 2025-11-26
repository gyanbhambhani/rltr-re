import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { StatTile } from '@/app/components/ui/StatTile'
import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { getAllTransactions, getTransactionsByStage } from '@/lib/supabase/queries/transactions'
import { getTasksByTransaction } from '@/lib/supabase/queries/tasks'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format } from 'date-fns'

type TransactionStage = 'lead' | 'offer_drafting' | 'offer_submitted' | 'in_escrow' | 'closed' | 'dead'

const stageLabels: Record<TransactionStage, string> = {
  lead: 'Lead',
  offer_drafting: 'Offer Drafting',
  offer_submitted: 'Offer Submitted',
  in_escrow: 'In Escrow',
  closed: 'Closed',
  dead: 'Dead',
}

const stageColors: Record<TransactionStage, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  lead: 'info',
  offer_drafting: 'warning',
  offer_submitted: 'info',
  in_escrow: 'warning',
  closed: 'success',
  dead: 'error',
}

async function getTodayTasks() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  // Get all transactions for user
  const transactions = await getAllTransactions()
  
  // Get tasks for each transaction
  const allTasks = await Promise.all(
    transactions.map(async (tx) => {
      try {
        const tasks = await getTasksByTransaction(tx.id)
        return tasks
          .filter((task) => task.status !== 'done')
          .map((task) => ({ ...task, transaction: tx }))
      } catch {
        return []
      }
    })
  )

  return allTasks.flat()
}

export default async function DashboardPage() {
  const transactions = await getAllTransactions()
  const todayTasks = await getTodayTasks()
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Get transaction counts by stage
  const stageCounts = await Promise.all(
    (['lead', 'offer_drafting', 'offer_submitted', 'in_escrow', 'closed'] as TransactionStage[]).map(
      async (stage) => {
        const count = await getTransactionsByStage(stage)
        return { stage, count: count.length }
      }
    )
  )

  // Calculate metrics
  const activeTransactions = transactions.filter(
    (tx) => !['closed', 'dead'].includes(tx.stage)
  ).length

  const monthlyVolume = transactions
    .filter((tx) => {
      if (!tx.offer_price) return false
      const txDate = new Date(tx.created_at)
      const now = new Date()
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, tx) => sum + (tx.offer_price || 0), 0)

  // Get documents count (simplified - would need a query for this)
  const docsPending = 0 // Placeholder

  // Get recent transactions for activity feed
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your transaction cockpit"
        action={
          <Link href="/transactions/new">
            <Button>New Transaction</Button>
          </Link>
        }
      />

      {/* Pipeline Overview */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-900">Pipeline Overview</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stageCounts.map(({ stage, count }) => (
              <div key={stage} className="text-center">
                <div className="text-2xl font-semibold text-slate-900 mb-1">{count}</div>
                <div className="text-sm text-slate-600">{stageLabels[stage]}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatTile
          label="Active Transactions"
          value={activeTransactions}
          subtext="In progress"
        />
        <StatTile
          label="This Month's Volume"
          value={`$${(monthlyVolume / 1000000).toFixed(2)}M`}
          subtext="Total offer value"
        />
        <StatTile
          label="Docs Pending"
          value={docsPending}
          subtext="Awaiting review"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-slate-900">Today's Tasks</h2>
          </CardHeader>
          <CardContent>
            {todayTasks.length === 0 ? (
              <EmptyState
                title="No tasks due today"
                description="You're all caught up! Check back tomorrow for new tasks."
              />
            ) : (
              <div className="space-y-3">
                {todayTasks.slice(0, 5).map((task: any) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      className="mt-1"
                      defaultChecked={task.status === 'done'}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">{task.title}</div>
                      <div className="text-xs text-slate-600 mt-1">
                        <Link
                          href={`/transactions/${task.transaction.id}`}
                          className="hover:underline"
                        >
                          {task.transaction.property?.address || 'Transaction'}
                        </Link>
                      </div>
                    </div>
                    <Badge variant={stageColors[task.transaction.stage]}>
                      {stageLabels[task.transaction.stage]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <EmptyState
                title="No recent activity"
                description="Start by creating your first transaction."
              />
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((tx: any) => (
                  <div key={tx.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2" />
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">
                        <Link
                          href={`/transactions/${tx.id}`}
                          className="font-medium hover:underline"
                        >
                          Transaction
                        </Link>{' '}
                        started for{' '}
                        <span className="font-medium">
                          {tx.property?.address || 'Property'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {format(new Date(tx.created_at), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

