import '@repo/a11y-date-input';
import React, { useEffect, useRef } from 'react';

export interface DateRangeInputProps {
    startDate?: Date;
    endDate?: Date;
    minYear?: number;
    maxYear?: number;
    defaultYear?: number;
    locale?: string;
    onRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
    startDate,
    endDate,
    minYear,
    maxYear,
    defaultYear,
    locale,
    onRangeChange,
    className,
    style,
}) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleRangeChange = (e: Event) => {
            const customEvent = e as CustomEvent<{
                startDate: Date | null;
                endDate: Date | null;
            }>;
            onRangeChange?.(customEvent.detail.startDate, customEvent.detail.endDate);
        };

        element.addEventListener('range-change', handleRangeChange);

        return () => {
            element.removeEventListener('range-change', handleRangeChange);
        };
    }, [onRangeChange]);

    // Update values when they change externally
    useEffect(() => {
        if (ref.current) {
            if (startDate !== undefined) {
                (ref.current as any).startDate = startDate;
            }
            if (endDate !== undefined) {
                (ref.current as any).endDate = endDate;
            }
        }
    }, [startDate, endDate]);

    return React.createElement('date-range-input', {
        ref,
        'start-date': startDate,
        'end-date': endDate,
        'min-year': minYear,
        'max-year': maxYear,
        'default-year': defaultYear,
        locale,
        class: className,
        style,
    });
};
