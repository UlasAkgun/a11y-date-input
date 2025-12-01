# @repo/angular-a11y-date-input

Angular wrapper components for the natural date picker web components.

## Installation

```bash
pnpm add @repo/angular-a11y-date-input
```

## Usage

### DateInput

```typescript
import { Component } from '@angular/core';
import { DateInputComponent } from '@repo/angular-a11y-date-input';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [DateInputComponent],
    template: `
        <lib-date-input
            [value]="selectedDate"
            [locale]="'en-US'"
            [showTime]="true"
            [minYear]="1900"
            [maxYear]="2100"
            (dateChange)="onDateChange($event)"
        ></lib-date-input>
    `,
})
export class AppComponent {
    selectedDate?: Date;

    onDateChange(date: Date | null) {
        this.selectedDate = date ?? undefined;
        console.log('Selected date:', date);
    }
}
```

### DateRangeInput

```typescript
import { Component } from '@angular/core';
import { DateRangeInputComponent, DateRange } from '@repo/angular-a11y-date-input';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [DateRangeInputComponent],
    template: `
        <lib-date-range-input
            [startDate]="startDate"
            [endDate]="endDate"
            [locale]="'en-US'"
            [minYear]="1900"
            [maxYear]="2100"
            (rangeChange)="onRangeChange($event)"
        ></lib-date-range-input>
    `,
})
export class AppComponent {
    startDate?: Date;
    endDate?: Date;

    onRangeChange(range: DateRange) {
        this.startDate = range.startDate ?? undefined;
        this.endDate = range.endDate ?? undefined;
        console.log('Selected range:', range);
    }
}
```

## API

### DateInput Inputs

- `value?: Date` - The selected date
- `placeholder?: string` - Placeholder text
- `minYear?: number` - Minimum year (default: 1900)
- `maxYear?: number` - Maximum year (default: 2100)
- `defaultYear?: number` - Default year when no date is selected
- `locale?: string` - Locale for date formatting (default: 'en-US')
- `showTime?: boolean` - Whether to show time picker (default: false)

### DateInput Outputs

- `dateChange: EventEmitter<Date | null>` - Emits when date changes

### DateRangeInput Inputs

- `startDate?: Date` - The start date of the range
- `endDate?: Date` - The end date of the range
- `minYear?: number` - Minimum year (default: 1900)
- `maxYear?: number` - Maximum year (default: 2100)
- `defaultYear?: number` - Default year when no date is selected
- `locale?: string` - Locale for date formatting (default: 'en-US')

### DateRangeInput Outputs

- `rangeChange: EventEmitter<DateRange>` - Emits when range changes
