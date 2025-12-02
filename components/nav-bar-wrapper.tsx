"use client"

import * as React from "react"


export function NavBarWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    const [mounted, setMounted] = React.useState(false)
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        // Check initial dark mode state
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'))
        }

        checkDarkMode()

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode()
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [])

    // Prevent hydration mismatch by not rendering style on server
    const style = mounted ? {
        backgroundColor: isDark ? 'var(--nav-bar-dark)' : 'var(--nav-bar-light)'
    } : undefined

    return (
        <header
            className={className}
            style={style}
        >
            {children}
        </header>
    )
}

