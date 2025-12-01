import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

@Component({
    selector: 'lib-date-range-input',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `
        <date-range-input
            #dateRangeInput
            [attr.start-date]="startDate"
            [attr.end-date]="endDate"
            [attr.min-year]="minYear"
            [attr.max-year]="maxYear"
            [attr.default-year]="defaultYear"
            [attr.locale]="locale"
        ></date-range-input>
    `,
})
export class DateRangeInputComponent implements OnInit, OnDestroy {
    @ViewChild('dateRangeInput', { static: true })
    dateRangeInput!: ElementRef<HTMLElement>;

    @Input() startDate?: Date;
    @Input() endDate?: Date;
    @Input() minYear?: number = 1900;
    @Input() maxYear?: number = 2100;
    @Input() defaultYear?: number;
    @Input() locale?: string = 'en-US';

    @Output() rangeChange = new EventEmitter<DateRange>();

    private listener?: (event: Event) => void;

    ngOnInit() {
        this.listener = (event: Event) => {
            const customEvent = event as CustomEvent<{
                startDate: Date | null;
                endDate: Date | null;
            }>;
            this.rangeChange.emit({
                startDate: customEvent.detail.startDate,
                endDate: customEvent.detail.endDate,
            });
        };

        this.dateRangeInput.nativeElement.addEventListener('range-change', this.listener);
    }

    ngOnDestroy() {
        if (this.listener) {
            this.dateRangeInput.nativeElement.removeEventListener('range-change', this.listener);
        }
    }
}
