<script lang="ts">
  import { format } from "./helpers"

  export let factor

  let sections = ["group", "tags", "countries"]

  let scores = [
    {
      key: "antiSeoUpperBound",
      title: "Anti SEO Upper Bound",
    },
    {
      key: "canonicalValue",
      title: "Canonical Value",
    },
    {
      key: "minValue",
      title: "Min Value",
    },
    {
      key: "maxValue",
      title: "Max Value",
    },
  ]
</script>

<div class="space-y-4">
  <header class="space-y-2">
    <div class="text-sm font-mono dense">
      <span title="Index">
        #{factor.index}
      </span>
      {#if factor.implementationTime}
        -
        <span class="Implementation Time">
          {factor.implementationTime}
        </span>
      {/if}
    </div>

    <h1 class="font-mono text-2xl text-gray-2">
      {format(factor.name, "name") || "Untitled"}
    </h1>

    <div class="dense space-x-1">
      <span title="Source Name">
        {factor.name}
      </span>
      <span title="C++ Source Name">
        {factor.cppName}
      </span>
    </div>

    {#if factor.dependsOn}
      <div class="dense">
        <span class=""> Depends on</span>
        {#if factor.dependsOn.Slice === "web_production"}
          <a href={`/${factor.dependsOn.Feature}`}>
            <code> {factor.dependsOn.Feature}</code>
          </a>
        {:else}
          <code> {factor.dependsOn.Slice}.{factor.dependsOn.Feature}</code>
        {/if}
      </div>
    {/if}
  </header>

  {#if factor.description_en}
    <div class="text-gray-3 pt-1 pb-8">
      {factor.description_en}
    </div>
  {/if}

  {#if scores.filter((score) => factor[score.key]).length > 0}
    <div>
      <h2>Scores</h2>
      {#each scores as { key, title }}
        {#if factor[key]}
          <div class="dense">
            {title}: {factor[key]}
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  {#each sections as section}
    {#if factor[section] && Array.isArray(factor[section]) && factor[section].length > 0}
      <div>
        <h2>{section}</h2>
        <ul>
          {#each factor[section] as item}
            <li class="dense">
              {format(item, section)}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  {/each}

  <div>
    <details class="space-y-4">
      <summary class="text-center dense cursor-pointer">
        <h2 class="inline dense">Details</h2>
      </summary>

      <table class="font-mono text-left break-all text-gray-3 text-sm">
        {#each Object.entries(factor) as [key, value]}
          {#if key !== "description_en"}
            <tr class="">
              <th class="w-1/3 pb-1 capitalize">{key}</th>
              <td class="w-2/3 pb-1">
                {#if key === "wiki"}
                  <a href={value} rel="help">
                    {value}
                  </a>
                {:else}
                  {value}
                {/if}
              </td>
            </tr>
          {/if}
        {/each}
      </table>
    </details>
  </div>

  <footer class="pt-8 text-(xs gray-5) tracking-wide">
    The ranking factor information on this page is based on the
    <a
      href="https://breached.vc/Thread-yandex-git-sources?pid=1197282#pid1197282"
    >
      leaked source code repository
    </a>
    of the Yandex Search Engine. For the purpose of this project, the source was
    transformed into JSON and descriptions were translated into English. The source
    is publicly available
    <a
      href="https://github.com/devidw/yandex-ranking-factors"
      class="text-sky-8"
    >
      devidw/yandex-ranking-factors</a
    >.
  </footer>
</div>

<style>
  h2,
  li {
    @apply capitalize;
  }

  h2 {
    @apply text-gray-2;
  }

  .dense {
    @apply text-sm text-gray-4 font-mono;
  }

  a {
    @apply text-sky;
  }

  *[title] {
    @apply cursor-help;
  }
</style>
