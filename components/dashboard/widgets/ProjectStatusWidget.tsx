'use client';

import React from 'react';
import { CheckCircle2, Circle, Clock, X } from 'lucide-react';
import { useTasks } from '@/components/task-provider';
import { useProjects } from '@/components/project-provider';
import { Button } from '@/components/ui/button';

const ProjectStatusWidget = () => {
    const { pinnedTaskIds, removeTask } = useTasks();
    const { projects, updateTaskStatus } = useProjects();

    // Derive pinned tasks from projects data
    const pinnedTasks = pinnedTaskIds.map(id => {
        const [projectIdStr, taskIdStr] = id.split('-');
        const projectId = parseInt(projectIdStr);
        const taskId = parseInt(taskIdStr);
        const project = projects.find(p => p.id === projectId);
        const task = project?.tasks.find(t => t.id === taskId);

        if (project && task) {
            return {
                id,
                projectId,
                taskId,
                title: task.title,
                projectName: project.title,
                status: task.status
            };
        }
        return null;
    }).filter(t => t !== null);

    const handleToggleStatus = (projectId: number, taskId: number, currentStatus: string) => {
        const nextStatus = {
            "To Do": "In Progress",
            "In Progress": "Done",
            "Done": "To Do"
        }[currentStatus] as "To Do" | "In Progress" | "Done";

        updateTaskStatus(projectId, taskId, nextStatus);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Done': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'In Progress': return <Clock size={16} className="text-primary" />;
            default: return <Circle size={16} className="text-muted-foreground" />;
        }
    };

    return (
        <div className="h-full grid grid-cols-1 @md:grid-cols-2 gap-2 p-1 overflow-auto custom-scrollbar content-start">
            {pinnedTasks.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm text-center p-4 col-span-full">
                    No tasks pinned. Go to a project page to add tasks.
                </div>
            ) : (
                pinnedTasks.map(task => (
                    <div
                        key={task!.id}
                        className="group flex items-center justify-between p-2 rounded-[var(--radius)] bg-background/30 hover:bg-background/50 transition-colors"
                    >
                        <div
                            className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                            onClick={() => handleToggleStatus(task!.projectId, task!.taskId, task!.status)}
                        >
                            {getStatusIcon(task!.status)}
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm text-foreground truncate">{task!.title}</span>
                                <span className="text-[10px] text-muted-foreground truncate">{task!.projectName}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap hidden sm:inline-block">
                                {task!.status}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeTask(task!.id);
                                }}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProjectStatusWidget;
