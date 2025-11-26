'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

interface TopBarProps {
  title?: string
  action?: React.ReactNode
}

export function TopBar({ title, action }: TopBarProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    
    fetchUser()
  }, [])

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
      <div className="flex-1">
        {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
      </div>
      
      <div className="flex items-center gap-4">
        {action && <div>{action}</div>}
        
        {loading ? (
          <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
        ) : user ? (
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium">
            {getUserInitials(user.email || 'U')}
          </div>
        ) : null}
      </div>
    </header>
  )
}

