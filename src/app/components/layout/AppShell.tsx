'use client'

import { AppSidebar } from './AppSidebar'
import { TopBar } from './TopBar'

interface AppShellProps {
  children: React.ReactNode
  topBarTitle?: string
  topBarAction?: React.ReactNode
}

export function AppShell({ children, topBarTitle, topBarAction }: AppShellProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={topBarTitle} action={topBarAction} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

