<!-- src/routes/index.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPlanets } from '$lib/api';
  
    let planets: any[] = [];
  
    onMount(async () => {
      try {
        const data = await fetchPlanets();
        planets = data.results;
      } catch (error) {
        console.error('Failed to fetch planets:', error);
      }
    });
  </script>
  
  <main>
    <h1>Planets</h1>
    {#each planets as planet}
      <p>{planet.name}</p>
    {/each}
  </main>
  