import { PageHeader } from '@/app/components/ui/PageHeader'
import { Table, TableHeader, TableHead, TableRow, TableCell } from '@/app/components/ui/Table'
import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { getAllTransactions } from '@/lib/supabase/queries/transactions'
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

function formatCurrency(amount: number | null) {
  if (!amount) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default async function TransactionsPage() {
  const transactions = await getAllTransactions()

  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Manage your real estate transactions"
        action={
          <Link href="/transactions/new">
            <Button>New Transaction</Button>
          </Link>
        }
      />

      {transactions.length === 0 ? (
        <div className="text-center py-12 px-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No transactions yet</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Start by creating your first transaction linking a contact and property.
          </p>
          <Link href="/transactions/new">
            <Button>New Transaction</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Address</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Offer Price</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {transactions.map((tx: any) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">
                    <Link href={`/transactions/${tx.id}`} className="hover:underline">
                      {tx.property?.address || '—'}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {tx.buyer
                      ? `${tx.buyer.first_name} ${tx.buyer.last_name}`
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={stageColors[tx.stage]}>
                      {stageLabels[tx.stage]}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(tx.offer_price)}</TableCell>
                  <TableCell>
                    {format(new Date(tx.updated_at), 'MMM d, yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

