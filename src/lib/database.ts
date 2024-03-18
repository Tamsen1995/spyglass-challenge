import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface ApiData {
	id?: number;
	url: string;
	data: unknown;
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
	console.log('Initializing database...');
	try {
		const db = await openDB<MyDB>('myDatabase', 1, {
			upgrade(db) {
				console.log('Upgrading database...');
				const store = db.createObjectStore('apiData', {
					keyPath: 'url'
				});
				store.createIndex('url', 'url');
			}
		});
		console.log('Database initialized successfully');
		return db;
	} catch (error) {
		console.error('Failed to initialize database:', error);
		throw error;
	}
}
