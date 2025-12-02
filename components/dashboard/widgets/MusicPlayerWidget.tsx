'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, LogIn, LogOut } from 'lucide-react';
import { redirectToAuthCodeFlow, getAccessToken, fetchCurrentlyPlaying, play, pause, next, previous } from '@/lib/spotify';

interface Track {
    title: string;
    artist: string;
    image: string;
    progress: number;
    duration: number;
}

const MusicPlayerWidget = () => {
    const [token, setToken] = useState<string | null>(null);
    const [track, setTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Handle Auth Code on Mount
    const codeProcessed = useRef(false);

    useEffect(() => {
        // 1. Check for existing token
        const storedToken = localStorage.getItem("spotify_access_token");
        if (storedToken) {
            setToken(storedToken);
            return;
        }

        // 2. Check for auth code
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code && !codeProcessed.current) {
            codeProcessed.current = true; // Prevent double-fire in StrictMode
            getAccessToken(code).then(accessToken => {
                if (accessToken) {
                    localStorage.setItem("spotify_access_token", accessToken);
                    setToken(accessToken);
                    window.history.replaceState({}, document.title, "/dashboard"); // Clean URL
                }
            }).catch(err => {
                console.error("Token exchange failed:", err);
                codeProcessed.current = false; // Allow retry if it failed
            });
        }
    }, []);

    // Poll for Track Data
    useEffect(() => {
        if (!token) return;

        const fetchTrack = async () => {
            const data = await fetchCurrentlyPlaying(token);
            if (data && data.item) {
                setTrack({
                    title: data.item.name,
                    artist: data.item.artists.map((a: any) => a.name).join(', '),
                    image: data.item.album.images[0]?.url,
                    progress: data.progress_ms,
                    duration: data.item.duration_ms
                });
                setIsPlaying(data.is_playing);
            } else {
                setTrack(null); // Not playing anything
                setIsPlaying(false);
            }
        };

        fetchTrack();
        const interval = setInterval(fetchTrack, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, [token]);

    const handlePlayPause = async () => {
        if (!token) return;
        if (isPlaying) {
            await pause(token);
            setIsPlaying(false);
        } else {
            await play(token);
            setIsPlaying(true);
        }
    };

    const handleNext = async () => {
        if (!token) return;
        await next(token);
    };

    const handlePrev = async () => {
        if (!token) return;
        await previous(token);
    };

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        setToken(null);
    };

    if (!token) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                <Music size={32} className="text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-3">Connect to see what's playing</p>
                <button
                    onClick={redirectToAuthCodeFlow}
                    className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                >
                    <LogIn size={16} />
                    Connect Spotify
                </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-between p-2 relative">
            <button
                onClick={handleLogout}
                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground bg-card rounded-full shadow-sm z-10"
                title="Disconnect Spotify"
            >
                <LogOut size={12} />
            </button>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-background rounded-[var(--radius)] overflow-hidden flex items-center justify-center relative">
                    {track?.image ? (
                        <img src={track.image} alt="Album Art" className="w-full h-full object-cover" />
                    ) : (
                        <Music size={20} className="text-primary" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="text-foreground text-sm font-medium truncate">
                        {track ? track.title : "Not Playing"}
                    </h4>
                    <p className="text-muted-foreground text-xs truncate">
                        {track ? track.artist : "Spotify Connected"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: track ? `${(track.progress / track.duration) * 100}%` : '0%' }}
                    ></div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button onClick={handlePrev} className="text-muted-foreground hover:text-foreground transition-colors">
                        <SkipBack size={18} />
                    </button>
                    <button
                        onClick={handlePlayPause}
                        className="w-8 h-8 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground transition-colors"
                    >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                    </button>
                    <button onClick={handleNext} className="text-muted-foreground hover:text-foreground transition-colors">
                        <SkipForward size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayerWidget;
