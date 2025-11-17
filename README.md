# Natural Date Picker

A monorepo for cross-framework date picker components built with Lit web components and framework-specific wrappers.

## Structure

```
.
├── apps/                          # Demo applications
│   ├── react/                     # React demo (Vite, port 3000)
│   ├── angular/                   # Angular demo (port 4200)
│   ├── solid/                     # Solid demo (Vite, port 3001)
│   └── svelte/                    # Svelte demo (Vite, port 5173)
├── packages/
│   ├── a11y-date-input/             # Base Lit web components
│   ├── react-a11y-date-input/         # React wrapper
│   ├── angular-a11y-date-input/       # Angular wrapper
│   ├── solid-a11y-date-input/         # Solid wrapper
│   └── svelte-a11y-date-input/        # Svelte wrapper
```

## Quick Start

**Prerequisites:** Node.js >= 18, pnpm

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all demos
pnpm dev

# Run specific demo
pnpm dev:react    # port 3000
pnpm dev:angular  # port 4200
pnpm dev:solid    # port 3001
pnpm dev:svelte   # port 5173
```

## Usage

### React

```tsx
import { DateInput } from '@repo/react-a11y-date-input';
import { useState } from 'react';

function App() {
    const [date, setDate] = useState<Date | null>(null);

    return <DateInput value={date} onDateChange={setDate} locale="en-US" showTime={true} />;
}
```

### Angular

```typescript
import { DateInputComponent } from '@repo/angular-a11y-date-input';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [DateInputComponent],
    template: ` <lib-date-input [value]="selectedDate" [locale]="'en-US'" [showTime]="true" (dateChange)="onDateChange($event)"></lib-date-input> `,
})
export class AppComponent {
    selectedDate?: Date;
    onDateChange(date: Date | null) {
        this.selectedDate = date ?? undefined;
    }
}
```

### Svelte

```svelte
<script lang="ts">
  import { DateInput } from '@repo/svelte-a11y-date-input';
  let selectedDate: Date | null = null;
</script>

<DateInput
  value={selectedDate}
  onDateChange={(date) => selectedDate = date}
  locale="en-US"
  showTime={true}
/>
```

### Solid

```tsx
import { DateInput } from '@repo/solid-a11y-date-input';
import { createSignal } from 'solid-js';

function App() {
    const [date, setDate] = createSignal<Date | null>(null);

    return <DateInput value={date()} onDateChange={setDate} locale="en-US" showTime={true} />;
}
```

## API

### DateInput Props

| Prop           | Type                           | Default           | Description            |
| -------------- | ------------------------------ | ----------------- | ---------------------- |
| `value`        | `Date \| undefined`            | `undefined`       | Selected date          |
| `placeholder`  | `string`                       | `'Select a date'` | Placeholder text       |
| `minYear`      | `number`                       | `1900`            | Minimum year           |
| `maxYear`      | `number`                       | `2100`            | Maximum year           |
| `defaultYear`  | `number`                       | Current year      | Default year           |
| `locale`       | `string`                       | `'en-US'`         | Date formatting locale |
| `showTime`     | `boolean`                      | `false`           | Show time picker       |
| `onDateChange` | `(date: Date \| null) => void` | -                 | Date change callback   |

### DateRangeInput Props

| Prop            | Type                                               | Default      | Description            |
| --------------- | -------------------------------------------------- | ------------ | ---------------------- |
| `startDate`     | `Date \| undefined`                                | `undefined`  | Range start date       |
| `endDate`       | `Date \| undefined`                                | `undefined`  | Range end date         |
| `minYear`       | `number`                                           | `1900`       | Minimum year           |
| `maxYear`       | `number`                                           | `2100`       | Maximum year           |
| `defaultYear`   | `number`                                           | Current year | Default year           |
| `locale`        | `string`                                           | `'en-US'`    | Date formatting locale |
| `onRangeChange` | `(start: Date \| null, end: Date \| null) => void` | -            | Range change callback  |

## Publishing

```bash
# Update versions in package.json files
# Remove "private": true from packages
# Update package names to your scope

pnpm build
cd packages/react-a11y-date-input && npm publish
cd packages/angular-a11y-date-input && npm publish
cd packages/solid-a11y-date-input && npm publish
cd packages/svelte-a11y-date-input && npm publish
```

Or use [Changesets](https://github.com/changesets/changesets):

```bash
pnpm add -D @changesets/cli
pnpm changeset init
pnpm changeset        # Create changeset
pnpm changeset version
pnpm changeset publish
```

## Tech Stack

- **Lit** - Base web components
- **pnpm** - Fast package manager with workspace support
- **Turbo** - Monorepo build system
- **TypeScript** - Full type safety
- **Vite** - Dev server for React, Solid, Svelte
- **Angular CLI** - Angular tooling
