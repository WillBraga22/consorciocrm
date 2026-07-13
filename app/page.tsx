import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, CheckCircle2, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">
              Gerencie seus clientes com inteligência
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ConsorcioCRM: A plataforma completa para consultores de consórcio gerenciarem clientes, oportunidades e aumentar vendas
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline">
                Criar conta
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Gestão de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Centralize todas as informações dos seus clientes em um único lugar
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Pipeline de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Acompanhe todas as suas oportunidades e negocie com confiança
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Tarefas e Lembretes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Nunca perca uma oportunidade com sistema de tarefas inteligente
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Relatórios em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Insights detalhados para tomar melhores decisões comerciais
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para aumentar suas vendas?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Junte-se a centenas de consultores que já utilizam ConsorcioCRM
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary">
              Começar agora - Grátis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
