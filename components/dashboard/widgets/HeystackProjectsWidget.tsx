'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MOCK_PROJECTS } from "@/lib/data/mock-projects";
import { CheckCircle2 } from "lucide-react";

const HeystackProjectsWidget = () => {
    return (
        <div className="flex flex-col gap-4 h-full overflow-auto p-1 custom-scrollbar">
            {MOCK_PROJECTS.filter(p => p.isMember).map((project) => {
                const activeTasks = project.tasks?.filter(t => t.status !== "Done").length || 0;

                return (
                    <Card key={project.id} className="flex flex-col shadow-none border bg-background/50">
                        <CardHeader className="p-4 pb-2">
                            <div className="flex items-center justify-between">
                                <Badge variant="outline">{project.tags[0] || "Project"}</Badge>
                                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">Active</Badge>
                            </div>
                            <CardTitle className="mt-2 text-base">{project.title}</CardTitle>
                            <CardDescription className="text-xs line-clamp-1">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 pb-4">
                            <div className="flex items-center text-xs text-muted-foreground mb-3">
                                <span>{project.members} Members</span>
                                <span className="mx-2">•</span>
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>{activeTasks} active tasks</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full h-8 text-xs" asChild>
                                <Link href={`/projects/${project.id}`}>View Project</Link>
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}

            {MOCK_PROJECTS.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                    No projects found.
                </div>
            )}
        </div>
    );
};

export default HeystackProjectsWidget;
