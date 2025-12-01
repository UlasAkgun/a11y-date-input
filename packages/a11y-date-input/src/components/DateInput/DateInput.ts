import '../_shared/DateSelectors.js';
import '../_shared/DayConstraints.js';
import '../_shared/TimePicker.js';

import { getDate, getDay, getDaysInMonth, getHours, getMinutes, getMonth, getYear, isValid, setHours, setMinutes, startOfDay } from 'date-fns';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('date-input')
export class DateInput extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #1f2937;
            --primary-color: #3b82f6;
            --primary-hover: #2563eb;
            --border-color: #d1d5db;
            --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1);
            --background: #ffffff;
            --text-color: #1f2937;
            --label-color: #6b7280;
        }

        .date-input {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.5rem;
            background: var(--background);
            border: 1px solid var(--border-color);
            border-radius: 0.75rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }

        @media (max-width: 640px) {
            .date-input {
                padding: 1rem;
                gap: 1rem;
            }
        }
    `;

    @property({ type: Object })
    value?: Date;

    @property({ type: String })
    placeholder = 'Select a date';

    @property({ type: Number })
    minYear = 1900;

    @property({ type: Number })
    maxYear = 2100;

    @property({ type: Number })
    defaultYear = new Date().getFullYear();

    @property({ type: String })
    locale = 'en-US';

    @property({ type: Boolean })
    showTime = true;

    @state()
    private selectedDay: number | null = null;

    @state()
    private selectedMonth: number | null = null;

    @state()
    private selectedYear: number | null = null;

    @state()
    private selectedHour = 0;

    @state()
    private selectedMinute = 0;

    @state()
    private dayConstraints: Set<number> = new Set();

    @state()
    private announcement = '';

    connectedCallback() {
        super.connectedCallback();
        this._initializeFromValue();
    }

    updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('value')) {
            this._initializeFromValue();
        }
    }

    private _initializeFromValue() {
        if (this.value && isValid(this.value)) {
            this.selectedDay = getDate(this.value);
            this.selectedMonth = getMonth(this.value);
            this.selectedYear = getYear(this.value);
            this.selectedHour = getHours(this.value);
            this.selectedMinute = getMinutes(this.value);
        } else {
            this.selectedDay = null;
            this.selectedMonth = null;
            this.selectedYear = this.defaultYear;
            this.selectedHour = 0;
            this.selectedMinute = 0;
        }
    }

    private _getDaysInSelectedMonth(): number {
        if (this.selectedMonth === null) return 31;

        const year = this.selectedYear || this.defaultYear;
        const referenceDate = new Date(year, this.selectedMonth, 1);
        return getDaysInMonth(referenceDate);
    }

    private _getAvailableDays(): number[] {
        const daysInMonth = this._getDaysInSelectedMonth();

        if (this.dayConstraints.size === 0) {
            return Array.from({ length: daysInMonth }, (_, i) => i + 1);
        }

        if (this.selectedMonth === null) {
            return Array.from({ length: daysInMonth }, (_, i) => i + 1);
        }

        const year = this.selectedYear || this.defaultYear;
        const availableDays: number[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, this.selectedMonth, day);
            const dayOfWeek = getDay(date);

            if (this.dayConstraints.has(dayOfWeek)) {
                availableDays.push(day);
            }
        }

        return availableDays;
    }

    private _findClosestAvailableDate(): number | null {
        const availableDays = this._getAvailableDays();

        if (availableDays.length === 0) return null;
        if (this.selectedDay === null) return availableDays[0];

        let closest = availableDays[0];
        let minDiff = Math.abs(this.selectedDay - closest);

        for (const day of availableDays) {
            const diff = Math.abs(this.selectedDay - day);
            if (diff < minDiff) {
                minDiff = diff;
                closest = day;
            }
        }

        return closest;
    }

    private _adjustDateToConstraints() {
        if (this.selectedDay === null) return;

        const availableDays = this._getAvailableDays();
        if (!availableDays.includes(this.selectedDay)) {
            const oldDay = this.selectedDay;
            const newDay = this._findClosestAvailableDate();

            if (newDay !== null && newDay !== oldDay) {
                this.selectedDay = newDay;
                this._announceChange('Date changed!');
                this._emitDateChange();
            }
        }
    }

    private _announceChange(message: string) {
        this.announcement = message;
        setTimeout(() => {
            this.announcement = '';
        }, 100);
    }

    private _handleDayChange(e: CustomEvent) {
        this.selectedDay = e.detail.day;
        this._emitDateChange();
    }

    private _handleMonthChange(e: CustomEvent) {
        this.selectedMonth = e.detail.month;

        if (this.selectedDay !== null && this.selectedMonth !== null) {
            const daysInMonth = this._getDaysInSelectedMonth();
            if (this.selectedDay > daysInMonth) {
                this.selectedDay = daysInMonth;
            }
        }

        this._adjustDateToConstraints();
        this._emitDateChange();
    }

    private _handleYearChange(e: CustomEvent) {
        this.selectedYear = e.detail.year;
        this._adjustDateToConstraints();
        this._emitDateChange();
    }

    private _handleTimeChange(e: CustomEvent) {
        this.selectedHour = e.detail.hour;
        this.selectedMinute = e.detail.minute;
        this._emitDateChange();
    }

    private _handleConstraintChange(e: CustomEvent) {
        this.dayConstraints = e.detail.constraints;
        this._adjustDateToConstraints();
    }

    private _buildDate(): Date | null {
        if (this.selectedDay === null || this.selectedMonth === null || this.selectedYear === null) {
            return null;
        }

        let date = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);

        if (this.showTime) {
            date = setHours(date, this.selectedHour);
            date = setMinutes(date, this.selectedMinute);
        } else {
            date = startOfDay(date);
        }

        return isValid(date) ? date : null;
    }

    private _emitDateChange() {
        const date = this._buildDate();

        this.dispatchEvent(
            new CustomEvent('date-change', {
                detail: { date },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <div class="date-input" part="date-input">
                <date-selectors
                    .day=${this.selectedDay}
                    .month=${this.selectedMonth}
                    .year=${this.selectedYear}
                    .defaultYear=${this.defaultYear}
                    .minYear=${this.minYear}
                    .maxYear=${this.maxYear}
                    .locale=${this.locale}
                    .dayConstraints=${this.dayConstraints}
                    @day-change=${this._handleDayChange}
                    @month-change=${this._handleMonthChange}
                    @year-change=${this._handleYearChange}
                ></date-selectors>

                ${
                    this.showTime
                        ? html`
                              <time-picker
                                  .hour=${this.selectedHour}
                                  .minute=${this.selectedMinute}
                                  @time-change=${this._handleTimeChange}
                              ></time-picker>
                          `
                        : ''
                }

                <day-constraints .constraints=${this.dayConstraints} .locale=${this.locale} @constraint-change=${this._handleConstraintChange}></day-constraints>

                <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">${this.announcement}</div>
            </div>
        `;
    }
}
