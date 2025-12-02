'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuickStatsWidget = () => {
    return (
        <div className="grid gap-4 grid-cols-1 h-full overflow-auto p-1">
            <Card className="shadow-none border-0 bg-background/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
            </Card>
            <Card className="shadow-none border-0 bg-background/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-sm font-medium">Pending Apps</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">Waiting for review</p>
                </CardContent>
            </Card>
            <Card className="shadow-none border-0 bg-background/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+15% from last week</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuickStatsWidget;
