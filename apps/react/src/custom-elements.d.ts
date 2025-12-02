import type { DateInput } from '@repo/a11y-date-input';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'date-input': React.DetailedHTMLProps<
                React.HTMLAttributes<DateInput> & {
                    placeholder?: string;
                    value?: Date;
                    'min-year'?: number;
                    'max-year'?: number;
                    'default-year'?: number;
                    locale?: string;
                    'show-time'?: boolean;
                    ref?: React.Ref<DateInput>;
                },
                DateInput
            >;
        }
    }
}

export {};
