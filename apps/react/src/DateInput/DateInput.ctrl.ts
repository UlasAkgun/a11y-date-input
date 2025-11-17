import { useEffect, useRef, useState } from 'react';

export interface IDateInputCtrlProps {
  onChange?: (newDate: Date) => void;
  value?: Date;
}

export const DateInputCtrl = (props: IDateInputCtrlProps) => {
  const internalRef = useRef<DateInputElement | null>(null);
  const [value, setValue] = useState<Date | undefined>(props.value);

  const handleDateChange = (e: Event) => {
    console.log('date change:', e);
    const customEvent = e as CustomEvent<{ date: Date }>;
    setValue(customEvent.detail.date);
    props.onChange?.(customEvent.detail.date);
  };

  useEffect(() => {
    const element = internalRef.current;
    if (element) {
      element.addEventListener('date-change', handleDateChange);
      return () => {
        element.removeEventListener('date-change', handleDateChange);
      };
    }
  }, [props.onChange]);

  return { internalRef, value };
};
