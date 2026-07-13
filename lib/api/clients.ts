import { supabase } from '@/lib/supabase'
import type { Client } from '@/types/database'

export async function getClients(userId: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Client[]
}

export async function getClient(clientId: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single()

  if (error) throw error
  return data as Client
}

export async function createClient(
  userId: string,
  client: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('clients')
    .insert([
      {
        user_id: userId,
        ...client,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function updateClient(
  clientId: string,
  updates: Partial<Omit<Client, 'id' | 'user_id' | 'created_at'>>
) {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', clientId)
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function deleteClient(clientId: string) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId)

  if (error) throw error
}

export async function searchClients(userId: string, query: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Client[]
}
