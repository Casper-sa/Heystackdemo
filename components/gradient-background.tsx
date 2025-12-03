"use client"

import * as React from "react"
import { useColorScheme } from "./color-scheme-provider"

export function GradientBackground() {
    const { brandHue, vibrancy, gradientOriginX, gradientOriginY, gradientSize } = useColorScheme()
    const [mounted, setMounted] = React.useState(false)
    const [isDark, setIsDark] = React.useState(false)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

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

    // Celestial Animation Loop
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !mounted) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let stars: { x: number, y: number, size: number, opacity: number, speed: number }[] = []
        let clouds: { x: number, y: number, size: number, opacity: number, speed: number }[] = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initElements()
        }

        const initElements = () => {
            // Init Stars
            stars = []
            for (let i = 0; i < 150; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2,
                    opacity: Math.random(),
                    speed: 0.005 + Math.random() * 0.01
                })
            }

            // Init Clouds
            clouds = []
            for (let i = 0; i < 8; i++) {
                clouds.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * (canvas.height / 2), // Keep clouds in upper half
                    size: 50 + Math.random() * 100,
                    opacity: 0.1 + Math.random() * 0.2,
                    speed: 0.1 + Math.random() * 0.2
                })
            }
        }

        const drawStars = () => {
            ctx.fillStyle = 'white'
            stars.forEach(star => {
                ctx.globalAlpha = star.opacity
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fill()

                // Twinkle
                star.opacity += star.speed
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.speed = -star.speed
                }
            })
        }

        const drawClouds = () => {
            clouds.forEach(cloud => {
                ctx.globalAlpha = cloud.opacity
                ctx.fillStyle = 'white'
                ctx.beginPath()
                ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2)
                // Add some "fluff"
                ctx.arc(cloud.x + cloud.size * 0.5, cloud.y - cloud.size * 0.2, cloud.size * 0.8, 0, Math.PI * 2)
                ctx.arc(cloud.x - cloud.size * 0.5, cloud.y - cloud.size * 0.2, cloud.size * 0.8, 0, Math.PI * 2)
                ctx.fill()

                // Move
                cloud.x += cloud.speed
                if (cloud.x - cloud.size * 2 > canvas.width) {
                    cloud.x = -cloud.size * 2
                }
            })
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (isDark) {
                drawStars()
            } else {
                drawClouds()
            }

            animationFrameId = requestAnimationFrame(render)
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()
        render()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [mounted, isDark])

    // Calculate gradient colors
    const gradientStyle = React.useMemo(() => {
        if (!mounted) return undefined

        let centerColor: string
        let outerColor: string
        let glareGradient = ''

        // Base chroma from vibrancy
        const chroma = vibrancy * 0.3

        if (isDark) {
            // Dark mode: lighter at center, darker at edges
            // Center: slightly lighter than bg
            centerColor = `oklch(0.36 ${chroma} ${brandHue})`
            // Outer: darker than bg
            outerColor = `oklch(0.00 ${chroma} ${brandHue})`
        } else {
            // Light mode: lighter at center, darker at edges
            // Center: white-ish
            centerColor = `oklch(1 ${chroma * 0.2} ${brandHue})`
            // Outer: slightly darker
            outerColor = `oklch(0.64 ${chroma * 0.5} ${brandHue})`

            // Glare effect for light mode
            // Bright white center fading to transparent
            glareGradient = `radial-gradient(circle at ${gradientOriginX}% ${gradientOriginY}%, white 0%, transparent 40%), `
        }

        return {
            background: `${glareGradient}radial-gradient(circle at ${gradientOriginX}% ${gradientOriginY}%, ${centerColor} 0%, ${centerColor} ${gradientSize}%, ${outerColor} 100%)`,
            minHeight: '100vh',
        }
    }, [mounted, isDark, brandHue, vibrancy, gradientOriginX, gradientOriginY, gradientSize])

    if (!mounted) {
        return null
    }

    return (
        <div className="fixed inset-0 -z-50 transition-all duration-700 ease-in-out" style={gradientStyle}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-60"
            />
        </div>
    )
}

