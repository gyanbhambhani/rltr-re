import { createClient } from '../server'
import type { TransactionTask, TaskStatus } from '@/types/supabase'

export async function getTasksByTransaction(transactionId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Verify transaction belongs to user
  const { data: transaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('id', transactionId)
    .eq('user_id', user.id)
    .single()

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  const { data, error } = await supabase
    .from('transaction_tasks')
    .select('*')
    .eq('transaction_id', transactionId)
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as TransactionTask[]
}

export async function createTask(
  transactionId: string,
  task: {
    title: string
    status?: TaskStatus
    order_index?: number
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Verify transaction belongs to user
  const { data: transaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('id', transactionId)
    .eq('user_id', user.id)
    .single()

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  const { data, error } = await supabase
    .from('transaction_tasks')
    .insert({
      ...task,
      transaction_id: transactionId,
    })
    .select()
    .single()

  if (error) throw error
  return data as TransactionTask
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Verify task belongs to user's transaction
  const { data: task } = await supabase
    .from('transaction_tasks')
    .select('transaction_id')
    .eq('id', taskId)
    .single()

  if (!task) {
    throw new Error('Task not found')
  }

  const { data: transaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('id', task.transaction_id)
    .eq('user_id', user.id)
    .single()

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  const updateData: any = { status }
  if (status === 'done') {
    updateData.completed_at = new Date().toISOString()
  } else {
    updateData.completed_at = null
  }

  const { data, error } = await supabase
    .from('transaction_tasks')
    .update(updateData)
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw error
  return data as TransactionTask
}

