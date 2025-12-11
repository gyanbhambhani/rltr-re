'use client'

import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { createPropertyAction } from '@/app/actions/properties'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function NewPropertyPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    
    startTransition(async () => {
      const result = await createPropertyAction(formData)
      
      if (result.success) {
        router.push(`/properties/${result.data.id}`)
      } else {
        setError(result.error || 'Failed to create property')
      }
    })
  }

  return (
    <div>
      <PageHeader
        title="New Property"
        description="Add a new property to your database"
      />

      <Card>
        <CardContent className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  maxLength={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 uppercase"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-slate-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="mls_id" className="block text-sm font-medium text-slate-700 mb-2">
                  MLS ID
                </label>
                <input
                  type="text"
                  id="mls_id"
                  name="mls_id"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="list_price" className="block text-sm font-medium text-slate-700 mb-2">
                  List Price
                </label>
                <input
                  type="number"
                  id="list_price"
                  name="list_price"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="beds" className="block text-sm font-medium text-slate-700 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="beds"
                  name="beds"
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="baths" className="block text-sm font-medium text-slate-700 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="baths"
                  name="baths"
                  step="0.5"
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="sqft" className="block text-sm font-medium text-slate-700 mb-2">
                  Square Feet
                </label>
                <input
                  type="number"
                  id="sqft"
                  name="sqft"
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Property'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



