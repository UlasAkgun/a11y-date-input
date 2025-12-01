<script lang="ts">
  import '@repo/a11y-date-input';
  import { onMount } from 'svelte';

  export let value: Date | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let minYear: number | undefined = 1900;
  export let maxYear: number | undefined = 2100;
  export let defaultYear: number | undefined = undefined;
  export let locale: string | undefined = 'en-US';
  export let showTime: boolean = false;
  export let onDateChange: ((date: Date | null) => void) | undefined = undefined;

  let element: HTMLElement;

  onMount(() => {
    const handleDateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ date: Date | null }>;
      onDateChange?.(customEvent.detail.date);
    };

    element.addEventListener('date-change', handleDateChange);

    return () => {
      element.removeEventListener('date-change', handleDateChange);
    };
  });

  // Update value when it changes externally
  $: if (element && value !== undefined) {
    (element as any).value = value;
  }
</script>

<date-input
  bind:this={element}
  {value}
  {placeholder}
  min-year={minYear}
  max-year={maxYear}
  default-year={defaultYear}
  {locale}
  show-time={showTime}
/>
