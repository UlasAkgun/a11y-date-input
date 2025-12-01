import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('time-picker')
export class TimePicker extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .time-picker {
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
        }

        fieldset {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            border: none;
            padding: 0;
            margin: 0;
        }

        label {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            flex: 1;
        }

        label span {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--label-color, #6b7280);
        }

        input {
            width: 100%;
            padding: 0.625rem 0.75rem;
            font-size: 0.9375rem;
            line-height: 1.5;
            color: var(--text-color, #1f2937);
            background-color: var(--background, #ffffff);
            border: 1px solid var(--border-color, #d1d5db);
            border-radius: 0.5rem;
            transition: all 0.15s ease-in-out;
            text-align: center;
            font-variant-numeric: tabular-nums;
        }

        input[type='number'] {
            -moz-appearance: textfield;
        }

        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input:hover {
            border-color: var(--primary-color, #3b82f6);
        }

        input:focus {
            outline: none;
            border-color: var(--primary-color, #3b82f6);
            box-shadow: var(--focus-ring, 0 0 0 3px rgba(59, 130, 246, 0.1));
        }

        span[aria-hidden] {
            font-size: 1.5rem;
            font-weight: 300;
            color: var(--label-color, #6b7280);
            align-self: flex-end;
            padding-bottom: 0.625rem;
        }

        @media (max-width: 640px) {
            .time-picker {
                padding: 0.75rem;
            }
        }
    `;

    @property({ type: Number })
    hour = 0; // (0-23)

    @property({ type: Number })
    minute = 0; // (0-59)

    private _handleHourChange(e: Event) {
        const input = e.target as HTMLInputElement;
        const hour = parseInt(input.value, 10);

        if (!isNaN(hour) && hour >= 0 && hour <= 23) {
            this.dispatchEvent(
                new CustomEvent('time-change', {
                    detail: { hour, minute: this.minute },
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    private _handleMinuteChange(e: Event) {
        const input = e.target as HTMLInputElement;
        const minute = parseInt(input.value, 10);

        if (!isNaN(minute) && minute >= 0 && minute <= 59) {
            this.dispatchEvent(
                new CustomEvent('time-change', {
                    detail: { hour: this.hour, minute },
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    render() {
        return html`
            <fieldset class="time-picker" part="time-picker">
                <legend>Time</legend>

                <label>
                    <span>Hour</span>
                    <input
                        type="number"
                        @input=${this._handleHourChange}
                        .value=${this.hour.toString().padStart(2, '0')}
                        min="0"
                        max="23"
                        step="1"
                        aria-label="Enter hour (0-23)"
                    />
                </label>

                <span aria-hidden="true">:</span>

                <label>
                    <span>Minute</span>
                    <input
                        type="number"
                        @input=${this._handleMinuteChange}
                        .value=${this.minute.toString().padStart(2, '0')}
                        min="0"
                        max="59"
                        step="1"
                        aria-label="Enter minute (0-59)"
                    />
                </label>
            </fieldset>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'time-picker': TimePicker;
    }
}
