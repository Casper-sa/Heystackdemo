"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { UserProfileValues } from "@/lib/validations/user"

interface UserContextType {
    user: UserProfileValues
    updateUser: (data: UserProfileValues) => void
}

const defaultUser: UserProfileValues = {
    name: "Casper Student",
    bio: "Computer Science student at KTH passionate about web development and AI.",
    skills: "React, Next.js, TypeScript, Python",
    portfolioUrl: "https://github.com/casper",
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfileValues>(defaultUser)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const savedUser = localStorage.getItem("heystack-user")
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (e) {
                console.error("Failed to parse user from local storage", e)
            }
        }
        setMounted(true)
    }, [])

    const updateUser = (data: UserProfileValues) => {
        setUser(data)
        localStorage.setItem("heystack-user", JSON.stringify(data))
    }

    if (!mounted) {
        return null
    }

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
