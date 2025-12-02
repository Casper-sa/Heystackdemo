"use client"

import * as React from "react"
import { useColorScheme } from "./color-scheme-provider"

export function GradientBackground() {
    const { brandHue, vibrancy, gradientOriginX, gradientOriginY, gradientSize } = useColorScheme()
    const [mounted, setMounted] = React.useState(false)
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const checkDarkMode = () => setIsDark(document.documentElement.classList.contains('dark'))
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

    // Calculate gradient colors
    const gradientStyle = React.useMemo(() => {
        if (!mounted) return undefined

        let centerColor: string
        let outerColor: string

        // Base chroma from vibrancy
        const chroma = vibrancy * 0.3

        if (isDark) {
            // Dark mode: lighter at center, darker at edges
            // Center: slightly lighter than bg
            centerColor = `oklch(0.25 ${chroma} ${brandHue})`
            // Outer: darker than bg
            outerColor = `oklch(0.10 ${chroma} ${brandHue})`
        } else {
            // Light mode: lighter at center, darker at edges
            // Center: white-ish
            centerColor = `oklch(0.98 ${chroma * 0.2} ${brandHue})`
            // Outer: slightly darker
            outerColor = `oklch(0.92 ${chroma * 0.5} ${brandHue})`
        }

        return {
            background: `radial-gradient(circle at ${gradientOriginX}% ${gradientOriginY}%, ${centerColor} 0%, ${centerColor} ${gradientSize}%, ${outerColor} 100%)`,
            minHeight: '100vh',
        }
    }, [mounted, isDark, brandHue, vibrancy, gradientOriginX, gradientOriginY, gradientSize])

    if (!mounted) {
        return null
    }

    return (
        <div
            style={gradientStyle}
            className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
        />
    )
}

