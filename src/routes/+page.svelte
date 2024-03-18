<!-- src/routes/index.svelte -->
<script lang="ts">
        import { onMount } from 'svelte';
        import { fetchPlanets } from '$lib/api';
    
        let planets: any[] = [];
        let next: string | null = null;
        let previous: string | null = null;
        let page: number = 1;
    
        async function loadPlanets(url: string | null) {
            try {
                const data = await fetchPlanets(url);
                planets = data.results;
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
    
        onMount(() => loadPlanets('https://swapi.dev/api/planets/'));
</script>
    
<main>
    <h1>Planets</h1>
    <p>Page: {page}</p>
    {#each planets as planet}
        <p>{planet.name}</p>
    {/each}
    <button on:click={previousPage} disabled={!previous}>Previous</button>
    <button on:click={nextPage} disabled={!next}>Next</button>
</main>