import { PageHeader } from '@/app/components/ui/PageHeader'
import { Card, CardContent } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { getAllContacts } from '@/lib/supabase/queries/contacts'
import { getAllProperties } from '@/lib/supabase/queries/properties'
import { NewTransactionForm } from './components/NewTransactionForm'

export default async function NewTransactionPage({
  searchParams,
}: {
  searchParams: { buyer_contact_id?: string; property_id?: string }
}) {
  const [contacts, properties] = await Promise.all([
    getAllContacts(),
    getAllProperties(),
  ])

  return (
    <div>
      <PageHeader
        title="New Transaction"
        description="Create a new real estate transaction"
      />

      <Card>
        <CardContent className="p-6">
          <NewTransactionForm
            contacts={contacts}
            properties={properties}
            initialBuyerContactId={searchParams.buyer_contact_id}
            initialPropertyId={searchParams.property_id}
          />
        </CardContent>
      </Card>
    </div>
  )
}

