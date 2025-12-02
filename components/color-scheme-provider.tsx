"use client"

import * as React from "react"

type ColorSchemeContextType = {
    hue: number
    setHue: (hue: number) => void
    primaryVibrancy: number
    setPrimaryVibrancy: (vibrancy: number) => void
    backgroundHue: number
    setBackgroundHue: (hue: number) => void
    backgroundVibrancy: number
    setBackgroundVibrancy: (vibrancy: number) => void
    accentButtonHue: number
    setAccentButtonHue: (hue: number) => void
    accentButtonVibrancy: number
    setAccentButtonVibrancy: (vibrancy: number) => void
    navBarHue: number
    setNavBarHue: (hue: number) => void
    navBarVibrancy: number
    setNavBarVibrancy: (vibrancy: number) => void
    cardHue: number
    setCardHue: (hue: number) => void
    cardVibrancy: number
    setCardVibrancy: (vibrancy: number) => void
    textHue: number
    setTextHue: (hue: number) => void
    textVibrancy: number
    setTextVibrancy: (vibrancy: number) => void
    gradientOriginX: number
    setGradientOriginX: (x: number) => void
    gradientOriginY: number
    setGradientOriginY: (y: number) => void
    gradientSize: number
    setGradientSize: (size: number) => void
}

const ColorSchemeContext = React.createContext<ColorSchemeContextType | undefined>(undefined)

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
    const [hue, setHueState] = React.useState<number>(0)
    const [primaryVibrancy, setPrimaryVibrancyState] = React.useState<number>(0.18)

    const [backgroundHue, setBackgroundHueState] = React.useState<number>(0)
    const [backgroundVibrancy, setBackgroundVibrancyState] = React.useState<number>(0.04)

    const [accentButtonHue, setAccentButtonHueState] = React.useState<number>(220)
    const [accentButtonVibrancy, setAccentButtonVibrancyState] = React.useState<number>(0.18)

    const [navBarHue, setNavBarHueState] = React.useState<number>(0)
    const [navBarVibrancy, setNavBarVibrancyState] = React.useState<number>(0.04)

    const [cardHue, setCardHueState] = React.useState<number>(0)
    const [cardVibrancy, setCardVibrancyState] = React.useState<number>(0.04)

    const [textHue, setTextHueState] = React.useState<number>(0)
    const [textVibrancy, setTextVibrancyState] = React.useState<number>(0.02)

    const [gradientOriginX, setGradientOriginXState] = React.useState<number>(50) // Default center (50%)
    const [gradientOriginY, setGradientOriginYState] = React.useState<number>(50) // Default center (50%)
    const [gradientSize, setGradientSizeState] = React.useState<number>(30) // Default size (30% - the transition point)

    const [mounted, setMounted] = React.useState(false)

    // Load saved preferences from localStorage on mount
    React.useEffect(() => {
        setMounted(true)
        if (typeof window !== 'undefined') {
            const savedHue = localStorage.getItem("color-scheme-hue")
            if (savedHue !== null) setHueState(parseInt(savedHue, 10))

            const savedPrimaryVibrancy = localStorage.getItem("color-scheme-primary-vibrancy")
            if (savedPrimaryVibrancy !== null) setPrimaryVibrancyState(parseFloat(savedPrimaryVibrancy))

            const savedBackgroundHue = localStorage.getItem("color-scheme-background-hue")
            if (savedBackgroundHue !== null) setBackgroundHueState(parseInt(savedBackgroundHue, 10))

            const savedBackgroundVibrancy = localStorage.getItem("color-scheme-background-vibrancy")
            if (savedBackgroundVibrancy !== null) setBackgroundVibrancyState(parseFloat(savedBackgroundVibrancy))

            const savedAccentButtonHue = localStorage.getItem("color-scheme-accent-button-hue")
            if (savedAccentButtonHue !== null) setAccentButtonHueState(parseInt(savedAccentButtonHue, 10))

            const savedAccentButtonVibrancy = localStorage.getItem("color-scheme-accent-button-vibrancy")
            if (savedAccentButtonVibrancy !== null) setAccentButtonVibrancyState(parseFloat(savedAccentButtonVibrancy))

            const savedNavBarHue = localStorage.getItem("color-scheme-nav-bar-hue")
            if (savedNavBarHue !== null) setNavBarHueState(parseInt(savedNavBarHue, 10))

            const savedNavBarVibrancy = localStorage.getItem("color-scheme-nav-bar-vibrancy")
            if (savedNavBarVibrancy !== null) setNavBarVibrancyState(parseFloat(savedNavBarVibrancy))

            const savedCardHue = localStorage.getItem("color-scheme-card-hue")
            if (savedCardHue !== null) setCardHueState(parseInt(savedCardHue, 10))

            const savedCardVibrancy = localStorage.getItem("color-scheme-card-vibrancy")
            if (savedCardVibrancy !== null) setCardVibrancyState(parseFloat(savedCardVibrancy))

            const savedTextHue = localStorage.getItem("color-scheme-text-hue")
            if (savedTextHue !== null) setTextHueState(parseInt(savedTextHue, 10))

            const savedTextVibrancy = localStorage.getItem("color-scheme-text-vibrancy")
            if (savedTextVibrancy !== null) setTextVibrancyState(parseFloat(savedTextVibrancy))

            const savedGradientOriginX = localStorage.getItem("color-scheme-gradient-origin-x")
            if (savedGradientOriginX !== null) setGradientOriginXState(parseFloat(savedGradientOriginX))

            const savedGradientOriginY = localStorage.getItem("color-scheme-gradient-origin-y")
            if (savedGradientOriginY !== null) setGradientOriginYState(parseFloat(savedGradientOriginY))

            const savedGradientSize = localStorage.getItem("color-scheme-gradient-size")
            if (savedGradientSize !== null) setGradientSizeState(parseFloat(savedGradientSize))
        }
    }, [])

    // Update CSS variables when hue or vibrancy changes
    React.useEffect(() => {
        if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

        const root = document.documentElement

        // Apply hue rotation to color variables
        const applyHueToColors = () => {
            // Primary colors - shift hue based on selection
            root.style.setProperty('--color-hue', hue.toString())

            // Update primary color with new hue and vibrancy
            const lightPrimary = `oklch(0.6 ${primaryVibrancy} ${hue})`
            const lightPrimaryForeground = `oklch(0.985 0 0)`

            // For dark mode primary
            const darkPrimary = `oklch(0.6 ${primaryVibrancy} ${hue})`
            const darkPrimaryForeground = `oklch(0.985 0 0)`

            // Accent colors (slightly offset hue)
            const accentHue = (hue + 30) % 360
            const lightAccent = `oklch(0.95 0.08 ${accentHue})`
            const darkAccent = `oklch(0.269 0.08 ${accentHue})`

            // Chart colors with varied hues
            const chart1Hue = hue
            const chart2Hue = (hue + 72) % 360
            const chart3Hue = (hue + 144) % 360
            const chart4Hue = (hue + 216) % 360
            const chart5Hue = (hue + 288) % 360

            // Apply to light mode
            root.style.setProperty('--primary', lightPrimary)
            root.style.setProperty('--primary-foreground', lightPrimaryForeground)
            root.style.setProperty('--accent', lightAccent)
            root.style.setProperty('--chart-1', `oklch(0.646 0.222 ${chart1Hue})`)
            root.style.setProperty('--chart-2', `oklch(0.6 0.118 ${chart2Hue})`)
            root.style.setProperty('--chart-3', `oklch(0.7 0.15 ${chart3Hue})`)
            root.style.setProperty('--chart-4', `oklch(0.65 0.2 ${chart4Hue})`)
            root.style.setProperty('--chart-5', `oklch(0.7 0.188 ${chart5Hue})`)

            // Store dark mode values as CSS variables
            root.style.setProperty('--dark-primary', darkPrimary)
            root.style.setProperty('--dark-primary-foreground', darkPrimaryForeground)
            root.style.setProperty('--dark-accent', darkAccent)
        }

        applyHueToColors()
    }, [hue, primaryVibrancy, mounted])

    // Update background CSS variables when background hue or vibrancy changes
    React.useEffect(() => {
        if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

        const root = document.documentElement

        const applyBackgroundHue = () => {
            // Apply subtle tint to page background only (not cards)
            // Light mode: very light tinted background
            const lightBackground = `oklch(0.98 ${backgroundVibrancy} ${backgroundHue})`

            // Dark mode: subtle tinted dark background  
            const darkBackground = `oklch(0.16 ${backgroundVibrancy} ${backgroundHue})`

            // Apply to light mode - only background, not cards
            root.style.setProperty('--background', lightBackground)

            // For dark mode, we need to check if dark class is active
            // and apply the dark background directly
            if (document.documentElement.classList.contains('dark')) {
                root.style.setProperty('--background', darkBackground)
            }
        }

        applyBackgroundHue()

        // Listen for theme changes to update background accordingly
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    applyBackgroundHue()
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [backgroundHue, backgroundVibrancy, mounted])

    // Update accent button CSS variables when accent button hue or vibrancy changes
    React.useEffect(() => {
        if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

        const root = document.documentElement

        const applyAccentButtonHue = () => {
            // Calculate colors based on hue and vibrancy
            const buttonColor = `oklch(0.6 ${accentButtonVibrancy} ${accentButtonHue})`
            const buttonForeground = `oklch(0.98 0 0)` // White text

            // Apply to CSS variables
            root.style.setProperty('--accent-button', buttonColor)
            root.style.setProperty('--accent-button-foreground', buttonForeground)
        }

        applyAccentButtonHue()
    }, [accentButtonHue, accentButtonVibrancy, mounted])

    // Update nav bar CSS variables when nav bar hue or vibrancy changes
    React.useEffect(() => {
        if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

        const root = document.documentElement

        const applyNavBarHue = () => {
            // Apply color to nav bar only
            // Light mode: light tinted nav bar background
            const lightNavBar = `oklch(1 ${navBarVibrancy} ${navBarHue})`

            // Dark mode: subtle tinted dark nav bar background  
            const darkNavBar = `oklch(0.205 ${navBarVibrancy} ${navBarHue})`

            // Apply to light mode
            root.style.setProperty('--nav-bar', lightNavBar)

            // For dark mode, we need to check if dark class is active
            // and apply the dark nav bar directly
            if (document.documentElement.classList.contains('dark')) {
                root.style.setProperty('--nav-bar', darkNavBar)
            }
        }

        applyNavBarHue()

        // Listen for theme changes to update nav bar accordingly
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    applyNavBarHue()
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [navBarHue, navBarVibrancy, mounted])

    // Update card CSS variables when card hue or vibrancy changes
    React.useEffect(() => {
        if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

        const root = document.documentElement

        const applyCardHue = () => {
            // Apply color to cards only
            // Light mode: light tinted card background
            const lightCard = `oklch(1 ${cardVibrancy} ${cardHue})`

            // Dark mode: subtle tinted dark card background  
            const darkCard = `oklch(0.205 ${cardVibrancy} ${cardHue})`

            // Apply to light mode
            root.style.setProperty('--card', lightCard)

            // For dark mode, we need to check if dark class is active
            // and apply the dark card directly
            if (document.documentElement.classList.contains('dark')) {
                root.style.setProperty('--card', darkCard)
            }
        }

        applyCardHue()

        // Listen for theme changes to update card accordingly
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    applyCardHue()
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [cardHue, cardVibrancy, mounted])

    // Update text (foreground) CSS variables when text hue or vibrancy changes
    React.useEffect(() => {
        if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

        const root = document.documentElement

        const applyTextHue = () => {
            // Apply color to text (foreground)
            // Light mode: dark text (low lightness for readability on light backgrounds)
            const lightText = `oklch(0.145 ${textVibrancy} ${textHue})`

            // Dark mode: light text (high lightness for readability on dark backgrounds)
            const darkText = `oklch(0.985 ${textVibrancy} ${textHue})`

            // Apply to light mode
            root.style.setProperty('--foreground', lightText)

            // For dark mode, we need to check if dark class is active
            // and apply the dark text directly
            if (document.documentElement.classList.contains('dark')) {
                root.style.setProperty('--foreground', darkText)
            }
        }

        applyTextHue()

        // Listen for theme changes to update text accordingly
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    applyTextHue()
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [textHue, textVibrancy, mounted])

    const setHue = React.useCallback((newHue: number) => {
        setHueState(newHue)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-hue", newHue.toString())
        }
    }, [])

    const setPrimaryVibrancy = React.useCallback((newVibrancy: number) => {
        setPrimaryVibrancyState(newVibrancy)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-primary-vibrancy", newVibrancy.toString())
        }
    }, [])

    const setBackgroundHue = React.useCallback((newHue: number) => {
        setBackgroundHueState(newHue)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-background-hue", newHue.toString())
        }
    }, [])

    const setBackgroundVibrancy = React.useCallback((newVibrancy: number) => {
        setBackgroundVibrancyState(newVibrancy)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-background-vibrancy", newVibrancy.toString())
        }
    }, [])

    const setAccentButtonHue = React.useCallback((newHue: number) => {
        setAccentButtonHueState(newHue)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-accent-button-hue", newHue.toString())
        }
    }, [])

    const setAccentButtonVibrancy = React.useCallback((newVibrancy: number) => {
        setAccentButtonVibrancyState(newVibrancy)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-accent-button-vibrancy", newVibrancy.toString())
        }
    }, [])

    const setNavBarHue = React.useCallback((newHue: number) => {
        setNavBarHueState(newHue)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-nav-bar-hue", newHue.toString())
        }
    }, [])

    const setNavBarVibrancy = React.useCallback((newVibrancy: number) => {
        setNavBarVibrancyState(newVibrancy)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-nav-bar-vibrancy", newVibrancy.toString())
        }
    }, [])

    const setCardHue = React.useCallback((newHue: number) => {
        setCardHueState(newHue)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-card-hue", newHue.toString())
        }
    }, [])

    const setCardVibrancy = React.useCallback((newVibrancy: number) => {
        setCardVibrancyState(newVibrancy)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-card-vibrancy", newVibrancy.toString())
        }
    }, [])

    const setTextHue = React.useCallback((newHue: number) => {
        setTextHueState(newHue)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-text-hue", newHue.toString())
        }
    }, [])

    const setTextVibrancy = React.useCallback((newVibrancy: number) => {
        setTextVibrancyState(newVibrancy)
        if (typeof window !== 'undefined') {
            localStorage.setItem("color-scheme-text-vibrancy", newVibrancy.toString())
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
            hue, setHue, primaryVibrancy, setPrimaryVibrancy,
            backgroundHue, setBackgroundHue, backgroundVibrancy, setBackgroundVibrancy,
            accentButtonHue, setAccentButtonHue, accentButtonVibrancy, setAccentButtonVibrancy,
            navBarHue, setNavBarHue, navBarVibrancy, setNavBarVibrancy,
            cardHue, setCardHue, cardVibrancy, setCardVibrancy,
            textHue, setTextHue, textVibrancy, setTextVibrancy,
            gradientOriginX, setGradientOriginX, gradientOriginY, setGradientOriginY,
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
