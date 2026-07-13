'use client'

import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Users, TrendingUp, AlertCircle, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getDealStats } from '@/lib/api/deals'
import { getTaskStats } from '@/lib/api/tasks'

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [dealStats, setDealStats] = useState<any>(null)
  const [taskStats, setTaskStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      const fetchStats = async () => {
        try {
          const [deals, tasks] = await Promise.all([
            getDealStats(user.id),
            getTaskStats(user.id),
          ])
          setDealStats(deals)
          setTaskStats(tasks)
        } catch (error) {
          console.error('Erro ao carregar estatísticas:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchStats()
    }
  }, [user?.id])

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo de volta, {profile?.full_name}! Aqui está o resumo do seu negócio.</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">Clientes cadastrados</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valor em Pipeline</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      R$ {dealStats?.totalValue ? (dealStats.totalValue / 1000).toFixed(1) : '0'}k
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {dealStats?.totalDeals || 0} oportunidade(s)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dealStats?.conversionRate.toFixed(1) || '0'}%
                    </div>
                    <p className="text-xs text-muted-foreground">de oportunidades ganhas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {taskStats?.pending || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">aguardando ação</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo de Vendas</CardTitle>
                    <CardDescription>Desempenho atual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Vendas Ganhas</p>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {dealStats?.wonValue ? (dealStats.wonValue / 1000).toFixed(1) : '0'}k
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total em Pipeline</p>
                        <p className="text-2xl font-bold text-blue-600">
                          R$ {dealStats?.totalValue ? (dealStats.totalValue / 1000).toFixed(1) : '0'}k
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progresso de Tarefas</CardTitle>
                    <CardDescription>Taxa de conclusão</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                        <p className="text-2xl font-bold text-green-600">
                          {taskStats?.completionRate.toFixed(0) || '0'}%
                        </p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>Concluídas: {taskStats?.completed || 0}</p>
                        <p>Em Progresso: {taskStats?.inProgress || 0}</p>
                        <p>Pendentes: {taskStats?.pending || 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
