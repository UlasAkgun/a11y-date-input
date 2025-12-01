# @repo/svelte-a11y-date-input

Svelte wrapper components for the natural date picker web components.

## Installation

```bash
pnpm add @repo/svelte-a11y-date-input
```

## Usage

### DateInput

```svelte
<script lang="ts">
  import { DateInput } from '@repo/svelte-a11y-date-input';

  let selectedDate: Date | null = null;

  function handleDateChange(date: Date | null) {
    selectedDate = date;
    console.log('Selected date:', date);
  }
</script>

<DateInput
  value={selectedDate}
  onDateChange={handleDateChange}
  locale="en-US"
  showTime={true}
  minYear={1900}
  maxYear={2100}
/>
```

### DateRangeInput

```svelte
<script lang="ts">
  import { DateRangeInput } from '@repo/svelte-a11y-date-input';

  let startDate: Date | null = null;
  let endDate: Date | null = null;

  function handleRangeChange(start: Date | null, end: Date | null) {
    startDate = start;
    endDate = end;
    console.log('Selected range:', { start, end });
  }
</script>

<DateRangeInput
  startDate={startDate}
  endDate={endDate}
  onRangeChange={handleRangeChange}
  locale="en-US"
  minYear={1900}
  maxYear={2100}
/>
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

### DateRangeInput Props

- `startDate?: Date` - The start date of the range
- `endDate?: Date` - The end date of the range
- `minYear?: number` - Minimum year (default: 1900)
- `maxYear?: number` - Maximum year (default: 2100)
- `defaultYear?: number` - Default year when no date is selected
- `locale?: string` - Locale for date formatting (default: 'en-US')
- `onRangeChange?: (startDate: Date | null, endDate: Date | null) => void` - Callback when range changes
