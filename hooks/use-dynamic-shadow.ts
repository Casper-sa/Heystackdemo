import { useState, useEffect, RefObject } from 'react';
import { useColorScheme } from '@/components/color-scheme-provider';

interface DynamicShadowOptions {
    type?: 'box' | 'text';
    opacity?: number;
    blur?: number;
}

export function useDynamicShadow(ref: RefObject<HTMLElement>, options: DynamicShadowOptions = { type: 'box' }) {
    const { gradientOriginX, gradientOriginY } = useColorScheme();
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

            const distance = Math.sqrt(dx * dx + dy * dy);

            // Scale factor: 0 at origin, increasing as we move away.
            // Cap at 15px
            const shadowLength = Math.min(distance / 50, 15);

            // Normalize direction
            const angle = Math.atan2(dy, dx);
            const shadowX = Math.cos(angle) * shadowLength;
            const shadowY = Math.sin(angle) * shadowLength;

            const opacity = options.opacity ?? (options.type === 'text' ? 0.2 : 0.1);
            const blur = options.blur ?? (options.type === 'text' ? 10 : 20);

            if (options.type === 'text') {
                setShadowStyle({
                    textShadow: `${shadowX}px ${shadowY}px ${blur}px rgba(0,0,0,${opacity})`
                });
            } else {
                setShadowStyle({
                    boxShadow: `${shadowX}px ${shadowY}px ${blur}px rgba(0,0,0,${opacity})`
                });
            }
        };

        updateShadow();
        window.addEventListener('resize', updateShadow);
        window.addEventListener('scroll', updateShadow);

        return () => {
            window.removeEventListener('resize', updateShadow);
            window.removeEventListener('scroll', updateShadow);
        };
    }, [gradientOriginX, gradientOriginY, ref, options.type, options.opacity, options.blur]);

    return shadowStyle;
}
