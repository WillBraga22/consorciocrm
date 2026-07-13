export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  cpf?: string
  status: 'prospect' | 'client' | 'inactive'
  vehicle_type?: string
  budget?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  user_id: string
  client_id: string
  plan_type: 'plans' | 'vehicles' | 'properties'
  value: number
  status: 'open' | 'negotiating' | 'won' | 'lost'
  expected_close_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  user_id: string
  client_id: string
  type: 'call' | 'email' | 'meeting' | 'note'
  description: string
  activity_date: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  client_id?: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed'
  due_date?: string
  created_at: string
  updated_at: string
}
