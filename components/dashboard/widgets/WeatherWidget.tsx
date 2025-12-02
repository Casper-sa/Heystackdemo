'use client';

import React from 'react';
import { CloudSun, Wind, Droplets } from 'lucide-react';

interface WeatherWidgetProps {
    location?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location = 'London, UK' }) => {
    return (
        <div className="h-full flex flex-col justify-between p-2">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-muted-foreground text-sm font-medium">{location}</h4>
                    <p className="text-foreground text-xs mt-1">Partly Cloudy</p>
                </div>
                <CloudSun size={32} className="text-primary" />
            </div>

            <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-bold text-foreground">18°</span>
                <span className="text-muted-foreground mb-1">C</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-background/30 rounded-[var(--radius)] p-2 flex items-center gap-2">
                    <Wind size={14} className="text-muted-foreground" />
                    <span className="text-xs text-foreground">12 km/h</span>
                </div>
                <div className="bg-background/30 rounded-[var(--radius)] p-2 flex items-center gap-2">
                    <Droplets size={14} className="text-muted-foreground" />
                    <span className="text-xs text-foreground">42%</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
