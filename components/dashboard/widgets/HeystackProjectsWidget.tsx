'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HeystackProjectsWidget = () => {
    return (
        <div className="flex flex-col gap-4 h-full overflow-auto p-1">
            {/* Project 1 */}
            <Card className="flex flex-col shadow-none border bg-background/50">
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline">Research</Badge>
                        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">Active</Badge>
                    </div>
                    <CardTitle className="mt-2 text-base">AI-Powered Recycling</CardTitle>
                    <CardDescription className="text-xs">
                        Computer vision model to sort waste.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-4">
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <span>3 Members</span>
                        <span className="mx-2">•</span>
                        <span>2d ago</span>
                    </div>
                    <Button variant="outline" className="w-full h-8 text-xs">Manage</Button>
                </CardContent>
            </Card>

            {/* Project 2 */}
            <Card className="flex flex-col shadow-none border bg-background/50">
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline">Startup</Badge>
                        <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-0">Draft</Badge>
                    </div>
                    <CardTitle className="mt-2 text-base">Campus Drone</CardTitle>
                    <CardDescription className="text-xs">
                        Autonomous delivery system.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-4">
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <span>1 Member</span>
                        <span className="mx-2">•</span>
                        <span>1w ago</span>
                    </div>
                    <Button variant="outline" className="w-full h-8 text-xs">Edit</Button>
                </CardContent>
            </Card>

            {/* Joined Project */}
            <Card className="flex flex-col shadow-none border bg-background/50">
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline">Competition</Badge>
                        <Badge variant="secondary">Member</Badge>
                    </div>
                    <CardTitle className="mt-2 text-base">Solar Car Team</CardTitle>
                    <CardDescription className="text-xs">
                        World Solar Challenge vehicle.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-4">
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <span>15 Members</span>
                        <span className="mx-2">•</span>
                        <span>1d ago</span>
                    </div>
                    <Button className="w-full h-8 text-xs">View</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default HeystackProjectsWidget;
