<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPlanets } from '$lib/api';
  
    let planets: any[] = [];
    let next: string | null = null;
    let previous: string | null = null;
    let page: number = 1;
    const maxPage = 6; // since the count of planets is 60
    const pages = Array.from({length: maxPage}, (_, i) => i + 1);

    async function loadPlanets(url: string | null) {
        try {
            const data = await fetchPlanets(url);
            planets = data.results;
            planets[0].url
            next = data.next;
            previous = data.previous;
        } catch (error) {
            console.error('Failed to fetch planets:', error);
        }
    }
  
    function nextPage() {
        if (next) {
            page++;
            loadPlanets(next);
        }
    }
  
    function previousPage() {
        if (previous) {
            page--;
            loadPlanets(previous);
        }
    }
  
    function goToPage(p: number) {
        loadPlanets(`https://swapi.dev/api/planets/?page=${p}`);
        page = p;
    }
  
    onMount(() => loadPlanets('https://swapi.dev/api/planets/'));
</script>

<style>
    .active {
        color: red;
    }
</style>
  
<main>
    <h1>Planets</h1>
    <p>Page: {page}</p>
    {#each planets as planet}
        <p><a href={`/planet?url=${encodeURIComponent(planet.url)}`}>{planet.name}</a></p>
    {/each}
    <button on:click={previousPage} disabled={!previous}>Previous</button>
    {#each pages as p}
        <button class:active={p === page} on:click={() => goToPage(p)}>{p}</button>
    {/each}
    <button on:click={nextPage} disabled={!next}>Next</button>
</main>