"use client"

import * as React from "react"

type ColorSchemeContextType = {
    brandHue: number
    setBrandHue: (hue: number) => void
    vibrancy: number
    setVibrancy: (vibrancy: number) => void
    gradientOriginX: number
    setGradientOriginX: (x: number) => void
    gradientOriginY: number
    setGradientOriginY: (y: number) => void
    gradientSize: number
    setGradientSize: (size: number) => void
}

const ColorSchemeContext = React.createContext<ColorSchemeContextType | undefined>(undefined)

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
    const [brandHue, setBrandHueState] = React.useState<number>(210) // Default blue
    const [vibrancy, setVibrancyState] = React.useState<number>(0.5) // Default medium vibrancy

    const [gradientOriginX, setGradientOriginXState] = React.useState<number>(50) // Default center (50%)
    const [gradientOriginY, setGradientOriginYState] = React.useState<number>(50) // Default center (50%)
    const [gradientSize, setGradientSizeState] = React.useState<number>(30) // Default size (30% - the transition point)

    const [mounted, setMounted] = React.useState(false)

    // Load saved preferences
    React.useEffect(() => {
        setMounted(true)
        if (typeof window !== 'undefined') {
            const savedHue = localStorage.getItem("theme-brand-hue")
            if (savedHue !== null) setBrandHueState(parseInt(savedHue, 10))

            const savedVibrancy = localStorage.getItem("theme-vibrancy")
            if (savedVibrancy !== null) setVibrancyState(parseFloat(savedVibrancy))

            const savedGradientX = localStorage.getItem("color-scheme-gradient-origin-x")
            if (savedGradientX !== null) setGradientOriginXState(parseFloat(savedGradientX))

            const savedGradientY = localStorage.getItem("color-scheme-gradient-origin-y")
            if (savedGradientY !== null) setGradientOriginYState(parseFloat(savedGradientY))

            const savedGradientSize = localStorage.getItem("color-scheme-gradient-size")
            if (savedGradientSize !== null) setGradientSizeState(parseFloat(savedGradientSize))
        }
    }, [])

    // Theme Engine: Calculate and apply colors
    React.useEffect(() => {
        if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

        const root = document.documentElement

        const applyTheme = () => {
            // Helper to generate OKLCH string
            // L: Lightness, C: Chroma (Vibrancy), H: Hue
            const color = (l: number, c: number, h: number) => `oklch(${l} ${c} ${h})`

            // Base Chroma based on vibrancy slider (0 to 1) -> mapped to reasonable OKLCH chroma (0 to 0.3)
            const baseChroma = vibrancy * 0.3

            // --- LIGHT MODE COLORS ---
            const light = {
                primary: color(0.6, baseChroma, brandHue),
                primaryForeground: color(0.98, 0, 0),
                background: color(0.98, baseChroma * 0.05, brandHue), // Very subtle tint
                foreground: color(0.15, baseChroma * 0.05, brandHue), // Dark contrast
                card: color(1, baseChroma * 0.02, brandHue), // Almost white
                cardForeground: color(0.15, baseChroma * 0.05, brandHue),
                navBar: color(0.96, baseChroma * 0.08, brandHue), // Slightly more tinted than bg
                border: color(0.92, baseChroma * 0.05, brandHue),
                accent: color(0.96, baseChroma * 0.05, brandHue),
                accentForeground: color(0.15, baseChroma * 0.05, brandHue),
                muted: color(0.96, baseChroma * 0.02, brandHue),
                mutedForeground: color(0.45, baseChroma * 0.05, brandHue),
            }

            // --- DARK MODE COLORS ---
            const dark = {
                primary: color(0.6, baseChroma, brandHue),
                primaryForeground: color(0.98, 0, 0),
                background: color(0.15, baseChroma * 0.05, brandHue), // Dark background
                foreground: color(0.98, baseChroma * 0.02, brandHue), // Light text
                card: color(0.20, baseChroma * 0.05, brandHue), // Slightly lighter than bg
                cardForeground: color(0.98, baseChroma * 0.02, brandHue),
                navBar: color(0.18, baseChroma * 0.05, brandHue),
                border: color(0.25, baseChroma * 0.05, brandHue),
                accent: color(0.25, baseChroma * 0.05, brandHue),
                accentForeground: color(0.98, baseChroma * 0.02, brandHue),
                muted: color(0.25, baseChroma * 0.05, brandHue),
                mutedForeground: color(0.65, baseChroma * 0.05, brandHue),
            }

            // Apply Variables
            // We set --[name]-light and --[name]-dark for everything to allow CSS to switch

            const setVar = (name: string, lightVal: string, darkVal: string) => {
                root.style.setProperty(`--${name}-light`, lightVal)
                root.style.setProperty(`--${name}-dark`, darkVal)
            }

            setVar('primary', light.primary, dark.primary)
            setVar('primary-foreground', light.primaryForeground, dark.primaryForeground)
            setVar('background', light.background, dark.background)
            setVar('foreground', light.foreground, dark.foreground)
            setVar('card', light.card, dark.card)
            setVar('card-foreground', light.cardForeground, dark.cardForeground)
            setVar('nav-bar', light.navBar, dark.navBar)
            setVar('border', light.border, dark.border)
            setVar('accent', light.accent, dark.accent)
            setVar('accent-foreground', light.accentForeground, dark.accentForeground)
            setVar('muted', light.muted, dark.muted)
            setVar('muted-foreground', light.mutedForeground, dark.mutedForeground)

            // Also set generic hue for other calculations if needed
            root.style.setProperty('--brand-hue', brandHue.toString())
        }

        applyTheme()
    }, [brandHue, vibrancy, mounted])

    const setBrandHue = React.useCallback((newHue: number) => {
        setBrandHueState(newHue)
        if (typeof window !== 'undefined') {
            localStorage.setItem("theme-brand-hue", newHue.toString())
        }
    }, [])

    const setVibrancy = React.useCallback((newVibrancy: number) => {
        setVibrancyState(newVibrancy)
        if (typeof window !== 'undefined') {
            localStorage.setItem("theme-vibrancy", newVibrancy.toString())
        }
    }, [])

    const setGradientOriginX = React.useCallback((x: number) => {
        setGradientOriginXState(x)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-gradient-origin-x", x.toString())
        }
    }, [])

    const setGradientOriginY = React.useCallback((y: number) => {
        setGradientOriginYState(y)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-gradient-origin-y", y.toString())
        }
    }, [])

    const setGradientSize = React.useCallback((size: number) => {
        setGradientSizeState(size)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-gradient-size", size.toString())
        }
    }, [])

    return (
        <ColorSchemeContext.Provider value={{
            brandHue, setBrandHue,
            vibrancy, setVibrancy,
            gradientOriginX, setGradientOriginX,
            gradientOriginY, setGradientOriginY,
            gradientSize, setGradientSize
        }}>
            {children}
        </ColorSchemeContext.Provider>
    )
}

export function useColorScheme() {
    const context = React.useContext(ColorSchemeContext)
    if (context === undefined) {
        throw new Error("useColorScheme must be used within a ColorSchemeProvider")
    }
    return context
}
