<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPerson, fetchPlanet } from '$lib/api';
    import { page } from '$app/stores';

    interface Planet {
        name: string;
        rotation_period: string;
        orbital_period: string;
        diameter: string;
        climate: string;
        gravity: string;
        terrain: string;
        surface_water: string;
        population: string;
        residents: string[];
        films: string[];
        created: string;
        edited: string;
        url: string;
    }

    let planet: Planet | null = null;
    let url: string | null;
    let planetResidents: string[] = [];

    onMount(async () => {
        url = $page.url.searchParams.get('url');
        if (url) {
            await fetchPlanetData(url);
        }
    });

    async function fetchPlanetData(url: string) {
        planet = await fetchPlanet(url);
        if (planet && planet.residents.length > 0) {
            const residents = await Promise.all(planet.residents.map(fetchPerson));
            planetResidents = residents.map(resident => resident.name);
        } else {
            planetResidents = ['No known residents'];
        }
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

    h1, h2 {
        font-size: 2.5em;
        margin-bottom: 1em;
    }

    p, li {
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
        <h2>Known Residents</h2>
        <ul>
            {#each planetResidents as resident}
                <li>{resident}</li>
            {/each}
        </ul>
    {/if}
    <a href="/">Back to list</a>
</main>