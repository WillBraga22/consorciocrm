'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const planTypeOptions = ['plans', 'vehicles', 'properties'] as const
const statusOptions = ['open', 'negotiating', 'won', 'lost'] as const

export default function NewDealPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    planType: 'vehicles' as (typeof planTypeOptions)[number],
    value: '',
    status: 'open' as (typeof statusOptions)[number],
    expectedCloseDate: '',
    notes: '',
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
      // TODO: Integrar com Supabase (lib/api/deals.ts -> createDeal)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Oportunidade criada:', formData)
      router.push('/deals')
    } catch (error) {
      console.error('Erro ao criar oportunidade:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/deals">
        <Button variant="ghost" className="gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Nova Oportunidade</CardTitle>
          <CardDescription>Registre uma nova oportunidade de venda de consórcio</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informações da Oportunidade</h3>

              <div className="space-y-2">
                <label htmlFor="clientName" className="text-sm font-medium">
                  Cliente *
                </label>
                <Input
                  id="clientName"
                  name="clientName"
                  placeholder="João Silva"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="planType" className="text-sm font-medium">
                    Tipo de Consórcio *
                  </label>
                  <select
                    id="planType"
                    name="planType"
                    value={formData.planType}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="plans">Consórcio de Planos</option>
                    <option value="vehicles">Consórcio de Veículos</option>
                    <option value="properties">Consórcio de Imóveis</option>
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
                    <option value="open">Aberto</option>
                    <option value="negotiating">Em Negociação</option>
                    <option value="won">Ganho</option>
                    <option value="lost">Perdido</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="value" className="text-sm font-medium">
                    Valor (R$) *
                  </label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    placeholder="0,00"
                    value={formData.value}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="expectedCloseDate" className="text-sm font-medium">
                    Previsão de Fechamento
                  </label>
                  <Input
                    id="expectedCloseDate"
                    name="expectedCloseDate"
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Observações</h3>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notas
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Adicione observações sobre a oportunidade..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={4}
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
                  'Salvar Oportunidade'
                )}
              </Button>
              <Link href="/deals">
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
