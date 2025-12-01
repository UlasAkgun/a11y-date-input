import '@repo/a11y-date-input';
import React, { useEffect, useRef } from 'react';

export interface DateInputProps {
    value?: Date;
    placeholder?: string;
    minYear?: number;
    maxYear?: number;
    defaultYear?: number;
    locale?: string;
    showTime?: boolean;
    onDateChange?: (date: Date | null) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const DateInput: React.FC<DateInputProps> = ({
    value,
    placeholder,
    minYear,
    maxYear,
    defaultYear,
    locale,
    showTime,
    onDateChange,
    className,
    style,
}) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleDateChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ date: Date | null }>;
            onDateChange?.(customEvent.detail.date);
        };

        element.addEventListener('date-change', handleDateChange);

        return () => {
            element.removeEventListener('date-change', handleDateChange);
        };
    }, [onDateChange]);

    // Update value when it changes externally
    useEffect(() => {
        if (ref.current && value !== undefined) {
            (ref.current as any).value = value;
        }
    }, [value]);

    console.log('showTime: ', showTime);

    return React.createElement('date-input', {
        ref,
        value,
        placeholder,
        'min-year': minYear,
        'max-year': maxYear,
        'default-year': defaultYear,
        locale,
        'show-time': showTime,
        class: className,
        style,
    });
};
