import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('date-range-input')
export class DateRangeInput extends LitElement {
    @property({ type: Object })
    startDate?: Date;

    @property({ type: Object })
    endDate?: Date;

    @property({ type: String })
    locale = 'en-US';

    @property({ type: Number })
    minYear = 1900;

    @property({ type: Number })
    maxYear = 2100;

    private _handleStartDateChange(e: CustomEvent) {
        this.dispatchEvent(
            new CustomEvent('range-change', {
                detail: {
                    startDate: e.detail.date,
                    endDate: this.endDate,
                },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleEndDateChange(e: CustomEvent) {
        this.dispatchEvent(
            new CustomEvent('range-change', {
                detail: {
                    startDate: this.startDate,
                    endDate: e.detail.date,
                },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <div class="date-range-input" part="date-range-input">
                <div class="range-start">
                    <h3>Start Date</h3>
                    <date-input
                        .value=${this.startDate}
                        .locale=${this.locale}
                        .minYear=${this.minYear}
                        .maxYear=${this.maxYear}
                        @date-change=${this._handleStartDateChange}
                    ></date-input>
                </div>

                <div class="range-end">
                    <h3>End Date</h3>
                    <date-input
                        .value=${this.endDate}
                        .locale=${this.locale}
                        .minYear=${this.minYear}
                        .maxYear=${this.maxYear}
                        @date-change=${this._handleEndDateChange}
                    ></date-input>
                </div>
            </div>
        `;
    }
}
