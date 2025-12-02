'use client';

import React, { useState, useEffect } from 'react';
import { format, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from './CalendarWidget';

interface TodoListWidgetProps {
    events?: CalendarEvent[];
}

const TodoListWidget: React.FC<TodoListWidgetProps> = ({ events = [] }) => {
    const [now, setNow] = useState<Date | null>(null);

    // Update 'now' every minute to refresh countdowns
    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => {
            setNow(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    if (!now) return null;

    // Filter future events and sort by date
    const upcomingEvents = events
        .filter(event => new Date(event.date) > now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const getCountdown = (date: Date) => {
        const eventDate = new Date(date);
        const days = differenceInDays(eventDate, now);
        const hours = differenceInHours(eventDate, now) % 24;
        const minutes = differenceInMinutes(eventDate, now) % 60;

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };

    if (upcomingEvents.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <CalendarIcon size={32} className="mb-2 opacity-50" />
                <p className="text-sm">No upcoming events</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 h-full overflow-auto pr-1">
            {upcomingEvents.map(event => (
                <div key={event.id} className="bg-background/50 rounded-[var(--radius)] p-3 border border-border flex items-center justify-between group hover:border-muted-foreground transition-colors">
                    <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-foreground truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <CalendarIcon size={10} />
                            {format(new Date(event.date), 'MMM d, h:mm a')}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-background px-2 py-1 rounded-[var(--radius)] text-xs font-mono text-foreground border border-border">
                        <Clock size={12} />
                        <span>{getCountdown(event.date)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoListWidget;
