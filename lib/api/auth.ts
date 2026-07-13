import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as Profile
}

export async function updateProfile(
  userId: string,
  updates: Partial<Omit<Profile, 'id' | 'created_at'>>
) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as Profile
}

export async function createProfile(
  userId: string,
  profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        ...profile,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as Profile
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
