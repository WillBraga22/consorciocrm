import { supabase } from '@/lib/supabase'
import type { Task } from '@/types/database'

export async function getTasks(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true })
    .order('priority', { ascending: false })

  if (error) throw error
  return data as Task[]
}

export async function getTask(taskId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', taskId)
    .single()

  if (error) throw error
  return data as Task
}

export async function createTask(
  userId: string,
  task: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        user_id: userId,
        ...task,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as Task
}

export async function updateTask(
  taskId: string,
  updates: Partial<Omit<Task, 'id' | 'user_id' | 'created_at'>>
) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw error
  return data as Task
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)

  if (error) throw error
}

export async function getTaskStats(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('status')
    .eq('user_id', userId)

  if (error) throw error

  const tasks = data as { status: string }[]
  const pending = tasks.filter((t) => t.status === 'pending').length
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const completed = tasks.filter((t) => t.status === 'completed').length
  const completionRate = tasks.length > 0 ? (completed / tasks.length) * 100 : 0

  return {
    total: tasks.length,
    pending,
    inProgress,
    completed,
    completionRate,
  }
}
