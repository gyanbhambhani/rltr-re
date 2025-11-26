import { PageHeader } from '@/app/components/ui/PageHeader'
import { Table, TableHeader, TableHead, TableRow, TableCell } from '@/app/components/ui/Table'
import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { getAllContacts } from '@/lib/supabase/queries/contacts'
import Link from 'next/link'

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

export default async function ContactsPage() {
  const contacts = await getAllContacts()

  return (
    <div>
      <PageHeader
        title="Contacts"
        description="Manage your contacts and clients"
        action={
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Import CSV
            </Button>
            <Link href="/contacts/new">
              <Button>New Contact</Button>
            </Link>
          </div>
        }
      />

      {contacts.length === 0 ? (
        <div className="text-center py-12 px-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No contacts yet</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Start by adding your first contact manually or importing from CSV.
          </p>
          <Link href="/contacts/new">
            <Button>New Contact</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    <Link href={`/contacts/${contact.id}`} className="hover:underline">
                      {contact.first_name} {contact.last_name}
                    </Link>
                  </TableCell>
                  <TableCell>{contact.email || '—'}</TableCell>
                  <TableCell>{contact.phone || '—'}</TableCell>
                  <TableCell>
                    <Badge variant="default">{typeLabels[contact.type]}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {sourceLabels[contact.source]}
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

