<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPlanet } from '$lib/api';

    export let url: string;

    interface Planet {
        name: string;
        // Add other properties as needed
    }

    let planet: Planet | null = null;

    onMount(async () => {
        planet = await fetchPlanet(url);
    });
</script>

<main>
    {#if planet}
        <h1>{planet.name}</h1>
        <!-- Add more details as needed -->
    {/if}
    <a href="/">Back to list</a>
</main>