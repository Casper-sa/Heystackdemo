"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { MOCK_PROJECTS, Project } from "@/lib/data/mock-projects"

interface ProjectContextType {
    projects: Project[];
    updateTaskStatus: (projectId: number, taskId: number, newStatus: "To Do" | "In Progress" | "Done") => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)

    const updateTaskStatus = (projectId: number, taskId: number, newStatus: "To Do" | "In Progress" | "Done") => {
        setProjects(prevProjects => prevProjects.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    tasks: project.tasks.map(task => {
                        if (task.id === taskId) {
                            return { ...task, status: newStatus }
                        }
                        return task
                    })
                }
            }
            return project
        }))
    }

    return (
        <ProjectContext.Provider value={{ projects, updateTaskStatus }}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    const context = useContext(ProjectContext)
    if (context === undefined) {
        throw new Error("useProjects must be used within a ProjectProvider")
    }
    return context
}
