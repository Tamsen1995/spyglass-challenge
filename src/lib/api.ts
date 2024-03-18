export async function fetchPlanets(url: string | null) {
	if (!url) {
		throw new Error('No URL provided');
	}
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch planets');
	}
	return await response.json();
}

export async function fetchPlanet(url: string) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch planet');
	}
	return await response.json();
}

export async function fetchPerson(url: string) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch person');
	}
	return await response.json();
}
