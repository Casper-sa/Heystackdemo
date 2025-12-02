'use client';

import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
}

interface CalendarWidgetProps {
    events?: CalendarEvent[];
    onAddEvent: (event: CalendarEvent) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events = [], onAddEvent }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventTime, setNewEventTime] = useState('12:00');

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const handleDateClick = (day: Date) => {
        setSelectedDate(day);
        setIsAddingEvent(true);
    };

    const handleSubmitEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEventTitle || !selectedDate) return;

        // Combine date and time
        const [hours, minutes] = newEventTime.split(':');
        const eventDate = new Date(selectedDate);
        eventDate.setHours(parseInt(hours), parseInt(minutes));

        const newEvent: CalendarEvent = {
            id: uuidv4(),
            title: newEventTitle,
            date: eventDate,
        };

        onAddEvent(newEvent);
        setNewEventTitle('');
        setIsAddingEvent(false);
    };

    return (
        <div className="h-full flex flex-col relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">
                    {format(currentDate, 'MMMM yyyy')}
                </h3>
                <div className="flex gap-1">
                    <button onClick={handlePrevMonth} className="p-1 hover:bg-muted rounded-[var(--radius)] text-muted-foreground">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-muted rounded-[var(--radius)] text-muted-foreground">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 flex-1 auto-rows-fr">
                {days.map(day => {
                    const hasEvents = events.some(e => isSameDay(new Date(e.date), day));
                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                    return (
                        <div
                            key={day.toString()}
                            onClick={() => handleDateClick(day)}
                            className={`
                relative flex items-center justify-center rounded-[var(--radius)] cursor-pointer transition-colors text-sm
                ${!isSameMonth(day, monthStart) ? 'text-muted-foreground/50' : 'text-muted-foreground'}
                ${isToday(day) ? 'bg-primary/20 text-primary font-bold border border-primary/50' : ''}
                ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}
              `}
                        >
                            {format(day, 'd')}
                            {hasEvents && (
                                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Add Event Overlay */}
            {isAddingEvent && (
                <div className="absolute inset-0 bg-card z-20 flex flex-col p-4 rounded-[var(--radius)] animate-in fade-in zoom-in duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-foreground">Add Event</h4>
                        <button onClick={() => setIsAddingEvent(false)} className="text-muted-foreground hover:text-foreground">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="text-sm text-primary mb-4 font-medium">
                        {selectedDate && format(selectedDate, 'EEEE, MMMM do')}
                    </div>

                    <form onSubmit={handleSubmitEvent} className="flex flex-col gap-3">
                        <div>
                            <label className="block text-xs text-muted-foreground mb-1">Event Title</label>
                            <input
                                type="text"
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)}
                                className="w-full bg-background border border-border rounded-[var(--radius)] px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                                placeholder="Meeting, Birthday..."
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-muted-foreground mb-1">Time</label>
                            <input
                                type="time"
                                value={newEventTime}
                                onChange={(e) => setNewEventTime(e.target.value)}
                                className="w-full bg-background border border-border rounded-[var(--radius)] px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-[var(--radius)] text-sm font-medium transition-colors"
                        >
                            Add Event
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CalendarWidget;
