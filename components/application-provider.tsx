"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export interface Application {
    id: string
    projectId: number
    projectTitle: string
    status: "Pending" | "Reviewing" | "Accepted" | "Rejected"
    appliedDate: string
    coverLetter?: string
}

interface ApplicationContextType {
    applications: Application[]
    applyToProject: (projectId: number, projectTitle: string, coverLetter: string) => void
    hasApplied: (projectId: number) => boolean
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

const STORAGE_KEY = "heystack-applications"

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
    const [applications, setApplications] = useState<Application[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                setApplications(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse applications", e)
            }
        }
        setMounted(true)
    }, [])

    const applyToProject = (projectId: number, projectTitle: string, coverLetter: string) => {
        const newApplication: Application = {
            id: Math.random().toString(36).substring(7),
            projectId,
            projectTitle,
            status: "Pending",
            appliedDate: new Date().toISOString(),
            coverLetter,
        }

        setApplications((prev) => {
            const updated = [...prev, newApplication]
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
            return updated
        })

        // We can use a simple alert if sonner isn't set up, or just rely on the UI update
        // alert(`Applied to ${projectTitle}!`) 
    }

    const hasApplied = (projectId: number) => {
        return applications.some((app) => app.projectId === projectId)
    }

    if (!mounted) {
        return null
    }

    return (
        <ApplicationContext.Provider value={{ applications, applyToProject, hasApplied }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export function useApplications() {
    const context = useContext(ApplicationContext)
    if (context === undefined) {
        throw new Error("useApplications must be used within an ApplicationProvider")
    }
    return context
}
