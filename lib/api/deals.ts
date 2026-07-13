import { supabase } from '@/lib/supabase'
import type { Deal } from '@/types/database'

export async function getDeals(userId: string) {
  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      client:clients(name)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as (Deal & { client: { name: string } })[]
}

export async function getDeal(dealId: string) {
  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      client:clients(name, email, phone)
    `)
    .eq('id', dealId)
    .single()

  if (error) throw error
  return data as Deal & { client: any }
}

export async function createDeal(
  userId: string,
  deal: Omit<Deal, 'id' | 'user_id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('deals')
    .insert([
      {
        user_id: userId,
        ...deal,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as Deal
}

export async function updateDeal(
  dealId: string,
  updates: Partial<Omit<Deal, 'id' | 'user_id' | 'created_at'>>
) {
  const { data, error } = await supabase
    .from('deals')
    .update(updates)
    .eq('id', dealId)
    .select()
    .single()

  if (error) throw error
  return data as Deal
}

export async function deleteDeal(dealId: string) {
  const { error } = await supabase
    .from('deals')
    .delete()
    .eq('id', dealId)

  if (error) throw error
}

export async function getDealStats(userId: string) {
  const { data, error } = await supabase
    .from('deals')
    .select('value, status')
    .eq('user_id', userId)

  if (error) throw error

  const deals = data as { value: number; status: string }[]
  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  const wonDeals = deals.filter((d) => d.status === 'won')
  const wonValue = wonDeals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  const conversionRate = deals.length > 0 ? (wonDeals.length / deals.length) * 100 : 0

  return {
    totalValue,
    wonValue,
    conversionRate,
    totalDeals: deals.length,
    wonDeals: wonDeals.length,
  }
}
