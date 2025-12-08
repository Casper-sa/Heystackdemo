'use client';

import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Loader2, AlertCircle } from 'lucide-react';

interface WeatherWidgetProps {
    location?: string;
}

interface WeatherData {
    temp: number;
    humidity: number;
    windSpeed: number;
    code: number;
    isDay: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location = 'London, UK' }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!location) return;

            setLoading(true);
            setError(null);

            try {
                // 1. Geocoding
                // Try exact search first
                let geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
                let geoData = await geoRes.json();

                // If not found, try splitting by comma (e.g. "London, UK" -> "London")
                if ((!geoData.results || geoData.results.length === 0) && location.includes(',')) {
                    const cityOnly = location.split(',')[0].trim();
                    geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityOnly)}&count=1&language=en&format=json`);
                    geoData = await geoRes.json();
                }

                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error(`Location "${location}" not found`);
                }

                const { latitude, longitude } = geoData.results[0];

                // 2. Weather Data
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day`);
                const weatherData = await weatherRes.json();

                if (weatherData.error) {
                    throw new Error('Failed to fetch weather data');
                }

                setWeather({
                    temp: Math.round(weatherData.current.temperature_2m),
                    humidity: weatherData.current.relative_humidity_2m,
                    windSpeed: Math.round(weatherData.current.wind_speed_10m),
                    code: weatherData.current.weather_code,
                    isDay: weatherData.current.is_day
                });

            } catch (err) {
                console.error("Weather Widget Error:", err);
                setError(err instanceof Error ? err.message : 'Error loading weather');
            } finally {
                setLoading(false);
            }
        };

        // Debounce slightly to avoid rapid API calls while typing
        const timer = setTimeout(() => {
            fetchWeather();
        }, 1000);

        return () => clearTimeout(timer);
    }, [location]);

    // Helper to get icon and description based on WMO code
    const getWeatherInfo = (code: number, isDay: number) => {
        // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
        if (code === 0) return { icon: Sun, label: 'Clear Sky' };
        if (code >= 1 && code <= 3) return { icon: isDay ? CloudSun : Cloud, label: 'Partly Cloudy' };
        if (code >= 45 && code <= 48) return { icon: Cloud, label: 'Foggy' };
        if (code >= 51 && code <= 67) return { icon: CloudRain, label: 'Rain' };
        if (code >= 71 && code <= 77) return { icon: CloudSnow, label: 'Snow' };
        if (code >= 80 && code <= 82) return { icon: CloudRain, label: 'Showers' };
        if (code >= 85 && code <= 86) return { icon: CloudSnow, label: 'Snow Showers' };
        if (code >= 95 && code <= 99) return { icon: CloudLightning, label: 'Thunderstorm' };

        return { icon: Cloud, label: 'Cloudy' };
    };

    if (loading && !weather) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin mb-2" />
                <span className="text-xs">Loading weather...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-2 text-center">
                <AlertCircle className="h-6 w-6 mb-2 text-destructive/50" />
                <span className="text-xs">{error}</span>
            </div>
        );
    }

    if (!weather) return null;

    const { icon: WeatherIcon, label } = getWeatherInfo(weather.code, weather.isDay);

    return (
        <div className="h-full flex flex-col @md:flex-row @md:items-center justify-between p-2 gap-4">
            <div className="flex-1 flex flex-col justify-between h-full @md:justify-center @md:gap-2">
                <div className="flex justify-between items-start @md:flex-col-reverse @md:gap-2">
                    <div>
                        <h4 className="text-muted-foreground text-sm font-medium truncate max-w-[100px]" title={location}>{location}</h4>
                        <p className="text-foreground text-xs mt-1">{label}</p>
                    </div>
                    <WeatherIcon size={32} className="text-primary @md:self-start @md:mb-2" />
                </div>

                <div className="flex items-end gap-2 mt-2 @md:mt-0">
                    <span className="text-4xl font-bold text-foreground">{weather.temp}°</span>
                    <span className="text-muted-foreground mb-1">C</span>
                </div>
            </div>

            <div className="grid grid-cols-2 @md:grid-cols-1 gap-2 mt-4 @md:mt-0 @md:w-1/3">
                <div className="bg-background/30 rounded-[var(--radius)] p-2 flex items-center gap-2">
                    <Wind size={14} className="text-muted-foreground" />
                    <span className="text-xs text-foreground">{weather.windSpeed} km/h</span>
                </div>
                <div className="bg-background/30 rounded-[var(--radius)] p-2 flex items-center gap-2">
                    <Droplets size={14} className="text-muted-foreground" />
                    <span className="text-xs text-foreground">{weather.humidity}%</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
