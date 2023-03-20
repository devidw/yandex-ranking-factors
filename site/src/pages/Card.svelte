<script lang="ts">
  import { format } from "./helpers"

  export let factor
</script>

<div
  class="border-(1 dark-1) py-3 px-5 space-y-1 break-all cursor-pointer"
  on:click
>
  <div class="flex justify-between items-center font-mono">
    <h3 class="text-gray-3">
      <a href={`/${factor.name}`}>
        {format(factor.name, "name") || "Untitled"}
      </a>
    </h3>
    <span class="text-sm text-gray-5">#{factor.index}</span>
  </div>
  {#if factor.description_en}
    <div class="max-w-3/4 text-sm text-gray-4">
      {factor.description_en}
    </div>
  {/if}
</div>
