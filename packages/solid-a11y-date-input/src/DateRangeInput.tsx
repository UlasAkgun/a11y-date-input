import '@repo/a11y-date-input';
import { createEffect, JSX, onCleanup, splitProps } from 'solid-js';

export interface DateRangeInputProps {
    startDate?: Date;
    endDate?: Date;
    minYear?: number;
    maxYear?: number;
    defaultYear?: number;
    locale?: string;
    onRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
    class?: string;
    style?: JSX.CSSProperties;
}

export function DateRangeInput(props: DateRangeInputProps) {
    const [local, others] = splitProps(props, [
        'startDate',
        'endDate',
        'minYear',
        'maxYear',
        'defaultYear',
        'locale',
        'onRangeChange',
        'class',
        'style',
    ]);

    let ref: HTMLElement | undefined;

    createEffect(() => {
        if (!ref) return;

        const handleRangeChange = (e: Event) => {
            const customEvent = e as CustomEvent<{
                startDate: Date | null;
                endDate: Date | null;
            }>;
            local.onRangeChange?.(customEvent.detail.startDate, customEvent.detail.endDate);
        };

        ref.addEventListener('range-change', handleRangeChange);

        onCleanup(() => {
            ref?.removeEventListener('range-change', handleRangeChange);
        });
    });

    // Update values when they change externally
    createEffect(() => {
        if (ref) {
            if (local.startDate !== undefined) {
                (ref as any).startDate = local.startDate;
            }
            if (local.endDate !== undefined) {
                (ref as any).endDate = local.endDate;
            }
        }
    });

    return (
        <date-range-input
            ref={ref}
            start-date={local.startDate}
            end-date={local.endDate}
            min-year={local.minYear}
            max-year={local.maxYear}
            default-year={local.defaultYear}
            locale={local.locale}
            class={local.class}
            style={local.style}
            {...others}
        />
    );
}
