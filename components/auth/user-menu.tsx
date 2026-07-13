'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const { user, profile, signOut } = useAuth()
  const router = useRouter()

  if (!user) return null

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <User className="w-4 h-4" />
        <span>{profile?.full_name || user.email}</span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        className="gap-2"
        onClick={handleSignOut}
      >
        <LogOut className="w-4 h-4" />
        Sair
      </Button>
    </div>
  )
}
