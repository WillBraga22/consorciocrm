'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/auth/user-menu'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading } = useAuth()

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">ConsorcioCRM</span>
          </Link>

          {!isLoading && user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/clients">
                  <Button variant="ghost">Clientes</Button>
                </Link>
                <Link href="/deals">
                  <Button variant="ghost">Oportunidades</Button>
                </Link>
                <Link href="/tasks">
                  <Button variant="ghost">Tarefas</Button>
                </Link>
              </div>

              {/* Right side */}
              <div className="hidden md:flex items-center gap-2">
                <Link href="/settings">
                  <Button variant="ghost" size="sm">
                    Configurações
                  </Button>
                </Link>
                <UserMenu />
              </div>
            </>
          )}

          {!isLoading && !user && (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Criar conta</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          {!isLoading && user && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isOpen && user && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/dashboard" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link href="/clients" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Clientes
              </Button>
            </Link>
            <Link href="/deals" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Oportunidades
              </Button>
            </Link>
            <Link href="/tasks" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Tarefas
              </Button>
            </Link>
            <Link href="/settings" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Configurações
              </Button>
            </Link>
            <div className="px-2">
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
