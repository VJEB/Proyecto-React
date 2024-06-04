import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  ofiProId: number
  setOfiProId: (ofiProId: number) => void
  procId: number
  setProcId: (ofiProId: number) => void
  devaId: number
  setDevaId: (devaId: number) => void
  refrescar: boolean
  setRefrescar: (val: boolean) => void
  mostrarDetalle: number
  setMostrarDetalle: (val: number) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  ofiProId: 0,
  setOfiProId: () => null,
  procId: 0,
  setProcId: () => null,
  devaId: 0,
  setDevaId: () => null,
  refrescar: false,
  setRefrescar: () => null,
  mostrarDetalle: 0,
  setMostrarDetalle: () => null,
}

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [ofiProId, setOfiProId] = useState(0)
  const [procId, setProcId] = useState(0)
  const [devaId, setDevaId] = useState(0)

  const [refrescar, setRefrescar] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(0)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    ofiProId,
    setOfiProId,
    procId,
    setProcId,
    devaId,
    setDevaId,
    refrescar,
    setRefrescar,
    mostrarDetalle,
    setMostrarDetalle,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
