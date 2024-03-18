import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface ApiData {
	id?: number;
	url: string;
	data: any;
	timestamp: Date;
}

interface MyDB extends DBSchema {
	apiData: {
		key: string;
		value: ApiData;
		indexes: { url: string };
	};
}

export async function getDb(): Promise<IDBPDatabase<MyDB>> {
	return openDB<MyDB>('myDatabase', 1, {
		upgrade(db) {
			const store = db.createObjectStore('apiData', {
				keyPath: 'url' // Assuming 'url' is unique; change if needed
			});
			store.createIndex('url', 'url');
		}
	});
}
