import './App.css';

import { useState } from 'react';

import { DateInput, DateRangeInput } from '../../../packages/react-a11y-date-input/dist';

export function App() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDateWithTime, setSelectedDateWithTime] = useState<Date | null>(null);
    const [rangeStart, setRangeStart] = useState<Date | null>(null);
    const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

    return (
        <div className="app">
            <h1>Natural Date Picker - React Demo</h1>

            <div className="card">
                <h2>V1: Basic Date Picker with Day Constraints</h2>
                <p>Select a date and constrain by days of the week</p>
                <DateInput
                    value={selectedDate ?? undefined}
                    onDateChange={setSelectedDate}
                    locale="en-US"
                    minYear={1900}
                    maxYear={2100}
                    showTime={true}
                />
                {selectedDate && (
                    <p className="result">
                        <strong>Selected:</strong>{' '}
                        {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                )}
            </div>

            <div className="card">
                <h2>V2: Date Picker with Time</h2>
                <p>Select a date and time</p>
                <DateInput
                    value={selectedDateWithTime ?? undefined}
                    onDateChange={setSelectedDateWithTime}
                    locale="en-US"
                    showTime={true}
                    minYear={1900}
                    maxYear={2100}
                />
                {selectedDateWithTime && (
                    <p className="result">
                        <strong>Selected:</strong>{' '}
                        {selectedDateWithTime.toLocaleString('en-US', {
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

            <div className="card">
                <h2>V3: Date Range Picker</h2>
                <p>Select a date range</p>
                <DateRangeInput
                    startDate={rangeStart ?? undefined}
                    endDate={rangeEnd ?? undefined}
                    onRangeChange={(start, end) => {
                        setRangeStart(start);
                        setRangeEnd(end);
                    }}
                    locale="en-US"
                    minYear={1900}
                    maxYear={2100}
                />
                {(rangeStart || rangeEnd) && (
                    <div className="result">
                        <p>
                            <strong>Start:</strong>{' '}
                            {rangeStart?.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) || 'Not selected'}
                        </p>
                        <p>
                            <strong>End:</strong>{' '}
                            {rangeEnd?.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) || 'Not selected'}
                        </p>
                    </div>
                )}
            </div>

            <div className="card">
                <h2>Internationalization Example</h2>
                <p>French locale (fr-FR)</p>
                <DateInput locale="fr-FR" minYear={1900} maxYear={2100} />
            </div>
        </div>
    );
}

export default App;
