"use client"

import * as React from "react"
import { useColorScheme } from "./color-scheme-provider"

export function NavBarWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    const { navBarHue, navBarVibrancy } = useColorScheme()
    const [mounted, setMounted] = React.useState(false)
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        // Check initial dark mode state
        setIsDark(document.documentElement.classList.contains('dark'))
        
        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDark(document.documentElement.classList.contains('dark'))
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [])

    // Calculate nav bar color based on theme
    const navBarColor = React.useMemo(() => {
        if (!mounted) return undefined
        if (isDark) {
            return `oklch(0.205 ${navBarVibrancy} ${navBarHue})`
        } else {
            return `oklch(1 ${navBarVibrancy} ${navBarHue})`
        }
    }, [mounted, isDark, navBarHue, navBarVibrancy])

    return (
        <header 
            className={className}
            style={navBarColor ? { backgroundColor: navBarColor } : undefined}
        >
            {children}
        </header>
    )
}

