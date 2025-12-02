'use client';

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Widget from './Widget';
import CalendarWidget, { CalendarEvent } from './widgets/CalendarWidget';
import TodoListWidget from './widgets/TodoListWidget';
import WeatherWidget from './widgets/WeatherWidget';
import MusicPlayerWidget from './widgets/MusicPlayerWidget';
import ProjectStatusWidget from './widgets/ProjectStatusWidget';

import QuickStatsWidget from './widgets/QuickStatsWidget';
import HeystackProjectsWidget from './widgets/HeystackProjectsWidget';
import ApplicationsWidget from './widgets/ApplicationsWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        setEvents([
            { id: '1', title: 'Project Review', date: new Date(new Date().setHours(new Date().getHours() + 2)) },
            { id: '2', title: 'Team Lunch', date: new Date(new Date().setDate(new Date().getDate() + 1)) },
        ]);
    }, []);

    const [layouts, setLayouts] = useState({
        lg: [
            { i: 'stats', x: 0, y: 0, w: 3, h: 10 },
            { i: 'heystack_projects', x: 3, y: 0, w: 3, h: 14 },
            { i: 'applications', x: 6, y: 0, w: 3, h: 6 },
            { i: 'weather', x: 9, y: 0, w: 3, h: 4 },
            { i: 'music', x: 9, y: 4, w: 3, h: 4 },
            { i: 'projects', x: 6, y: 6, w: 3, h: 4 },
            { i: 'calendar', x: 0, y: 10, w: 4, h: 8 },
            { i: 'todo', x: 4, y: 14, w: 4, h: 8 },
            { i: 'welcome', x: 8, y: 10, w: 4, h: 6 },
        ],
    });

    const onLayoutChange = (layout: any, layouts: any) => {
        setLayouts(layouts);
    };

    const handleAddEvent = (newEvent: CalendarEvent) => {
        setEvents(prev => [...prev, newEvent]);
    };

    return (
        <div className="w-full min-h-screen pb-20">
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                draggableHandle=".drag-handle"
                margin={[16, 16]}
                onLayoutChange={onLayoutChange}
            >
                {/* Heystack Widgets */}
                <Widget key="stats" title="Quick Stats">
                    <QuickStatsWidget />
                </Widget>
                <Widget key="heystack_projects" title="My Projects">
                    <HeystackProjectsWidget />
                </Widget>
                <Widget key="applications" title="Applications">
                    <ApplicationsWidget />
                </Widget>

                {/* Original Widgets */}
                <Widget key="weather" title="Weather">
                    <WeatherWidget />
                </Widget>
                <Widget key="music" title="Music Player">
                    <MusicPlayerWidget />
                </Widget>
                <Widget key="projects" title="Project Status">
                    <ProjectStatusWidget />
                </Widget>

                <Widget key="calendar" title="Calendar">
                    <CalendarWidget events={events} onAddEvent={handleAddEvent} />
                </Widget>

                <Widget key="todo" title="Upcoming Events">
                    <TodoListWidget events={events} />
                </Widget>

                <Widget key="welcome" title="Welcome">
                    <div className="flex items-center justify-between h-full">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Welcome back, Casper!</h2>
                            <p className="text-muted-foreground">Here is what's happening with your projects today.</p>
                        </div>
                    </div>
                </Widget>

            </ResponsiveGridLayout>
        </div>
    );
};

export default Dashboard;
