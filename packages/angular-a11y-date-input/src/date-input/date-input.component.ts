import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'lib-date-input',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './date-input.component.html',
})
export class DateInputComponent implements OnInit, OnDestroy {
    @ViewChild('DateInput', { static: true })
    DateInput!: ElementRef<HTMLElement>;

    @Input() value?: Date;
    @Input() placeholder?: string;
    @Input() minYear?: number = 1900;
    @Input() maxYear?: number = 2100;
    @Input() defaultYear?: number;
    @Input() locale?: string = 'en-US';
    @Input() showTime?: boolean = false;

    @Output() dateChange = new EventEmitter<Date | null>();

    private listener?: (event: Event) => void;

    ngOnInit() {
        this.listener = (event: Event) => {
            const customEvent = event as CustomEvent<{ date: Date | null }>;
            this.dateChange.emit(customEvent.detail.date);
        };

        this.DateInput.nativeElement.addEventListener('date-change', this.listener);
    }

    ngOnDestroy() {
        if (this.listener) {
            this.DateInput.nativeElement.removeEventListener('date-change', this.listener);
        }
    }
}
