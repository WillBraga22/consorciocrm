'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogOut, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Usuário',
    email: 'user@email.com',
    company: 'Minha Consultoria',
    phone: '(11) 9XXXX-XXXX',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsEditing(false)
    setIsSaving(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie suas preferências e informações de conta</p>
        </div>

        {/* Perfil */}
        <Card>
          <CardHeader>
            <CardTitle>Informações de Perfil</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Empresa/Consultoria</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
                ) : (
                  <>
                    <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        'Salvar Alterações'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>
              Gerencie suas preferências de segurança
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Alterar Senha</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Recomendamos alterar sua senha regularmente para manter sua conta segura
                </p>
                <Button variant="outline">Alterar Senha</Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Autenticação de Dois Fatores</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione uma camada extra de segurança à sua conta
                </p>
                <Button variant="outline">Configurar 2FA</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>
              Escolha como deseja ser notificado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações por Email</p>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por email
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-medium">Lembretes de Tarefas</p>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre tarefas vencidas
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-medium">Relatórios Semanais</p>
                  <p className="text-sm text-muted-foreground">
                    Receba resumo semanal de seu desempenho
                  </p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perigo */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
            <CardDescription>
              Ações irreversíveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="destructive"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair de Todas as Sessões
              </Button>

              <div className="border-t pt-4">
                <Button
                  variant="destructive"
                  className="gap-2"
                >
                  Deletar Conta Permanentemente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}