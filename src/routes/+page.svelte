<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPlanets } from '$lib/api';

    // Constants
    const BASE_URL = 'https://swapi.dev/api/planets/';
    const MAX_PAGE = 6; // since the count of planets is 60
    const pages = Array.from({length: MAX_PAGE}, (_, i) => i + 1);

    // State variables
    let planets: any[] = [];
    let filteredPlanets: any[] = [];
    let next: string | null = null;
    let previous: string | null = null;
    let page: number = 1;
    let search: string = '';

    // Fetch planets from API
    async function loadPlanets(url: string | null) {
        try {
            const data = await fetchPlanets(url);
            planets = data.results;
            filteredPlanets = planets;
            next = data.next;
            previous = data.previous;
        } catch (error) {
            console.error('Failed to fetch planets:', error);
        }
    }

    // Navigate to a different page
    function navigatePage(newPage: number, url: string | null) {
        page = newPage;
        loadPlanets(url);
    }

    // Filter planets based on search query
    $: {
        filteredPlanets = planets.filter(planet => planet.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Load planets on mount
    onMount(() => loadPlanets(BASE_URL));
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
        width: 80%;
        margin: 0 auto;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 2.5em;
        margin-bottom: 1em;
        text-align: center;
    }

    p {
        font-size: 1.2em;
        margin-bottom: 1em;
        line-height: 1.5;
    }

    a {
        color: #2962FF;
        text-decoration: none;
        transition: color 0.3s ease;
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
        padding: 0.5em 1em;
        border-radius: 4px;
        box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
        transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
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
        margin-top: 2em;
    }

    .active {
        background-color: #448AFF;
    }

    input[type="text"] {
        padding: 0.5em;
        font-size: 1em;
        border: 1px solid #B0BEC5;
        border-radius: 4px;
        margin-bottom: 1em;
        width: 50%;
        box-sizing: border-box;
    }

    input[type="text"]:focus {
        border-color: #2962FF;
        outline: none;
        box-shadow: 0 0 5px rgba(41, 98, 255, 0.5);
    }

</style>
  
<main>
    <h1>Planets</h1>
    <p>Page: {page}</p>
    <input type="text" bind:value={search} placeholder="Search for planets">
    {#each filteredPlanets as planet}
        <p><a href={`/planet?url=${encodeURIComponent(planet.url)}`}>{planet.name}</a></p>
    {/each}
    <div class="button-container">
        <button on:click={() => navigatePage(page - 1, previous)} disabled={!previous}>Previous</button>
        {#each pages as p}
            <button class:active={p === page} on:click={() => navigatePage(p, `${BASE_URL}?page=${p}`)}>{p}</button>
        {/each}
        <button on:click={() => navigatePage(page + 1, next)} disabled={!next}>Next</button>
    </div>
</main>