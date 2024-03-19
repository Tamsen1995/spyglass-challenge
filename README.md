# Star Wars Universe Explorer

Explore the vastness of the Star Wars universe with this interactive web application. Built with SvelteKit and TypeScript, this app allows users to browse through the planets of the Star Wars galaxy, learn about each one, and discover the residents who inhabit them.

## Features

- **Explore Planets**: Browse a paginated list of planets sourced from the Star Wars API (SWAPI).
- **Planet Details**: Click on a planet to view detailed information, including its climate, terrain, population, and notable residents.
- **Resident Details**: Click on a resident's name in the planet details to view more information about them in a modal.
- **Planet Search**: Quickly find planets by name with the real-time search feature.
- **Caching**: Leverages IndexedDB to cache API results for faster subsequent loads.

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

## Planet Search

The application includes a real-time search feature that allows users to quickly find planets by name. As the user types in the search box, the list of planets is automatically filtered to match the search query. This feature makes it easy to locate specific planets without having to manually browse through the entire list.

## Resident Details

The application now includes a feature to view more details about the residents of each planet. When viewing a planet's details, a list of known residents is displayed. Each resident's name is a clickable button.

When you click on a resident's name, a modal will appear on the screen. This modal displays detailed information about the resident, such as their name, height, mass, hair color, skin color, eye color, birth year, and gender.

To close the modal and return to the planet details, simply click on the 'Close' button in the modal. This feature makes it easy to learn more about the residents of each planet without having to navigate away from the planet's details page.
