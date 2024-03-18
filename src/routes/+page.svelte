<!-- src/routes/index.svelte -->
<script lang="ts">
        import { onMount } from 'svelte';
        import { fetchPlanets } from '$lib/api';
    
        let planets: any[] = [];
        let next: string | null = null;
    
        async function loadPlanets(url: string | null) {
            try {
                const data = await fetchPlanets(url);
                planets = data.results;
                next = data.next;
            } catch (error) {
                console.error('Failed to fetch planets:', error);
            }
        }
    
        function nextPage() {
            if (next) {
                loadPlanets(next);
            }
        }
    
        onMount(() => loadPlanets('https://swapi.dev/api/planets/'));
</script>
    
<main>
    <h1>Planets</h1>
    {#each planets as planet}
        <p>{planet.name}</p>
    {/each}
    <button on:click={nextPage} disabled={!next}>Next</button>
</main>