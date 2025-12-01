import '@repo/a11y-date-input';
import { createEffect, JSX, onCleanup, splitProps } from 'solid-js';

export interface DateInputProps {
    value?: Date;
    placeholder?: string;
    minYear?: number;
    maxYear?: number;
    defaultYear?: number;
    locale?: string;
    showTime?: boolean;
    onDateChange?: (date: Date | null) => void;
    class?: string;
    style?: JSX.CSSProperties;
}

export function DateInput(props: DateInputProps) {
    const [local, others] = splitProps(props, [
        'value',
        'placeholder',
        'minYear',
        'maxYear',
        'defaultYear',
        'locale',
        'showTime',
        'onDateChange',
        'class',
        'style',
    ]);

    let ref: HTMLElement | undefined;

    createEffect(() => {
        if (!ref) return;

        const handleDateChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ date: Date | null }>;
            local.onDateChange?.(customEvent.detail.date);
        };

        ref.addEventListener('date-change', handleDateChange);

        onCleanup(() => {
            ref?.removeEventListener('date-change', handleDateChange);
        });
    });

    // Update value when it changes externally
    createEffect(() => {
        if (ref && local.value !== undefined) {
            (ref as any).value = local.value;
        }
    });

    return (
        <date-input
            ref={ref}
            value={local.value}
            placeholder={local.placeholder}
            min-year={local.minYear}
            max-year={local.maxYear}
            default-year={local.defaultYear}
            locale={local.locale}
            show-time={local.showTime}
            class={local.class}
            style={local.style}
            {...others}
        />
    );
}
