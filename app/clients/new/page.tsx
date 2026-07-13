'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const statusOptions = ['prospect', 'client', 'inactive'] as const

export default function NewClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    status: 'prospect' as typeof statusOptions[number],
    vehicle_type: '',
    budget: '',
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
      // TODO: Integrar com Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Cliente criado:', formData)
      router.push('/clients')
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/clients">
        <Button variant="ghost" className="gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Novo Cliente</CardTitle>
          <CardDescription>Adicione um novo cliente ou prospect ao seu CRM</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informações Básicas</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="João Silva"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="cpf" className="text-sm font-medium">
                    CPF
                  </label>
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="123.456.789-00"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="joao@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telefone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(11) 98765-4321"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Informações de Venda */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informações de Venda</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <option value="prospect">Prospect</option>
                    <option value="client">Cliente</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="vehicle_type" className="text-sm font-medium">
                    Tipo de Interesse
                  </label>
                  <select
                    id="vehicle_type"
                    name="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Selecione...</option>
                    <option value="plans">Consórcio de Planos</option>
                    <option value="vehicles">Consórcio de Veículos</option>
                    <option value="properties">Consórcio de Imóveis</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium">
                  Orçamento Estimado (R$)
                </label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  placeholder="0,00"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Observações</h3>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notas
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Adicione observações sobre o cliente..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={4}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Cliente'
                )}
              </Button>
              <Link href="/clients">
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