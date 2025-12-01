import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('day-constraints')
export class DayConstraints extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .day-constraints {
            border: 1px solid var(--border-color, #e5e7eb);
            border-radius: 0.5rem;
            padding: 1rem;
            background: var(--background, #f9fafb);
        }

        legend {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-color, #1f2937);
            padding: 0 0.5rem;
            margin-bottom: 0.5rem;
        }

        fieldset {
            border: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 0.75rem;
        }

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background: var(--background, #ffffff);
            border: 1px solid var(--border-color, #d1d5db);
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.15s ease-in-out;
            user-select: none;
        }

        label:hover {
            border-color: var(--primary-color, #3b82f6);
            background: rgba(59, 130, 246, 0.05);
        }

        label:has(input:checked) {
            background: var(--primary-color, #3b82f6);
            border-color: var(--primary-color, #3b82f6);
            color: white;
        }

        input[type='checkbox'] {
            width: 1.125rem;
            height: 1.125rem;
            border: 1.5px solid var(--border-color, #d1d5db);
            border-radius: 0.25rem;
            cursor: pointer;
            appearance: none;
            background: var(--background, #ffffff);
            position: relative;
            transition: all 0.15s ease-in-out;
            flex-shrink: 0;
        }

        input[type='checkbox']:hover {
            border-color: var(--primary-color, #3b82f6);
        }

        input[type='checkbox']:checked {
            background: white;
            border-color: white;
        }

        input[type='checkbox']:checked::after {
            content: '';
            position: absolute;
            left: 0.25rem;
            top: 0.0625rem;
            width: 0.375rem;
            height: 0.625rem;
            border: solid var(--primary-color, #3b82f6);
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        input[type='checkbox']:focus {
            outline: none;
            box-shadow: var(--focus-ring, 0 0 0 3px rgba(59, 130, 246, 0.1));
        }

        label span {
            font-size: 0.875rem;
            font-weight: 500;
        }

        @media (max-width: 640px) {
            .day-constraints {
                padding: 0.75rem;
            }

            fieldset {
                grid-template-columns: 1fr;
            }
        }
    `;

    @property({ type: Object })
    constraints: Set<number> = new Set(); // (0=Sunday, 6=Saturday)

    @property({ type: String })
    locale = 'en-US';

    private _getDayNames(): string[] {
        const formatter = new Intl.DateTimeFormat(this.locale, { weekday: 'long' });
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(2000, 0, 1 + i); // Jan 1, 2000 was a Monday
            return formatter.format(date);
        });
    }

    private _handleDayClick(e: Event) {
        const checkbox = e.target as HTMLInputElement;
        const dayOfWeek = parseInt(checkbox.value, 10);

        const newConstraints = new Set(this.constraints);

        if (checkbox.checked) {
            newConstraints.add(dayOfWeek);
        } else {
            newConstraints.delete(dayOfWeek);
        }

        this.dispatchEvent(
            new CustomEvent('constraint-change', {
                detail: { constraints: newConstraints },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        const dayNames = this._getDayNames();

        return html`
            <fieldset class="day-constraints" part="day-constraints">
                <legend>Constrain by day of week</legend>
                ${dayNames.map(
                    (name, index) => html`
                        <label>
                            <input type="checkbox" value=${index} .checked=${this.constraints.has(index)} @change=${this._handleDayClick} />
                            <span>${name}</span>
                        </label>
                    `
                )}
            </fieldset>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'day-constraints': DayConstraints;
    }
}
