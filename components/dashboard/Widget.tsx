'use client';

import React, { forwardRef } from 'react';
import { GripHorizontal } from 'lucide-react';

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

const Widget = forwardRef<HTMLDivElement, WidgetProps>(({ children, style, className, title, onMouseDown, onMouseUp, onTouchEnd, ...props }, ref) => {
    return (
        <div
            ref={ref}
            style={style}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            className={`
        bg-card 
        rounded-[var(--radius)] 
        border border-border 
        shadow-lg 
        overflow-hidden 
        flex flex-col
        hover:border-primary
        transition-colors
        duration-200
        ${className || ''}
      `}
            {...props}
        >
            <div className="drag-handle relative p-3 border-b border-border flex items-center cursor-grab active:cursor-grabbing bg-background/50">
                <div className="w-full flex items-center" style={{ justifyContent: 'var(--widget-title-justify)' }}>
                    <h3 className="font-bold text-sm text-foreground select-none">{title}</h3>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <GripHorizontal size={16} />
                </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
                {children}
            </div>
        </div>
    );
});

Widget.displayName = 'Widget';

export default Widget;
