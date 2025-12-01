# @repo/react-a11y-date-input

React wrapper components for the natural date picker web components.

## Installation

```bash
pnpm add @repo/react-a11y-date-input
```

## Usage

### DateInput

```tsx
import { DateInput } from '@repo/react-a11y-date-input';

function App() {
    const [date, setDate] = useState<Date | null>(null);

    return <DateInput value={date} onDateChange={setDate} locale="en-US" showTime={true} minYear={1900} maxYear={2100} />;
}
```

### DateRangeInput

```tsx
import { DateRangeInput } from '@repo/react-a11y-date-input';

function App() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <DateRangeInput
            startDate={startDate}
            endDate={endDate}
            onRangeChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
            }}
            locale="en-US"
            minYear={1900}
            maxYear={2100}
        />
    );
}
```

## Props

### DateInput Props

- `value?: Date` - The selected date
- `placeholder?: string` - Placeholder text
- `minYear?: number` - Minimum year (default: 1900)
- `maxYear?: number` - Maximum year (default: 2100)
- `defaultYear?: number` - Default year when no date is selected
- `locale?: string` - Locale for date formatting (default: 'en-US')
- `showTime?: boolean` - Whether to show time picker (default: false)
- `onDateChange?: (date: Date | null) => void` - Callback when date changes
- `className?: string` - CSS class name
- `style?: React.CSSProperties` - Inline styles

### DateRangeInput Props

- `startDate?: Date` - The start date of the range
- `endDate?: Date` - The end date of the range
- `minYear?: number` - Minimum year (default: 1900)
- `maxYear?: number` - Maximum year (default: 2100)
- `defaultYear?: number` - Default year when no date is selected
- `locale?: string` - Locale for date formatting (default: 'en-US')
- `onRangeChange?: (startDate: Date | null, endDate: Date | null) => void` - Callback when range changes
- `className?: string` - CSS class name
- `style?: React.CSSProperties` - Inline styles
