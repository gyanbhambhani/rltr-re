import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { getTransactionById } from '@/lib/supabase/queries/transactions'
import { getTasksByTransaction } from '@/lib/supabase/queries/tasks'
import { getDocumentsByTransaction } from '@/lib/supabase/queries/documents'
import { updateTaskStatusAction } from '@/app/actions/tasks'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { TransactionTasks } from './components/TransactionTasks'
import { TransactionDocuments } from './components/TransactionDocuments'

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

function formatCurrency(amount: number | null) {
  if (!amount) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default async function TransactionDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const transaction = await getTransactionById(params.id)
  
  if (!transaction) {
    notFound()
  }

  const [tasks, documents] = await Promise.all([
    getTasksByTransaction(params.id).catch(() => []),
    getDocumentsByTransaction(params.id).catch(() => []),
  ])

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/transactions"
          className="text-sm text-slate-600 hover:text-slate-900 mb-4 inline-block"
        >
          ← Back to Transactions
        </Link>
      </div>

      <PageHeader
        title={transaction.property?.address || 'Transaction'}
        description={
          transaction.buyer
            ? `Buyer: ${transaction.buyer.first_name} ${transaction.buyer.last_name}`
            : 'Transaction details'
        }
        action={
          <Badge variant={stageColors[transaction.stage]}>
            {stageLabels[transaction.stage]}
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500">Offer Price</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-900">
                    {formatCurrency(transaction.offer_price)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Close Date</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-900">
                    {transaction.close_date
                      ? format(new Date(transaction.close_date), 'MMM d, yyyy')
                      : '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Stage</dt>
                  <dd className="mt-1">
                    <Badge variant={stageColors[transaction.stage]}>
                      {stageLabels[transaction.stage]}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Created</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {format(new Date(transaction.created_at), 'MMM d, yyyy')}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Tasks */}
          <TransactionTasks transactionId={params.id} initialTasks={tasks} />

          {/* Documents */}
          <TransactionDocuments transactionId={params.id} initialDocuments={documents} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Property</h2>
            </CardHeader>
            <CardContent>
              {transaction.property ? (
                <div className="space-y-2">
                  <div className="font-medium text-slate-900">
                    {transaction.property.address}
                  </div>
                  <div className="text-sm text-slate-600">
                    {transaction.property.city}, {transaction.property.state}{' '}
                    {transaction.property.zip}
                  </div>
                  {transaction.property.list_price && (
                    <div className="text-sm font-medium text-slate-900">
                      {formatCurrency(transaction.property.list_price)}
                    </div>
                  )}
                  <Link
                    href={`/properties/${transaction.property.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Property →
                  </Link>
                </div>
              ) : (
                <div className="text-sm text-slate-500">No property linked</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Buyer</h2>
            </CardHeader>
            <CardContent>
              {transaction.buyer ? (
                <div className="space-y-2">
                  <div className="font-medium text-slate-900">
                    {transaction.buyer.first_name} {transaction.buyer.last_name}
                  </div>
                  {transaction.buyer.email && (
                    <div className="text-sm text-slate-600">
                      {transaction.buyer.email}
                    </div>
                  )}
                  {transaction.buyer.phone && (
                    <div className="text-sm text-slate-600">
                      {transaction.buyer.phone}
                    </div>
                  )}
                  <Link
                    href={`/contacts/${transaction.buyer_contact_id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Contact →
                  </Link>
                </div>
              ) : (
                <div className="text-sm text-slate-500">No buyer linked</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

