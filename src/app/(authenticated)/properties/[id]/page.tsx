import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Table, TableHeader, TableHead, TableRow, TableCell } from '@/app/components/ui/Table'
import { Button } from '@/app/components/ui/Button'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { getPropertyById } from '@/lib/supabase/queries/properties'
import { getAllTransactions } from '@/lib/supabase/queries/transactions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'

function formatCurrency(amount: number | null) {
  if (!amount) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  // Get related transactions
  const allTransactions = await getAllTransactions()
  const relatedTransactions = allTransactions.filter(
    (tx: any) => tx.property_id === property.id
  )

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/properties"
          className="text-sm text-slate-600 hover:text-slate-900 mb-4 inline-block"
        >
          ← Back to Properties
        </Link>
      </div>

      <PageHeader
        title={property.address}
        description={`${property.city}, ${property.state} ${property.zip}`}
        action={
          <Button variant="outline" disabled>
            Edit Property
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-900">Property Details</h2>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500">List Price</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-900">
                    {formatCurrency(property.list_price)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">MLS ID</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {property.mls_id || '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Bedrooms</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {property.beds || '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Bathrooms</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {property.baths || '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Square Feet</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {property.sqft ? property.sqft.toLocaleString() : '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Created</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {format(new Date(property.created_at), 'MMM d, yyyy')}
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
                  description="This property hasn't been linked to any transactions yet."
                />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Buyer</TableHead>
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
                              {tx.buyer
                                ? `${tx.buyer.first_name} ${tx.buyer.last_name}`
                                : '—'}
                            </Link>
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
              <Link href={`/transactions/new?property_id=${property.id}`}>
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

