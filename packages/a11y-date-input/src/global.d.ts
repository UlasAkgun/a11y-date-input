import type { DateInput } from './components/DateInput/DateInput';
import type { DateRangeInput } from './components/DateRangeInput/DateRangeInput';

declare global {
    interface HTMLElementTagNameMap {
        'date-input': DateInput;
        'date-range-input': DateRangeInput;
    }

    namespace JSX {
        interface IntrinsicElements {
            'date-input': React.DetailedHTMLProps<
                React.HTMLAttributes<DateInput> & {
                    value?: Date;
                    placeholder?: string;
                    minYear?: number;
                    maxYear?: number;
                    defaultYear?: number;
                    locale?: string;
                    showTime?: boolean;
                    ref?: React.Ref<DateInput>;
                },
                DateInput
            >;
            'date-range-input': React.DetailedHTMLProps<
                React.HTMLAttributes<DateRangeInput> & {
                    startDate?: Date;
                    endDate?: Date;
                    locale?: string;
                    minYear?: number;
                    maxYear?: number;
                    ref?: React.Ref<DateRangeInput>;
                },
                DateRangeInput
            >;
        }
    }
}
