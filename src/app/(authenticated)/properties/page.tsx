import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { getAllProperties } from '@/lib/supabase/queries/properties'
import Link from 'next/link'

function formatCurrency(amount: number | null) {
  if (!amount) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default async function PropertiesPage() {
  const properties = await getAllProperties()

  return (
    <div>
      <PageHeader
        title="Properties"
        description="Manage your property listings"
        action={
          <Link href="/properties/new">
            <Button>New Property</Button>
          </Link>
        }
      />

      {properties.length === 0 ? (
        <div className="text-center py-12 px-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties yet</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Start by adding your first property manually or importing from MLS.
          </p>
          <Link href="/properties/new">
            <Button>New Property</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="p-6">
                  <div className="text-lg font-semibold text-slate-900 mb-2">
                    {formatCurrency(property.list_price)}
                  </div>
                  <div className="text-sm text-slate-600 mb-4">
                    {property.address}
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    {property.city}, {property.state} {property.zip}
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    {property.beds && <span>{property.beds} beds</span>}
                    {property.baths && <span>{property.baths} baths</span>}
                    {property.sqft && <span>{property.sqft.toLocaleString()} sqft</span>}
                  </div>
                  {property.mls_id && (
                    <div className="mt-3 text-xs text-slate-400">
                      MLS: {property.mls_id}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

