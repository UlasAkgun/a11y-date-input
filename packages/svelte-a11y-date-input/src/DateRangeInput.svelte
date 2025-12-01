<script lang="ts">
  import '@repo/a11y-date-input';
  import { onMount } from 'svelte';

  export let startDate: Date | undefined = undefined;
  export let endDate: Date | undefined = undefined;
  export let minYear: number | undefined = 1900;
  export let maxYear: number | undefined = 2100;
  export let defaultYear: number | undefined = undefined;
  export let locale: string | undefined = 'en-US';
  export let onRangeChange:
    | ((startDate: Date | null, endDate: Date | null) => void)
    | undefined = undefined;

  let element: HTMLElement;

  onMount(() => {
    const handleRangeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{
        startDate: Date | null;
        endDate: Date | null;
      }>;
      onRangeChange?.(customEvent.detail.startDate, customEvent.detail.endDate);
    };

    element.addEventListener('range-change', handleRangeChange);

    return () => {
      element.removeEventListener('range-change', handleRangeChange);
    };
  });

  // Update values when they change externally
  $: if (element) {
    if (startDate !== undefined) {
      (element as any).startDate = startDate;
    }
    if (endDate !== undefined) {
      (element as any).endDate = endDate;
    }
  }
</script>

<date-range-input
  bind:this={element}
  start-date={startDate}
  end-date={endDate}
  min-year={minYear}
  max-year={maxYear}
  default-year={defaultYear}
  {locale}
/>
