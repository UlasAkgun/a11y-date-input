# Natural Date Picker - Usage Guide

A lightweight, accessible, framework-agnostic date picker using only native HTML controls.

## Features

### V1 Features (Core)
- ✅ Pick date (1-31 select), month (select from 12 month names), year (number input)
- ✅ Constrain by day of the week (checkbox group)
  - None checked by default
  - Available dates dynamically decrease as constraints are checked
  - Automatic date adjustment with live region announcement
- ✅ Internationalization support via `locale` property

### V2 Features
- ✅ Time picker (hh:mm) option via `showTime` property

### V3 Features
- ✅ Range mode via separate `<date-range-input>` component

## Installation

The date picker is built as Web Components and works with all major frameworks.

```bash
npm install @repo/a11y-date-input
```

## Basic Usage

### Vanilla JavaScript/HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@repo/a11y-date-input';
  </script>
</head>
<body>
  <date-input id="myDateInput"></date-input>

  <script type="module">
    const picker = document.getElementById('myDateInput');

    // Listen for date changes
    picker.addEventListener('date-change', (e) => {
      console.log('Selected date:', e.detail.date);
    });

    // Set initial value
    picker.value = new Date(2025, 0, 15); // January 15, 2025
  </script>
</body>
</html>
```

### React

```tsx
import { useRef, useEffect } from 'react';
import '@repo/a11y-date-input';

function MyComponent() {
  const DateInputRef = useRef<any>(null);

  useEffect(() => {
    const picker = DateInputRef.current;

    const handleChange = (e: CustomEvent) => {
      console.log('Selected date:', e.detail.date);
    };

    picker?.addEventListener('date-change', handleChange);

    return () => {
      picker?.removeEventListener('date-change', handleChange);
    };
  }, []);

  return (
    <date-input
      ref={DateInputRef}
      locale="en-US"
      minYear={1900}
      maxYear={2100}
    />
  );
}
```

### Vue

```vue
<template>
  <date-input
    ref="DateInput"
    :locale="locale"
    :min-year="1900"
    :max-year="2100"
    @date-change="handleDateChange"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@repo/a11y-date-input';

const locale = ref('en-US');

const handleDateChange = (e) => {
  console.log('Selected date:', e.detail.date);
};
</script>
```

### Svelte

```svelte
<script>
  import '@repo/a11y-date-input';

  let DateInput;

  function handleDateChange(e) {
    console.log('Selected date:', e.detail.date);
  }
</script>

<date-input
  bind:this={DateInput}
  locale="en-US"
  minYear={1900}
  maxYear={2100}
  on:date-change={handleDateChange}
/>
```

## API Reference

### `<date-input>`

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `Date` | `undefined` | The selected date value |
| `placeholder` | `string` | `'Select a date'` | Placeholder text (currently unused in native controls) |
| `minYear` | `number` | `1900` | Minimum year allowed |
| `maxYear` | `number` | `2100` | Maximum year allowed |
| `defaultYear` | `number` | Current year | Default year when no date is selected |
| `locale` | `string` | `'en-US'` | Locale for internationalization (e.g., 'en-US', 'fr-FR', 'de-DE') |
| `showTime` | `boolean` | `false` | Whether to show time picker (V2 feature) |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `date-change` | `{ date: Date \| null }` | Fired when the selected date changes |

#### Methods

None - Component is controlled via properties and events.

## Advanced Usage

### Internationalization

```javascript
// French locale
const picker = document.querySelector('date-input');
picker.locale = 'fr-FR'; // Months will display as "janvier", "février", etc.

// German locale
picker.locale = 'de-DE'; // Months will display as "Januar", "Februar", etc.

// Japanese locale
picker.locale = 'ja-JP'; // Months will display in Japanese
```

### Day of Week Constraints

The day constraints are automatically rendered and allow users to filter dates by day of the week:

```javascript
const picker = document.querySelector('date-input');

// The constraints are managed automatically via the UI
// When users check "Monday" and "Wednesday", only those days become available
// If the currently selected date is not a Monday or Wednesday,
// it automatically adjusts to the closest available date
```

### Time Picker (V2)

```html
<date-input show-time></date-input>

<script type="module">
  const picker = document.querySelector('date-input');

  picker.addEventListener('date-change', (e) => {
    // e.detail.date now includes time information
    console.log('Selected date and time:', e.detail.date);
  });
</script>
```

### Date Range Picker (V3)

```html
<date-range-input id="rangePicker"></date-range-input>

<script type="module">
  const rangePicker = document.getElementById('rangePicker');

  rangePicker.addEventListener('range-change', (e) => {
    console.log('Start date:', e.detail.startDate);
    console.log('End date:', e.detail.endDate);
  });

  // Set initial range
  rangePicker.startDate = new Date(2025, 0, 1);
  rangePicker.endDate = new Date(2025, 0, 31);
</script>
```

## Sub-components

The date picker is composed of several sub-components that can be used independently:

### `<date-inputs>`

The core day/month/year selector controls.

```html
<date-inputs
  day="15"
  month="0"
  year="2025"
  locale="en-US"
  min-year="1900"
  max-year="2100"
></date-inputs>
```

### `<time-picker>`

The hour/minute time selector (V2).

```html
<time-picker hour="14" minute="30"></time-picker>
```

### `<day-constraints>`

The day of week constraint checkboxes.

```html
<day-constraints locale="en-US"></day-constraints>
```

## Accessibility Features

- ✅ Semantic HTML with proper labels
- ✅ ARIA labels on all inputs
- ✅ Live region announcements when date changes due to constraints
- ✅ Keyboard accessible (native HTML controls)
- ✅ Screen reader friendly

## Styling

Use CSS Shadow Parts for styling:

```css
date-input::part(date-input) {
  /* Style the main container */
}

date-input::part(date-inputs) {
  /* Style the date inputs container */
}

time-picker::part(time-picker) {
  /* Style the time picker */
}

day-constraints::part(day-constraints) {
  /* Style the day constraints */
}
```

Or use regular CSS to style the components:

```css
date-input {
  display: block;
  padding: 1rem;
}

date-input label {
  display: block;
  margin-bottom: 0.5rem;
}

date-input select,
date-input input {
  padding: 0.5rem;
  font-size: 1rem;
}
```

## Browser Support

Works in all modern browsers that support:
- Web Components
- ES2020
- Native HTML form controls

## Dependencies

- `lit` (^3.2.1) - For Web Components
- `date-fns` (^4.1.0) - For lightweight date utilities

## License

See project LICENSE file.
