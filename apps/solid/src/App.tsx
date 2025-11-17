import './App.css';

import { DateInput, DateRangeInput } from '@repo/solid-a11y-date-input';
import { createSignal } from 'solid-js';

function App() {
    const [selectedDate, setSelectedDate] = createSignal<Date | null>(null);
    const [selectedDateWithTime, setSelectedDateWithTime] = createSignal<Date | null>(null);
    const [rangeStart, setRangeStart] = createSignal<Date | null>(null);
    const [rangeEnd, setRangeEnd] = createSignal<Date | null>(null);

    return (
        <div class="app">
            <h1>Natural Date Picker - Solid Demo</h1>

            <div class="card">
                <h2>V1: Basic Date Picker</h2>
                <p>Select a date</p>
                <DateInput value={selectedDate()} onDateChange={setSelectedDate} locale="en-US" minYear={1900} maxYear={2100} />
                {selectedDate() && (
                    <p class="result">
                        <strong>Selected:</strong>{' '}
                        {selectedDate()!.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                )}
            </div>

            <div class="card">
                <h2>V2: Date Picker with Time</h2>
                <p>Select a date and time</p>
                <DateInput
                    value={selectedDateWithTime()}
                    onDateChange={setSelectedDateWithTime}
                    locale="en-US"
                    showTime={true}
                    minYear={1900}
                    maxYear={2100}
                />
                {selectedDateWithTime() && (
                    <p class="result">
                        <strong>Selected:</strong>{' '}
                        {selectedDateWithTime()!.toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                )}
            </div>

            <div class="card">
                <h2>V3: Date Range Picker</h2>
                <p>Select a date range</p>
                <DateRangeInput
                    startDate={rangeStart()}
                    endDate={rangeEnd()}
                    onRangeChange={(start, end) => {
                        setRangeStart(start);
                        setRangeEnd(end);
                    }}
                    locale="en-US"
                    minYear={1900}
                    maxYear={2100}
                />
                {(rangeStart() || rangeEnd()) && (
                    <div class="result">
                        <p>
                            <strong>Start:</strong>{' '}
                            {rangeStart()?.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) || 'Not selected'}
                        </p>
                        <p>
                            <strong>End:</strong>{' '}
                            {rangeEnd()?.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) || 'Not selected'}
                        </p>
                    </div>
                )}
            </div>

            <div class="card">
                <h2>Internationalization Example</h2>
                <p>French locale (fr-FR)</p>
                <DateInput locale="fr-FR" minYear={1900} maxYear={2100} />
            </div>
        </div>
    );
}

export default App;
