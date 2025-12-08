'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { GripHorizontal } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useColorScheme } from '../color-scheme-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export interface WidgetSettings {
    padding: string; // 'p-2', 'p-4', 'p-6'
    fontSize: string; // 'text-sm', 'text-base', 'text-lg'
    fontFamily: string; // 'font-sans', 'font-serif', 'font-mono'
}

export const DEFAULT_WIDGET_SETTINGS: WidgetSettings = {
    padding: 'p-4',
    fontSize: 'text-sm',
    fontFamily: 'font-sans',
};

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    settings?: WidgetSettings;
    onSettingsChange?: (settings: WidgetSettings) => void;
    customSettings?: React.ReactNode;
}

const Widget = forwardRef<HTMLDivElement, WidgetProps>(({
    children,
    style,
    className,
    title,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    settings = DEFAULT_WIDGET_SETTINGS,
    onSettingsChange,
    customSettings,
    ...props
}, forwardedRef) => {
    const { gradientOriginX, gradientOriginY } = useColorScheme();
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;
    const [shadowStyle, setShadowStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const updateShadow = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const widgetCenterX = rect.left + rect.width / 2;
            const widgetCenterY = rect.top + rect.height / 2;

            const originX = window.innerWidth * (gradientOriginX / 100);
            const originY = window.innerHeight * (gradientOriginY / 100);

            const dx = widgetCenterX - originX;
            const dy = widgetCenterY - originY;

            // Calculate distance to scale shadow intensity/length if needed, 
            // but for now just direction is key.
            // Let's make the shadow offset proportional to the distance but capped or scaled down.
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);

            // Scale factor: 0 at origin, increasing as we move away.
            // Let's say max shadow offset is 10px.
            const shadowLength = Math.min(distance / 50, 15); // Cap at 15px

            // Normalize direction
            const angle = Math.atan2(dy, dx);
            const shadowX = Math.cos(angle) * shadowLength;
            const shadowY = Math.sin(angle) * shadowLength;

            setShadowStyle({
                boxShadow: `${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.1)`
            });
        };

        updateShadow();
        window.addEventListener('resize', updateShadow);
        // Also update when scrolling if the gradient is fixed but widgets move? 
        // The gradient background is fixed, widgets scroll. 
        // If widgets scroll, their position relative to viewport changes, so shadow should change.
        window.addEventListener('scroll', updateShadow);

        return () => {
            window.removeEventListener('resize', updateShadow);
            window.removeEventListener('scroll', updateShadow);
        };
    }, [gradientOriginX, gradientOriginY]);

    const updateSetting = (key: keyof WidgetSettings, value: string) => {
        if (onSettingsChange) {
            onSettingsChange({ ...settings, [key]: value });
        }
    };

    // Check if dragging (opacity is reduced when dragging)
    const isDragging = style?.opacity && Number(style.opacity) < 1;

    return (
        <div
            ref={ref}
            style={{ ...style, ...shadowStyle }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            className={cn(
                "h-full flex flex-col relative overflow-hidden transition-all duration-300 rounded-xl @container",
                // Light Mode (Cloud Vibe)
                "bg-white/40 backdrop-blur-xl border border-white/20 shadow-sm hover:shadow-md hover:bg-white/50",
                // Dark Mode (Space Vibe)
                "dark:bg-slate-900/20 dark:backdrop-blur-md dark:border-white/10 dark:hover:bg-slate-900/30 dark:hover:border-white/20",
                // Brand glow
                "hover:border-primary/30",
                isDragging ? "opacity-50 scale-95 ring-2 ring-primary" : "",
                className
            )}
            {...props}
        >
            <div className="drag-handle relative p-3 border-b border-border/10 flex items-center cursor-grab active:cursor-grabbing bg-muted/20">
                <div className="w-full flex items-center" style={{ justifyContent: 'var(--widget-title-justify)' }}>
                    <h3 className="font-bold text-sm text-foreground select-none">{title}</h3>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="hover:text-foreground transition-colors cursor-pointer"
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <GripHorizontal size={16} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Widget Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {customSettings && (
                                <>
                                    {customSettings}
                                    <DropdownMenuSeparator />
                                </>
                            )}

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Padding</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuRadioGroup value={settings.padding} onValueChange={(v) => updateSetting('padding', v)}>
                                            <DropdownMenuRadioItem value="p-2">Compact</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="p-4">Normal</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="p-6">Spacious</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Font Size</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuRadioGroup value={settings.fontSize} onValueChange={(v) => updateSetting('fontSize', v)}>
                                            <DropdownMenuRadioItem value="text-xs">Small</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="text-sm">Medium</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="text-base">Large</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Font Family</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuRadioGroup value={settings.fontFamily} onValueChange={(v) => updateSetting('fontFamily', v)}>
                                            <DropdownMenuRadioItem value="font-sans">Sans</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="font-serif">Serif</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="font-mono">Mono</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className={`flex-1 overflow-auto custom-scrollbar ${settings.padding} ${settings.fontSize} ${settings.fontFamily}`}>
                {children}
            </div>
        </div >
    );
});

Widget.displayName = 'Widget';

export default Widget;
