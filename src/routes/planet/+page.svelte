<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPlanet } from '$lib/api';
    import { page } from '$app/stores';

    interface Planet {
        name: string;
        // Add other properties as needed
    }

    let planet: Planet | null = null;
    let url: string | null;

    $: url = $page.url.searchParams.get('url');

    $: if (url) fetchPlanetData(url);

    async function fetchPlanetData(url: string) {
        planet = await fetchPlanet(url);
    }
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
        font-size: 1.2em;
        margin-top: 2em;
        border: 2px solid #2962FF;
        padding: 0.5em 1em;
        border-radius: 2em;
        transition: background-color 0.3s ease;
    }

    a:hover {
        background-color: #2962FF;
        color: #ECEFF1;
    }
</style>


<main>
    {#if planet}
        <h1>{planet.name}</h1>
        <!-- Add more details as needed -->
    {/if}
    <a href="/">Back to list</a>
</main>