<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPerson, fetchPlanet } from '$lib/api';
    import { page } from '$app/stores';
    import ResidentModal from '../../components/ResidentModal.svelte';
    import type { Resident } from '../../types.ts';

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
    let planetResidents: Resident[] = [];

    onMount(async () => {
        const url = $page.url.searchParams.get('url');
        if (url) {
            await fetchPlanetData(url);
        }
    });

    async function fetchPlanetData(url: string) {
        planet = await fetchPlanet(url);
        planetResidents = planet?.residents.length 
            ? await fetchResidents(planet.residents) 
            : [];
    }

    async function fetchResidents(residentUrls: string[]) {
        const residents = await Promise.all(residentUrls.map(fetchPerson));
        console.log('Residents:', residents);
        return residents.map(resident => resident);
    }

    let selectedResident: Resident | null = null;

    async function showResidentDetails(url: string) {
        selectedResident = await fetchPerson(url);
    }

    function closeResidentDetails() {
        selectedResident = null;
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

    ul {
        list-style-type: none; /* removes bullet points */
        padding: 0;
    }

    li {
        padding: 10px 0; /* adds vertical padding */
        border-bottom: 1px solid #ccc; /* adds a bottom border */
    }

    li:last-child {
        border-bottom: none; /* removes the bottom border from the last item */
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
            {#each planetResidents as resident (resident?.name)}
                <li>
                    <button on:click={() => resident?.url && showResidentDetails(resident.url)}>
                        {resident?.name}
                    </button>
                </li>
            {:else}
                <li>No known residents</li>
            {/each}
        </ul>
    {/if}
    <a href="/">Back to list</a>

    {#if selectedResident}
        <ResidentModal resident={selectedResident} close={closeResidentDetails} />
    {/if}
</main>