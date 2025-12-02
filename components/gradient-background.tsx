"use client"

import * as React from "react"
import { useColorScheme } from "./color-scheme-provider"

export function GradientBackground() {
    const { backgroundHue, backgroundVibrancy, gradientOriginX, gradientOriginY, gradientSize } = useColorScheme()
    const [mounted, setMounted] = React.useState(false)
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
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

    // Calculate gradient colors
    const gradientStyle = React.useMemo(() => {
        if (!mounted) return undefined

        let centerColor: string
        let outerColor: string

        if (isDark) {
            // Dark mode: lighter at center, darker at edges
            // Center: much lighter than base dark background
            centerColor = `oklch(0.24 ${backgroundVibrancy} ${backgroundHue})`
            // Originally the value was 0.25
            // Outer: much darker than base dark background
            outerColor = `oklch(0.00 ${backgroundVibrancy} ${backgroundHue})`
            // Originally the value was 0.08
        } else {
            // Light mode: lighter at center, darker at edges
            // Center: very light
            centerColor = `oklch(1.0 ${backgroundVibrancy} ${backgroundHue})`
            // Originally the value was 1.0 (still is)
            // Outer: noticeably darker
            outerColor = `oklch(0.76 ${backgroundVibrancy} ${backgroundHue})`
            // Originally the value was 0.88
        }

        return {
            background: `radial-gradient(circle at ${gradientOriginX}% ${gradientOriginY}%, ${centerColor} 0%, ${centerColor} ${gradientSize}%, ${outerColor} 100%)`,
            minHeight: '100vh',
        }
    }, [mounted, isDark, backgroundHue, backgroundVibrancy, gradientOriginX, gradientOriginY, gradientSize])

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

