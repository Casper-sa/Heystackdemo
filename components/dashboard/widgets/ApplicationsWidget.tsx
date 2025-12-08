'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useApplications } from "@/components/application-provider";
import { formatDistanceToNow } from "date-fns";

const ApplicationsWidget = () => {
    const { applications } = useApplications();

    return (
        <div className="h-full overflow-auto p-1 custom-scrollbar">
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-2">
                {applications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-muted-foreground col-span-full border rounded-md bg-background/50">
                        No applications yet
                    </div>
                ) : (
                    applications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3 border rounded-md bg-background/50">
                            <div>
                                <h3 className="font-medium text-sm">{app.projectTitle}</h3>
                                <p className="text-xs text-muted-foreground">
                                    Applied {formatDistanceToNow(new Date(app.appliedDate))} ago
                                </p>
                            </div>
                            <Badge variant={app.status === "Pending" ? "secondary" : "default"} className="text-[10px]">
                                {app.status}
                            </Badge>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ApplicationsWidget;
