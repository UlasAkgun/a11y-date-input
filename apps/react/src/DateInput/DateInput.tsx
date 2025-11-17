import { ComponentProps } from 'react';

import { DateInputCtrl, IDateInputCtrlProps } from './DateInput.ctrl';

export interface IDateInputProps
  extends IDateInputCtrlProps,
    Omit<ComponentProps<'date-input'>, 'onChange'> {
  placeholder?: string;
}

export const DateInput = ({
  ref: externalRef,
  ...props
}: IDateInputProps) => {
  const ctrl = DateInputCtrl({
    onChange: props.onChange,
    value: props.value,
  });

  return (
    <date-input
      placeholder={props.placeholder}
      value={ctrl.value}
      ref={(e) => {
        ctrl.internalRef.current = e;

        if (typeof externalRef === 'function') {
          externalRef(e);
        } else if (externalRef) {
          (externalRef as React.MutableRefObject<HTMLElement | null>).current =
            e;
        }
      }}
    ></date-input>
  );
};

DateInput.displayName = 'DateInput';
