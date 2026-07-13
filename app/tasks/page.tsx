'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, CheckCircle, AlertCircle, Clock, Trash2, Edit } from 'lucide-react'

// Mock data
const mockTasks = [
  {
    id: '1',
    title: 'Follow-up com João Silva',
    description: 'Ligar para confirmar interesse em consórcio de veículos',
    clientId: '1',
    priority: 'high' as const,
    status: 'pending' as const,
    dueDate: '2024-01-30',
    createdAt: '2024-01-25',
  },
  {
    id: '2',
    title: 'Enviar proposta para Maria',
    description: 'Enviar proposta customizada de consórcio de planos',
    clientId: '2',
    priority: 'medium' as const,
    status: 'in_progress' as const,
    dueDate: '2024-02-01',
    createdAt: '2024-01-26',
  },
  {
    id: '3',
    title: 'Preparar documentação',
    description: 'Preparar documentação para análise de crédito',
    clientId: '3',
    priority: 'high' as const,
    status: 'completed' as const,
    dueDate: '2024-01-28',
    createdAt: '2024-01-20',
  },
]

const statusLabels = {
  pending: 'Pendente',
  in_progress: 'Em Progresso',
  completed: 'Concluída',
}

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
}

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length
  const completedTasks = tasks.filter((t) => t.status === 'completed').length
  const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  const handleDeleteTask = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      setTasks(tasks.filter((t) => t.id !== id))
    }
  }

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id !== id) return t
        const nextStatus =
          t.status === 'completed'
            ? ('pending' as const)
            : t.status === 'pending'
            ? ('in_progress' as const)
            : ('completed' as const)
        return { ...t, status: nextStatus }
      })
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
            <p className="text-gray-600">Gerencie suas atividades e lembretes</p>
          </div>
          <Link href="/tasks/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Tarefa
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tarefas Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{pendingTasks}</div>
              <p className="text-sm text-muted-foreground mt-1">
                aguardando ação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Taxa de Conclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {completionRate.toFixed(0)}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {completedTasks} de {tasks.length} concluídas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total de Tarefas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tasks.length}</div>
              <p className="text-sm text-muted-foreground mt-1">
                em seu sistema
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="pt-12 text-center pb-12">
                <p className="text-muted-foreground mb-4">
                  Nenhuma tarefa encontrada
                </p>
                <Link href="/tasks/new">
                  <Button>Adicionar primeira tarefa</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className="mt-1 flex-shrink-0"
                      >
                        {getStatusIcon(task.status)}
                      </button>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold ${
                            task.status === 'completed'
                              ? 'line-through text-muted-foreground'
                              : ''
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              statusColors[task.status]
                            }`}
                          >
                            {statusLabels[task.status]}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              priorityColors[task.priority]
                            }`}
                          >
                            Prioridade: {priorityLabels[task.priority]}
                          </span>
                          <span className="px-2 py-1 rounded text-xs bg-blue-50 text-blue-700">
                            Vence em{' '}
                            {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/tasks/${task.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}