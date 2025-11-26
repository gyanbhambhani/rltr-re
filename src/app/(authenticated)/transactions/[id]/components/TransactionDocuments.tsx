'use client'

import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { Badge } from '@/app/components/ui/Badge'
import { createDocumentAction } from '@/app/actions/documents'
import { useState, useTransition } from 'react'
import type { TransactionDocument, DocumentType } from '@/types/supabase'
import { format } from 'date-fns'

interface TransactionDocumentsProps {
  transactionId: string
  initialDocuments: TransactionDocument[]
}

const typeLabels: Record<DocumentType, string> = {
  offer: 'Offer',
  disclosure: 'Disclosure',
  inspection: 'Inspection',
  other: 'Other',
}

export function TransactionDocuments({
  transactionId,
  initialDocuments,
}: TransactionDocumentsProps) {
  const [documents, setDocuments] = useState(initialDocuments)
  const [isPending, startTransition] = useTransition()

  const handleDraftContract = () => {
    // Placeholder for contract drafting functionality
    alert('Contract drafting feature coming soon!')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
          <Button size="sm" onClick={handleDraftContract}>
            Draft Contract
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-500">
            No documents yet. Use "Draft Contract" to create your first document.
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">{doc.name}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {typeLabels[doc.type]} •{' '}
                    {format(new Date(doc.created_at), 'MMM d, yyyy')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{typeLabels[doc.type]}</Badge>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

