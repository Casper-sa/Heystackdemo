'use client';

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Widget, { WidgetSettings, DEFAULT_WIDGET_SETTINGS } from './Widget';
import CalendarWidget, { CalendarEvent } from './widgets/CalendarWidget';
import TodoListWidget from './widgets/TodoListWidget';
import WeatherWidget from './widgets/WeatherWidget';
import MusicPlayerWidget from './widgets/MusicPlayerWidget';
import ProjectStatusWidget from './widgets/ProjectStatusWidget';

import QuickStatsWidget from './widgets/QuickStatsWidget';
import HeystackProjectsWidget from './widgets/HeystackProjectsWidget';
import ApplicationsWidget from './widgets/ApplicationsWidget';
import WelcomeWidget from './widgets/WelcomeWidget';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";
import { useUser } from "@/components/user-provider";

const ResponsiveGridLayout = WidthProvider(Responsive);

const STORAGE_KEY = 'heystack-dashboard-layout';
const EVENTS_STORAGE_KEY = 'heystack-dashboard-events';
const SETTINGS_STORAGE_KEY = 'heystack-dashboard-settings';
const WEATHER_STORAGE_KEY = 'heystack-dashboard-weather';

const DEFAULT_LAYOUTS = {
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
};

const getDefaultEvents = (): CalendarEvent[] => [
    { id: '1', title: 'Project Review', date: new Date(new Date().setHours(new Date().getHours() + 2)) },
    { id: '2', title: 'Team Lunch', date: new Date(new Date().setDate(new Date().getDate() + 1)) },
];

const Dashboard = () => {
    const { user } = useUser();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [layouts, setLayouts] = useState(DEFAULT_LAYOUTS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [widgetSettings, setWidgetSettings] = useState<Record<string, WidgetSettings>>({});
    const [weatherLocation, setWeatherLocation] = useState('London, UK');

    useEffect(() => {
        // Load events from LocalStorage
        const savedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        if (savedEvents) {
            try {
                const parsedEvents = JSON.parse(savedEvents);
                // Convert date strings back to Date objects
                const eventsWithDates = parsedEvents.map((e: any) => ({
                    ...e,
                    date: new Date(e.date)
                }));
                setEvents(eventsWithDates);
            } catch (e) {
                console.error("Failed to parse saved events", e);
                setEvents(getDefaultEvents());
            }
        } else {
            setEvents(getDefaultEvents());
        }

        // Load layout from LocalStorage on mount
        const savedLayout = localStorage.getItem(STORAGE_KEY);
        if (savedLayout) {
            try {
                setLayouts(JSON.parse(savedLayout));
            } catch (e) {
                console.error("Failed to parse saved layout", e);
            }
        }

        // Load settings from LocalStorage
        const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (savedSettings) {
            try {
                setWidgetSettings(JSON.parse(savedSettings));
            } catch (e) {
                console.error("Failed to parse saved settings", e);
            }
        }

        const savedWeather = localStorage.getItem(WEATHER_STORAGE_KEY);
        if (savedWeather) setWeatherLocation(savedWeather);

        setIsLoaded(true);
    }, []);

    const onLayoutChange = (layout: any, allLayouts: any) => {
        setLayouts(allLayouts);
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allLayouts));
        }
    };

    const resetLayout = () => {
        setLayouts(DEFAULT_LAYOUTS);
        localStorage.removeItem(STORAGE_KEY);

        setEvents(getDefaultEvents());
        localStorage.removeItem(EVENTS_STORAGE_KEY);
    };

    const handleAddEvent = (newEvent: CalendarEvent) => {
        setEvents(prev => {
            const updatedEvents = [...prev, newEvent];
            localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
            return updatedEvents;
        });
    };

    const handleSettingsChange = (widgetId: string, newSettings: WidgetSettings) => {
        setWidgetSettings(prev => {
            const updated = { ...prev, [widgetId]: newSettings };
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const handleLocationChange = (location: string) => {
        setWeatherLocation(location);
        localStorage.setItem(WEATHER_STORAGE_KEY, location);
    };

    const getWidgetProps = (id: string) => ({
        settings: widgetSettings[id] || DEFAULT_WIDGET_SETTINGS,
        onSettingsChange: (s: WidgetSettings) => handleSettingsChange(id, s),
    });

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
                <Widget key="stats" title="Quick Stats" {...getWidgetProps('stats')}>
                    <QuickStatsWidget />
                </Widget>
                <Widget key="heystack_projects" title="My Projects" {...getWidgetProps('heystack_projects')}>
                    <HeystackProjectsWidget />
                </Widget>
                <Widget key="applications" title="Applications" {...getWidgetProps('applications')}>
                    <ApplicationsWidget />
                </Widget>

                {/* Original Widgets */}
                <Widget
                    key="weather"
                    title="Weather"
                    {...getWidgetProps('weather')}
                    customSettings={
                        <div className="p-2">
                            <label className="text-xs font-medium mb-1 block">Location</label>
                            <Input
                                value={weatherLocation}
                                onChange={(e) => handleLocationChange(e.target.value)}
                                className="h-8 text-xs"
                            />
                        </div>
                    }
                >
                    <WeatherWidget location={weatherLocation} />
                </Widget>
                <Widget key="music" title="Music Player" {...getWidgetProps('music')}>
                    <MusicPlayerWidget />
                </Widget>
                <Widget key="projects" title="Project Status" {...getWidgetProps('projects')}>
                    <ProjectStatusWidget />
                </Widget>

                <Widget key="calendar" title="Calendar" {...getWidgetProps('calendar')}>
                    <CalendarWidget events={events} onAddEvent={handleAddEvent} />
                </Widget>

                <Widget key="todo" title="Upcoming Events" {...getWidgetProps('todo')}>
                    <TodoListWidget events={events} />
                </Widget>

                <Widget
                    key="welcome"
                    title="Welcome"
                    {...getWidgetProps('welcome')}
                >
                    <WelcomeWidget name={user.name} />
                </Widget>

            </ResponsiveGridLayout>
        </div>
    );
};

export default Dashboard;
