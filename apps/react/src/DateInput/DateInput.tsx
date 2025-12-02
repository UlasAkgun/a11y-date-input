import type { DateInput as DateInputElement } from '@repo/a11y-date-input';
import { forwardRef } from 'react';

import { DateInputCtrl, IDateInputCtrlProps } from './DateInput.ctrl';

export interface IDateInputProps extends IDateInputCtrlProps {
    placeholder?: string;
    className?: string;
}

export const DateInput = forwardRef<DateInputElement, IDateInputProps>(
    (props, externalRef) => {
        const ctrl = DateInputCtrl({
            onChange: props.onChange,
            value: props.value,
        });

        return (
            <date-input
                placeholder={props.placeholder}
                value={ctrl.value}
                ref={(e: DateInputElement | null) => {
                    ctrl.internalRef.current = e;

                    if (typeof externalRef === 'function') {
                        externalRef(e);
                    } else if (externalRef) {
                        externalRef.current = e;
                    }
                }}
            ></date-input>
        );
    }
);

DateInput.displayName = 'DateInput';
