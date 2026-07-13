import { supabase } from '@/lib/supabase'
import type { Activity } from '@/types/database'

export async function getActivities(userId: string, clientId?: string) {
  let query = supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)

  if (clientId) {
    query = query.eq('client_id', clientId)
  }

  const { data, error } = await query.order('activity_date', { ascending: false })

  if (error) throw error
  return data as Activity[]
}

export async function getActivity(activityId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', activityId)
    .single()

  if (error) throw error
  return data as Activity
}

export async function createActivity(
  userId: string,
  activity: Omit<Activity, 'id' | 'user_id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('activities')
    .insert([
      {
        user_id: userId,
        ...activity,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as Activity
}

export async function updateActivity(
  activityId: string,
  updates: Partial<Omit<Activity, 'id' | 'user_id' | 'created_at'>>
) {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', activityId)
    .select()
    .single()

  if (error) throw error
  return data as Activity
}

export async function deleteActivity(activityId: string) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId)

  if (error) throw error
}
