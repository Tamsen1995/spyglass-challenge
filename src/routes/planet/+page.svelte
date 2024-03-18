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

<main>
    {#if planet}
        <h1>{planet.name}</h1>
        <!-- Add more details as needed -->
    {/if}
    <a href="/">Back to list</a>
</main>