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
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2em;
        background-color: #ECEFF1;
        color: #37474F;
        font-family: 'Roboto', sans-serif;
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
        color: #2962FF;
        text-decoration: none;
    }

    a:hover {
        color: #448AFF;
        text-decoration: underline;
    }

    button {
        background-color: #2962FF;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 1em;
        margin: 0.5em;
        padding: 0.5em 1em;
        border-radius: 4px;
        box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
        transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    button:disabled {
        background-color: #B0BEC5;
        cursor: not-allowed;
    }

    button:hover {
        box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    }


    .button-container {
        display: flex;
        justify-content: center;
        gap: 1em;
    }

    .active {
        background-color: #448AFF;
    }
</style>
  
<main>
    <h1>Planets</h1>
    <p>Page: {page}</p>
    {#each planets as planet}
        <p><a href={`/planet?url=${encodeURIComponent(planet.url)}`}>{planet.name}</a></p>
    {/each}
    <div class="button-container">
        <button on:click={previousPage} disabled={!previous}>Previous</button>
        {#each pages as p}
            <button class:active={p === page} on:click={() => goToPage(p)}>{p}</button>
        {/each}
        <button on:click={nextPage} disabled={!next}>Next</button>
    </div>
</main>