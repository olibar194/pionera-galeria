'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render null or a placeholder button without a theme-specific icon
    // to avoid showing the wrong icon before hydration.
    return (
      <Button
        variant='outline'
        size='icon'
        disabled
        className='bg-transparent border-2 border-black dark:border-white'
      >
        <span className='sr-only'>Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='bg-transparent border-2 border-black dark:border-white'
    >
      {theme === 'dark' ? (
        <Sun size={20} className='h-5 w-5' />
      ) : (
        <Moon size={20} className='h-5 w-5' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
