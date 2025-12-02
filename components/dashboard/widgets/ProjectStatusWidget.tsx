'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface Project {
    id: number;
    name: string;
    status: 'todo' | 'in-progress' | 'done';
}

const ProjectStatusWidget = () => {
    const [projects, setProjects] = useState<Project[]>([
        { id: 1, name: "Website Redesign", status: "in-progress" },
        { id: 2, name: "Mobile App", status: "todo" },
        { id: 3, name: "Marketing Campaign", status: "done" },
    ]);

    const toggleStatus = (id: number) => {
        setProjects(projects.map(p => {
            if (p.id === id) {
                const nextStatus: Project['status'] = {
                    'todo': 'in-progress',
                    'in-progress': 'done',
                    'done': 'todo'
                }[p.status] as Project['status'];
                return { ...p, status: nextStatus };
            }
            return p;
        }));
    };

    const getStatusIcon = (status: Project['status']) => {
        switch (status) {
            case 'done': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'in-progress': return <Clock size={16} className="text-primary" />;
            default: return <Circle size={16} className="text-muted-foreground" />;
        }
    };

    const getStatusText = (status: Project['status']) => {
        switch (status) {
            case 'done': return 'Done';
            case 'in-progress': return 'In Progress';
            default: return 'To Do';
        }
    };

    return (
        <div className="h-full flex flex-col gap-2 p-1 overflow-auto custom-scrollbar">
            {projects.map(project => (
                <div
                    key={project.id}
                    onClick={() => toggleStatus(project.id)}
                    className="flex items-center justify-between p-2 rounded-[var(--radius)] bg-background/30 hover:bg-background/50 cursor-pointer transition-colors"
                >
                    <div className="flex items-center gap-2 min-w-0">
                        {getStatusIcon(project.status)}
                        <span className="text-sm text-foreground truncate">{project.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap ml-2">
                        {getStatusText(project.status)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ProjectStatusWidget;
