import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateInputComponent, DateRangeInputComponent } from '@repo/angular-a11y-date-input';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, DateInputComponent, DateRangeInputComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Date Picker - Angular Demo';
    selectedDate?: Date;
    selectedDateWithTime?: Date;
    rangeStart?: Date;
    rangeEnd?: Date;

    onDateChange(date: Date | null) {
        this.selectedDate = date ?? undefined;
    }

    onDateWithTimeChange(date: Date | null) {
        this.selectedDateWithTime = date ?? undefined;
    }

    onRangeChange(range: { startDate: Date | null; endDate: Date | null }) {
        this.rangeStart = range.startDate ?? undefined;
        this.rangeEnd = range.endDate ?? undefined;
    }
}
