'use client'

import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { createContactAction } from '@/app/actions/contacts'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { ContactType } from '@/types/supabase'

export default function NewContactPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    
    startTransition(async () => {
      const result = await createContactAction(formData)
      
      if (result.success) {
        router.push(`/contacts/${result.data.id}`)
      } else {
        setError(result.error || 'Failed to create contact')
      }
    })
  }

  return (
    <div>
      <PageHeader
        title="New Contact"
        description="Add a new contact to your database"
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
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-slate-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  disabled={isPending}
                  defaultValue="other"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="lender">Lender</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Contact'}
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



