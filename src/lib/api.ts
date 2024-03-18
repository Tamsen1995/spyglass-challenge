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
