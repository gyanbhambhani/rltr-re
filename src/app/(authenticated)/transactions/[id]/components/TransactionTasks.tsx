'use client'

import { Card, CardContent, CardHeader } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { Badge } from '@/app/components/ui/Badge'
import { createTaskAction, updateTaskStatusAction } from '@/app/actions/tasks'
import { useState, useTransition } from 'react'
import type { TransactionTask, TaskStatus } from '@/types/supabase'

interface TransactionTasksProps {
  transactionId: string
  initialTasks: TransactionTask[]
}

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

const statusColors: Record<TaskStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  todo: 'default',
  in_progress: 'warning',
  done: 'success',
}

export function TransactionTasks({ transactionId, initialTasks }: TransactionTasksProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleToggleTask = async (taskId: string, currentStatus: TaskStatus) {
    const newStatus: TaskStatus = currentStatus === 'done' ? 'todo' : 'done'
    
    startTransition(async () => {
      const result = await updateTaskStatusAction(taskId, newStatus)
      if (result.success && result.data) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? result.data : task))
        )
      }
    })
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('title', newTaskTitle)
      formData.append('status', 'todo')
      
      const result = await createTaskAction(transactionId, formData)
      if (result.success && result.data) {
        setTasks((prev) => [...prev, result.data])
        setNewTaskTitle('')
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-slate-900">Tasks</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={task.status === 'done'}
                onChange={() => handleToggleTask(task.id, task.status)}
                className="mt-1"
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
              </div>
              <Badge variant={statusColors[task.status]}>
                {statusLabels[task.status]}
              </Badge>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddTask} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            disabled={isPending}
          />
          <Button type="submit" size="sm" disabled={isPending}>
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

