<script lang="ts">
  import factors from "./factors.json"
  import Card from "./Card.svelte"
  import Detail from "./Detail.svelte"
  import { format } from "./helpers"

  let currentFactor: typeof factors[0] | null = factors[0]
  let filteredFactors = factors
  let searchTerm = ""
  let filters = [
    {
      key: "group",
      options: new Set(),
      selected: [],
    },
    {
      key: "tags",
      options: new Set(),
      selected: [],
    },
    {
      key: "countries",
      options: new Set(),
      selected: [],
    },
  ]

  // for each filter add a options set of unique values
  filters.forEach((filter) => {
    factors.forEach((factor) => {
      if (factor[filter.key] && Array.isArray(factor[filter.key])) {
        factor[filter.key].forEach((value) => filter.options.add(value))
      }
    })
  })

  function filterFactors() {
    const search = searchTerm.toLowerCase()
    filteredFactors = factors.filter((factor) => {
      const textMatch = `${factor.name}${factor.description_en}${factor.index}`
        .toLowerCase()
        .includes(search)
      if (!textMatch) {
        return false
      }
      return filters.every((filter) => {
        if (filter.selected.length === 0) {
          return true
        }
        return filter.selected.some((value) => {
          if (Array.isArray(factor[filter.key])) {
            return factor[filter.key].includes(value)
          }
          return factor[filter.key] === value
        })
      })
    })
    if (filteredFactors.length > 0) {
      currentFactor = filteredFactors[0]
    } else {
      currentFactor = null
    }
  }
</script>

<h1 class="sr-only">Yandex Search Ranking Factors</h1>

<div class="min-h-screen bg-black text-light">
  <div class="grid md:grid-cols-[300px_1fr_1fr] max-w-[2400px] mx-auto">
    <aside class="lt-md:hidden max-h-screen overflow-y-auto p-8 space-y-4">
      <div class="space-y-2">
        {#each filters as filter}
          <div class="">
            <h3 class="text-xs text-gray-4 uppercase font-mono mb-1">
              {filter.key}
            </h3>
            {#each Array.from(filter.options) as option}
              <label class="block text-xs break-all capitalize">
                <input
                  type="checkbox"
                  value={option}
                  bind:group={filter.selected}
                  on:change={filterFactors}
                />
                {format(option, filter.key)}
              </label>
            {/each}
          </div>
        {/each}
      </div>
    </aside>
    <main class="pt-8">
      <div class="w-[90%] mx-auto">
        <div class="h-[80px] flex flex-col justify-between">
          <div class="text-gray-4 text-xs pl-5 font-mono">
            Showing {filteredFactors.length} of {factors.length} factors ~
            {Math.round((filteredFactors.length / factors.length) * 100)}% of
            all factors
          </div>
          <input
            type="text"
            class="w-full bg-transparent border-b-(1 yellow-9) py-2 px-5
          outline-none font-mono h-[50px]"
            placeholder="Search by name, description, or index"
            bind:value={searchTerm}
            on:input={filterFactors}
          />
        </div>
        <div
          class="h-[calc(100vh_-_80px_-_2rem)] overflow-y-auto space-y-4 py-8"
        >
          {#each filteredFactors as factor}
            <Card
              {factor}
              on:click={() => {
                currentFactor = factor
              }}
            />
          {/each}
        </div>
      </div>
    </main>
    <aside class="lt-md:hidden max-h-screen overflow-y-auto py-8">
      <div class="w-[90%] mx-auto">
        {#if currentFactor}
          <Detail factor={currentFactor} />
        {/if}
      </div>
    </aside>
  </div>
</div>

<style>
  ::-webkit-scrollbar {
    @apply bg-transparent w-2;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-yellow-9;
  }
</style>
