import { getDb } from './database';

async function fetchFromAPI(url: string, errorMessage: string) {
	console.log('fetchFromAPI', url);
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(errorMessage);
	}
	return await response.json();
}

async function fetchWithCache(url: string, errorMessage: string) {
	const db = await getDb();
	const tx = db.transaction('apiData', 'readonly');
	const store = tx.objectStore('apiData');
	const cachedData = await store.get(url);
	if (cachedData && Date.now() - +cachedData.timestamp < 3600000) {
		// 1 hour in milliseconds
		// Return the cached data if it's less than 1 hour old
		return cachedData.data;
	}

	const data = await fetchFromAPI(url, errorMessage);

	// Save the data to IndexedDB
	const writeTx = db.transaction('apiData', 'readwrite');
	const writeStore = writeTx.objectStore('apiData');
	await writeStore.put({ url: url, data: data, timestamp: Date.now() });
	await writeTx.done;

	return data;
}

export async function fetchPlanets(url: string | null) {
	if (!url) {
		throw new Error('No URL provided');
	}
	return await fetchWithCache(url, 'Failed to fetch planets');
}

export async function fetchPlanet(url: string) {
	console.log('fetchPlanet', url);
	return await fetchWithCache(url, 'Failed to fetch planet');
}

export async function fetchPerson(url: string) {
	return await fetchWithCache(url, 'Failed to fetch person');
}
