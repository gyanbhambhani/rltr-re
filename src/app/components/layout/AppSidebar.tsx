'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { IntegrationConnection } from '@/types/supabase'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Transactions', href: '/transactions' },
  { label: 'Properties', href: '/properties' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Settings', href: '/settings/integrations' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [mlsStatus, setMlsStatus] = useState<IntegrationConnection | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMlsStatus() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data, error } = await supabase
          .from('integration_connections')
          .select('*')
          .eq('user_id', user.id)
          .eq('type', 'mls')
          .maybeSingle()
        
        if (!error && data) {
          setMlsStatus(data)
        }
      }
      setLoading(false)
    }
    
    fetchMlsStatus()
  }, [])

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
      <div className="p-6 border-b border-slate-200">
        <Link href="/dashboard" className="text-xl font-semibold text-slate-900">
          RLTR
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-200">
        {loading ? (
          <div className="text-xs text-slate-500">Loading...</div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className={`w-2 h-2 rounded-full ${
              mlsStatus?.status === 'connected' ? 'bg-emerald-500' : 'bg-slate-300'
            }`} />
            <span>
              {mlsStatus?.status === 'connected' ? 'MLS Connected' : 'MLS Not connected'}
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}

