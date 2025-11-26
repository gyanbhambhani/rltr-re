'use server'

import { revalidatePath } from 'next/cache'
import * as tasksQueries from '@/lib/supabase/queries/tasks'
import type { TaskStatus } from '@/types/supabase'

export async function createTaskAction(transactionId: string, formData: FormData) {
  const title = formData.get('title') as string
  const status = (formData.get('status') as TaskStatus) || 'todo'
  const order_index = formData.get('order_index') ? parseInt(formData.get('order_index') as string) : 0

  try {
    const task = await tasksQueries.createTask(transactionId, {
      title,
      status,
      order_index,
    })
    revalidatePath(`/transactions/${transactionId}`)
    revalidatePath('/dashboard')
    return { success: true, data: task }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateTaskStatusAction(taskId: string, status: TaskStatus) {
  try {
    const task = await tasksQueries.updateTaskStatus(taskId, status)
    revalidatePath('/transactions')
    revalidatePath('/dashboard')
    return { success: true, data: task }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

