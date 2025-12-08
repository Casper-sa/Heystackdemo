"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface TaskContextType {
    pinnedTaskIds: string[];
    addTask: (taskId: string) => void;
    removeTask: (taskId: string) => void;
    isTaskPinned: (taskId: string) => boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [pinnedTaskIds, setPinnedTaskIds] = useState<string[]>([])

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("heystack-pinned-task-ids")
        if (stored) {
            try {
                setPinnedTaskIds(JSON.parse(stored))
            } catch (e) {
                console.error("Failed to parse pinned task ids", e)
            }
        } else {
            // Default initial state for demo purposes
            setPinnedTaskIds(["1-1", "2-1"])
        }
    }, [])

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("heystack-pinned-task-ids", JSON.stringify(pinnedTaskIds))
    }, [pinnedTaskIds])

    const addTask = (taskId: string) => {
        if (!pinnedTaskIds.includes(taskId)) {
            setPinnedTaskIds([...pinnedTaskIds, taskId])
        }
    }

    const removeTask = (taskId: string) => {
        setPinnedTaskIds(pinnedTaskIds.filter(id => id !== taskId))
    }

    const isTaskPinned = (taskId: string) => {
        return pinnedTaskIds.includes(taskId)
    }

    return (
        <TaskContext.Provider value={{ pinnedTaskIds, addTask, removeTask, isTaskPinned }}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    const context = useContext(TaskContext)
    if (context === undefined) {
        throw new Error("useTasks must be used within a TaskProvider")
    }
    return context
}
