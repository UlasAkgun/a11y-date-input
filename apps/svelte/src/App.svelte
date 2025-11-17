<script lang="ts">
  import { DateInput, DateRangeInput } from '@repo/svelte-a11y-date-input';

  let selectedDate: Date | null = null;
  let selectedDateWithTime: Date | null = null;
  let rangeStart: Date | null = null;
  let rangeEnd: Date | null = null;

  function handleDateChange(date: Date | null) {
    selectedDate = date;
  }

  function handleDateWithTimeChange(date: Date | null) {
    selectedDateWithTime = date;
  }

  function handleRangeChange(start: Date | null, end: Date | null) {
    rangeStart = start;
    rangeEnd = end;
  }
</script>

<div class="app">
  <h1>Natural Date Picker - Svelte Demo</h1>

  <div class="card">
    <h2>V1: Basic Date Picker</h2>
    <p>Select a date</p>
    <DateInput
      value={selectedDate}
      onDateChange={handleDateChange}
      locale="en-US"
      minYear={1900}
      maxYear={2100}
    />
    {#if selectedDate}
      <p class="result">
        <strong>Selected:</strong> {selectedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    {/if}
  </div>

  <div class="card">
    <h2>V2: Date Picker with Time</h2>
    <p>Select a date and time</p>
    <DateInput
      value={selectedDateWithTime}
      onDateChange={handleDateWithTimeChange}
      locale="en-US"
      showTime={true}
      minYear={1900}
      maxYear={2100}
    />
    {#if selectedDateWithTime}
      <p class="result">
        <strong>Selected:</strong> {selectedDateWithTime.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    {/if}
  </div>

  <div class="card">
    <h2>V3: Date Range Picker</h2>
    <p>Select a date range</p>
    <DateRangeInput
      startDate={rangeStart}
      endDate={rangeEnd}
      onRangeChange={handleRangeChange}
      locale="en-US"
      minYear={1900}
      maxYear={2100}
    />
    {#if rangeStart || rangeEnd}
      <div class="result">
        <p>
          <strong>Start:</strong> {rangeStart?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) || 'Not selected'}
        </p>
        <p>
          <strong>End:</strong> {rangeEnd?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) || 'Not selected'}
        </p>
      </div>
    {/if}
  </div>

  <div class="card">
    <h2>Internationalization Example</h2>
    <p>French locale (fr-FR)</p>
    <DateInput locale="fr-FR" minYear={1900} maxYear={2100} />
  </div>
</div>

<style>
  .app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .card {
    padding: 2em;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 2rem;
  }

  code {
    background-color: #f4f4f4;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: block;
    margin: 1rem 0;
    font-family: monospace;
  }
</style>
