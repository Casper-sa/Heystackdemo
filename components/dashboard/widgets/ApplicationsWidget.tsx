'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";

const ApplicationsWidget = () => {
    return (
        <div className="h-full overflow-auto p-1">
            <div className="divide-y border rounded-md bg-background/50">
                <div className="flex items-center justify-between p-3">
                    <div>
                        <h3 className="font-medium text-sm">Quantum Computing</h3>
                        <p className="text-xs text-muted-foreground">Applied 3 days ago</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">Review</Badge>
                </div>
                <div className="flex items-center justify-between p-3">
                    <div>
                        <h3 className="font-medium text-sm">FinTech App</h3>
                        <p className="text-xs text-muted-foreground">Applied 1 week ago</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">Review</Badge>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsWidget;
