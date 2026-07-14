'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const priorityOptions = ['low', 'medium', 'high'] as const
const statusOptions = ['pending', 'in_progress', 'completed'] as const

export default function NewTaskPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientName: '',
    priority: 'medium' as (typeof priorityOptions)[number],
    status: 'pending' as (typeof statusOptions)[number],
    dueDate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Integrar com Supabase (lib/api/tasks.ts -> createTask)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Tarefa criada:', formData)
      router.push('/tasks')
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/tasks">
        <Button variant="ghost" className="gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Nova Tarefa</CardTitle>
          <CardDescription>Crie uma nova tarefa de acompanhamento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informações da Tarefa</h3>

              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título *
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Follow-up com o cliente"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Detalhes sobre a tarefa..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="clientName" className="text-sm font-medium">
                  Cliente relacionado
                </label>
                <Input
                  id="clientName"
                  name="clientName"
                  placeholder="João Silva"
                  value={formData.clientName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Prioridade *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="pending">Pendente</option>
                    <option value="in_progress">Em Andamento</option>
                    <option value="completed">Concluída</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Data de Vencimento
                </label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Tarefa'
                )}
              </Button>
              <Link href="/tasks">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
