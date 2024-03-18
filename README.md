# Star Wars Universe Explorer

Explore the vastness of the Star Wars universe with our interactive web application. Built with SvelteKit and TypeScript, this app allows users to browse through the planets of the Star Wars galaxy, learn about each one, and discover the residents who inhabit them.

## Features

- **Explore Planets**: Browse a paginated list of planets sourced from the Star Wars API (SWAPI).
- **Planet Details**: Click on a planet to view detailed information, including its climate, terrain, population, and notable residents.
- **Caching**: Leverages IndexedDB to cache API results for faster subsequent loads.
- **Responsive Design**: Enjoy a seamless experience across all your devices.

## Installation

Install the necessary dependencies:

```bash
npm install
```

## Running the Application

To run the application in development mode:

```bash
npm run dev
```

## Building for Production

To create a production build:

```bash
npm run build
```

## Live Application

The application is deployed and can be accessed at [spyglass-challenge-tau.vercel.app](https://spyglass-challenge-tau.vercel.app/).

## Caching Strategy

The application uses IndexedDB to cache API results, which significantly improves performance on subsequent loads.

When the application fetches data, it first checks the cache. If the data is present and less than an hour old, the application uses the cached data. If the data is not present or is more than an hour old, the application fetches fresh data from the API, updates the cache, and then uses the fresh data.

This strategy ensures that the application always displays data that is reasonably up-to-date, while still benefiting from the speed of cached data.
