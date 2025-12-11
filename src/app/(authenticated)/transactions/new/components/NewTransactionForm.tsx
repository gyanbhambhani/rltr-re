'use client'

import { Button } from '@/app/components/ui/Button'
import { createTransactionAction } from '@/app/actions/transactions'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { Contact, Property, TransactionStage } from '@/types/supabase'

interface NewTransactionFormProps {
  contacts: Contact[]
  properties: Property[]
  initialBuyerContactId?: string
  initialPropertyId?: string
}

const stageLabels: Record<TransactionStage, string> = {
  lead: 'Lead',
  offer_drafting: 'Offer Drafting',
  offer_submitted: 'Offer Submitted',
  in_escrow: 'In Escrow',
  closed: 'Closed',
  dead: 'Dead',
}

export function NewTransactionForm({
  contacts,
  properties,
  initialBuyerContactId,
  initialPropertyId,
}: NewTransactionFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    
    startTransition(async () => {
      const result = await createTransactionAction(formData)
      
      if (result.success) {
        router.push(`/transactions/${result.data.id}`)
      } else {
        setError(result.error || 'Failed to create transaction')
      }
    })
  }

  const buyerContacts = contacts.filter((c) => c.type === 'buyer' || c.type === 'other')
  const sellerContacts = contacts.filter((c) => c.type === 'seller' || c.type === 'other')

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="buyer_contact_id" className="block text-sm font-medium text-slate-700 mb-2">
              Buyer *
            </label>
            <select
              id="buyer_contact_id"
              name="buyer_contact_id"
              required
              defaultValue={initialBuyerContactId || ''}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              disabled={isPending}
            >
              <option value="">Select a buyer...</option>
              {buyerContacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.first_name} {contact.last_name}
                  {contact.email ? ` (${contact.email})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="seller_contact_id" className="block text-sm font-medium text-slate-700 mb-2">
              Seller
            </label>
            <select
              id="seller_contact_id"
              name="seller_contact_id"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              disabled={isPending}
            >
              <option value="">Select a seller...</option>
              {sellerContacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.first_name} {contact.last_name}
                  {contact.email ? ` (${contact.email})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="property_id" className="block text-sm font-medium text-slate-700 mb-2">
              Property *
            </label>
            <select
              id="property_id"
              name="property_id"
              required
              defaultValue={initialPropertyId || ''}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              disabled={isPending}
            >
              <option value="">Select a property...</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.address}, {property.city}, {property.state} {property.zip}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="stage" className="block text-sm font-medium text-slate-700 mb-2">
              Stage
            </label>
            <select
              id="stage"
              name="stage"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              disabled={isPending}
              defaultValue="lead"
            >
              {Object.entries(stageLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="offer_price" className="block text-sm font-medium text-slate-700 mb-2">
              Offer Price
            </label>
            <input
              type="number"
              id="offer_price"
              name="offer_price"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="close_date" className="block text-sm font-medium text-slate-700 mb-2">
              Close Date
            </label>
            <input
              type="date"
              id="close_date"
              name="close_date"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Transaction'}
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
    </>
  )
}



