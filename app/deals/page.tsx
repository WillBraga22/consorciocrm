'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, DollarSign, Calendar, Trash2, Edit } from 'lucide-react'
import { Input } from '@/components/ui/input'

// Mock data
type DealPlanType = 'plans' | 'vehicles' | 'properties'
type DealStatus = 'open' | 'negotiating' | 'won' | 'lost'

interface MockDeal {
  id: string
  clientName: string
  planType: DealPlanType
  value: number
  status: DealStatus
  expectedCloseDate: string
  createdAt: string
}

const mockDeals: MockDeal[] = [
  {
    id: '1',
    clientName: 'João Silva',
    planType: 'vehicles',
    value: 8500,
    status: 'won',
    expectedCloseDate: '2024-01-25',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    clientName: 'Maria Santos',
    planType: 'plans',
    value: 5200,
    status: 'negotiating',
    expectedCloseDate: '2024-02-15',
    createdAt: '2024-02-05',
  },
  {
    id: '3',
    clientName: 'Carlos Oliveira',
    planType: 'properties',
    value: 15000,
    status: 'open',
    expectedCloseDate: '2024-03-01',
    createdAt: '2024-02-10',
  },
]

const statusLabels = {
  open: 'Aberto',
  negotiating: 'Negociando',
  won: 'Ganho',
  lost: 'Perdido',
}

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  negotiating: 'bg-orange-100 text-orange-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
}

const planTypeLabels = {
  plans: 'Consórcio de Planos',
  vehicles: 'Consórcio de Veículos',
  properties: 'Consórcio de Imóveis',
}

export default function DealsPage() {
  const [deals, setDeals] = useState(mockDeals)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDeals = deals.filter((deal) =>
    deal.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const wonDeals = deals.filter((d) => d.status === 'won')
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0)

  const handleDeleteDeal = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta oportunidade?')) {
      setDeals(deals.filter((d) => d.id !== id))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Oportunidades</h1>
            <p className="text-gray-600">Pipeline de vendas</p>
          </div>
          <Link href="/deals/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Oportunidade
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Valor Total em Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                R$ {(totalValue / 1000).toFixed(1)}k
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {deals.length} oportunidade(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Vendas Ganhas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                R$ {(wonValue / 1000).toFixed(1)}k
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {wonDeals.length} deal(s) fechado(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Taxa de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {deals.length > 0
                  ? ((wonDeals.length / deals.length) * 100).toFixed(1)
                  : '0'}
                %
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                de oportunidades ganhas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Deals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline de Vendas</CardTitle>
            <CardDescription>
              {filteredDeals.length} oportunidade(s) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredDeals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhuma oportunidade encontrada
                </p>
                <Link href="/deals/new">
                  <Button>Adicionar primeira oportunidade</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Cliente</th>
                      <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                      <th className="text-left py-3 px-4 font-semibold">Valor</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Previsão</th>
                      <th className="text-left py-3 px-4 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{deal.clientName}</td>
                        <td className="py-3 px-4">
                          <span className="text-sm">
                            {planTypeLabels[deal.planType]}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">
                              R$ {deal.value.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              statusColors[deal.status]
                            }`}
                          >
                            {statusLabels[deal.status]}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(deal.expectedCloseDate).toLocaleDateString('pt-BR')}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Link href={`/deals/${deal.id}`}>
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Edit className="w-4 h-4" />
                                Editar
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteDeal(deal.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Deletar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}