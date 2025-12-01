import { getDay, getDaysInMonth } from 'date-fns';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('date-selectors')
export class DateSelectors extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .date-inputs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 1rem;
        }

        label {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        label span {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--label-color, #6b7280);
            margin-bottom: 0.25rem;
        }

        select,
        input {
            padding: 0.625rem 0.75rem;
            font-size: 0.9375rem;
            line-height: 1.5;
            color: var(--text-color, #1f2937);
            background-color: var(--background, #ffffff);
            border: 1px solid var(--border-color, #d1d5db);
            border-radius: 0.5rem;
            transition: all 0.15s ease-in-out;
            appearance: none;
            background-image: none;
        }

        select {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.25rem;
            padding-right: 2.5rem;
            width: 100%;
        }

        input[type='number'] {
            -moz-appearance: textfield;
        }

        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        select:hover,
        input:hover {
            border-color: var(--primary-color, #3b82f6);
        }

        select:focus,
        input:focus {
            outline: none;
            border-color: var(--primary-color, #3b82f6);
            box-shadow: var(--focus-ring, 0 0 0 3px rgba(59, 130, 246, 0.1));
        }

        select:disabled,
        input:disabled {
            background-color: #f3f4f6;
            color: #9ca3af;
            cursor: not-allowed;
        }

        option:disabled {
            color: #9ca3af;
        }

        @media (max-width: 640px) {
            .date-inputs {
                grid-template-columns: 1fr;
            }
        }
    `;

    @property({ type: Number })
    day: number | null = null; // (1-31)

    @property({ type: Number })
    month: number | null = null; // (0-11)

    @property({ type: Number })
    year: number | null = null;

    @property({ type: Number })
    defaultYear = new Date().getFullYear();

    @property({ type: Number })
    minYear = 1900;

    @property({ type: Number })
    maxYear = 2100;

    @property({ type: String })
    locale = 'en-US';

    @property({ type: Object })
    dayConstraints: Set<number> = new Set();

    private _getMonthNames(): string[] {
        const formatter = new Intl.DateTimeFormat(this.locale, { month: 'long' });
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(2000, i, 1);
            return formatter.format(date);
        });
    }

    private _getDaysInMonth(): number {
        if (this.month === null) return 31;

        const year = this.year || this.defaultYear;
        const referenceDate = new Date(year, this.month, 1);
        return getDaysInMonth(referenceDate);
    }

    private _getAvailableDays(): number[] {
        const daysInMonth = this._getDaysInMonth();

        if (this.dayConstraints.size === 0) {
            return Array.from({ length: daysInMonth }, (_, i) => i + 1);
        }

        if (this.month === null) {
            return Array.from({ length: daysInMonth }, (_, i) => i + 1);
        }

        const year = this.year || this.defaultYear;
        const availableDays: number[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, this.month, day);
            const dayOfWeek = getDay(date);

            if (this.dayConstraints.has(dayOfWeek)) {
                availableDays.push(day);
            }
        }

        return availableDays;
    }

    private _handleDayChange(e: Event) {
        const select = e.target as HTMLSelectElement;
        const day = select.value ? parseInt(select.value, 10) : null;

        this.dispatchEvent(
            new CustomEvent('day-change', {
                detail: { day },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleMonthChange(e: Event) {
        const select = e.target as HTMLSelectElement;
        const month = select.value ? parseInt(select.value, 10) : null;

        this.dispatchEvent(
            new CustomEvent('month-change', {
                detail: { month },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleYearChange(e: Event) {
        const input = e.target as HTMLInputElement;
        const year = parseInt(input.value, 10);

        if (!isNaN(year) && year >= this.minYear && year <= this.maxYear) {
            this.dispatchEvent(
                new CustomEvent('year-change', {
                    detail: { year },
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    render() {
        const monthNames = this._getMonthNames();
        const availableDays = this._getAvailableDays();

        return html`
            <div class="date-inputs" part="date-inputs">
                <label>
                    <span>Day</span>
                    <select @change=${this._handleDayChange} .value=${this.day?.toString() || ''} aria-label="Select day">
                        <option value="">-</option>
                        ${Array.from({ length: this._getDaysInMonth() }, (_, i) => i + 1).map((day) => {
                            const isAvailable = availableDays.includes(day);
                            return html` <option value=${day} ?selected=${this.day === day} ?disabled=${!isAvailable}>${day}</option> `;
                        })}
                    </select>
                </label>

                <label>
                    <span>Month</span>
                    <select @change=${this._handleMonthChange} .value=${this.month?.toString() || ''} aria-label="Select month">
                        <option value="">-</option>
                        ${monthNames.map((name, index) => html` <option value=${index} ?selected=${this.month === index}>${name}</option> `)}
                    </select>
                </label>

                <label>
                    <span>Year</span>
                    <input
                        type="number"
                        @input=${this._handleYearChange}
                        .value=${this.year?.toString() || this.defaultYear.toString()}
                        min=${this.minYear}
                        max=${this.maxYear}
                        step="1"
                        aria-label="Enter year"
                        maxlength="4"
                    />
                </label>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'date-selectors': DateSelectors;
    }
}
