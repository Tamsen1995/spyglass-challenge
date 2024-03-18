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
    {#if planet}
        <h1>{planet.name}</h1>
        <!-- Add more details as needed -->
    {/if}
    <a href="/">Back to list</a>
</main>