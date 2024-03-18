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
    main {
        background-color: #333;
        color: #fff;
        font-family: 'Helvetica Neue', sans-serif;
        padding: 2em;
    }

    h1 {
        font-size: 2.5em;
        margin-bottom: 1em;
    }

    p {
        font-size: 1.2em;
        line-height: 1.5;
        margin-bottom: 1em;
    }

    a {
        color: #ff0;
        text-decoration: none;
    }

    a:hover {
        color: #ff0;
        text-decoration: underline;
    }

    button {
        background-color: #555;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 1em;
        margin: 0.5em;
        padding: 0.5em 1em;
    }

    button:disabled {
        background-color: #777;
        cursor: not-allowed;
    }

    .active {
        background-color: #ff0;
        color: #000;
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