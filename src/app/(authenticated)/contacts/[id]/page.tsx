import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Table, TableHeader, TableHead, TableRow, TableCell } from '@/app/components/ui/Table'
import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { getContactById } from '@/lib/supabase/queries/contacts'
import { getAllTransactions } from '@/lib/supabase/queries/transactions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'

const typeLabels: Record<string, string> = {
  buyer: 'Buyer',
  seller: 'Seller',
  lender: 'Lender',
  other: 'Other',
}

const sourceLabels: Record<string, string> = {
  csv_import: 'CSV Import',
  manual: 'Manual',
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

export default async function ContactDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const contact = await getContactById(params.id)

  if (!contact) {
    notFound()
  }

  // Get related transactions
  const allTransactions = await getAllTransactions()
  const relatedTransactions = allTransactions.filter(
    (tx: any) =>
      tx.buyer_contact_id === contact.id || tx.seller_contact_id === contact.id
  )

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/contacts"
          className="text-sm text-slate-600 hover:text-slate-900 mb-4 inline-block"
        >
          ← Back to Contacts
        </Link>
      </div>

      <PageHeader
        title={`${contact.first_name} ${contact.last_name}`}
        description={contact.email || 'Contact details'}
        action={
          <Button variant="outline" disabled>
            Edit Contact
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Contact Information</h2>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500">First Name</dt>
                  <dd className="mt-1 text-sm text-slate-900">{contact.first_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Last Name</dt>
                  <dd className="mt-1 text-sm text-slate-900">{contact.last_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Email</dt>
                  <dd className="mt-1 text-sm text-slate-900">{contact.email || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Phone</dt>
                  <dd className="mt-1 text-sm text-slate-900">{contact.phone || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Type</dt>
                  <dd className="mt-1">
                    <Badge variant="default">{typeLabels[contact.type]}</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Source</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {sourceLabels[contact.source]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Created</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {format(new Date(contact.created_at), 'MMM d, yyyy')}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Related Transactions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Related Transactions</h2>
            </CardHeader>
            <CardContent>
              {relatedTransactions.length === 0 ? (
                <EmptyState
                  title="No transactions yet"
                  description="This contact hasn't been linked to any transactions yet."
                />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Offer Price</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <tbody>
                      {relatedTransactions.map((tx: any) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">
                            <Link href={`/transactions/${tx.id}`} className="hover:underline">
                              {tx.property?.address || '—'}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {tx.buyer_contact_id === contact.id ? 'Buyer' : 'Seller'}
                          </TableCell>
                          <TableCell>{tx.stage}</TableCell>
                          <TableCell>{formatCurrency(tx.offer_price)}</TableCell>
                          <TableCell>
                            {format(new Date(tx.created_at), 'MMM d, yyyy')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/transactions/new?buyer_contact_id=${contact.id}`}>
                <Button variant="outline" className="w-full">
                  Create Transaction
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

