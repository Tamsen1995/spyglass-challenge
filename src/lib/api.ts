export async function fetchPlanets() {
	const response = await fetch('https://swapi.dev/api/planets/');
	if (!response.ok) {
		throw new Error('Failed to fetch planets');
	}
	return await response.json();
}
