'use client'

import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Badge } from '@/app/components/ui/Badge'
import { EmptyState } from '@/app/components/ui/EmptyState'
import { updateTaskStatusAction } from '@/app/actions/tasks'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import type { TransactionTask, TransactionStage, TaskStatus } from '@/types/supabase'

interface TaskWithTransaction extends TransactionTask {
  transaction: {
    id: string
    stage: TransactionStage
    property?: {
      address: string
    } | null
  }
}

interface TodayTasksProps {
  initialTasks: TaskWithTransaction[]
}

const stageLabels: Record<TransactionStage, string> = {
  lead: 'Lead',
  offer_drafting: 'Offer Drafting',
  offer_submitted: 'Offer Submitted',
  in_escrow: 'In Escrow',
  closed: 'Closed',
  dead: 'Dead',
}

const stageColors: Record<TransactionStage, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  lead: 'info',
  offer_drafting: 'warning',
  offer_submitted: 'info',
  in_escrow: 'warning',
  closed: 'success',
  dead: 'error',
}

export function TodayTasks({ initialTasks }: TodayTasksProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isPending, startTransition] = useTransition()

  const handleToggleTask = async (taskId: string, currentStatus: TaskStatus) => {
    const newStatus: TaskStatus = currentStatus === 'done' ? 'todo' : 'done'
    
    startTransition(async () => {
      const result = await updateTaskStatusAction(taskId, newStatus)
      if (result.success && result.data) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? { ...task, status: result.data!.status } : task))
        )
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-slate-900">Today's Tasks</h2>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks due today"
            description="You're all caught up! Check back tomorrow for new tasks."
          />
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
              >
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={task.status === 'done'}
                  onChange={() => handleToggleTask(task.id, task.status)}
                  disabled={isPending}
                />
                <div className="flex-1">
                  <div
                    className={`text-sm font-medium ${
                      task.status === 'done'
                        ? 'text-slate-500 line-through'
                        : 'text-slate-900'
                    }`}
                  >
                    {task.title}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    <Link
                      href={`/transactions/${task.transaction.id}`}
                      className="hover:underline"
                    >
                      {task.transaction.property?.address || 'Transaction'}
                    </Link>
                  </div>
                </div>
                <Badge variant={stageColors[task.transaction.stage]}>
                  {stageLabels[task.transaction.stage]}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

