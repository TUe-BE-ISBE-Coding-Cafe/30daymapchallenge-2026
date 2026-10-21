export const links = {
	signup: 'https://forms.cloud.microsoft/e/Qqk5yjSuVT',
	repo: 'https://github.com/TUe-BE-ISBE-Coding-Cafe/30daymapchallenge-2026',
	official: 'https://30daymapchallenge.com',
	rbanism: 'https://rbanism.org'
};

export const kickoff = {
	date: 'Wednesday 28 October 2026',
	time: '12:00–13:30',
	room: 'Vertigo 9.06, TU/e'
};

// 2026 themes from 30daymapchallenge.com, with a short hint in our own words.
export const themes = [
	['Points', 'Map anything that is a dot.'],
	['Lines', 'Roads, rivers, routes, borders.'],
	['Polygons', 'Areas: buildings, parks, districts.'],
	['Clusters', 'Where things bunch together.'],
	['Senses: Sight', 'What can be seen from where.'],
	['Vintage', 'Make it look old, or map something old.'],
	['10 minute map', 'Done in ten minutes, no more.'],
	['Utopia', 'Map a place that could exist.'],
	['Urban-rural', 'Cities and the countryside.'],
	['Prompting only', 'Let an AI make the whole map.'],
	['Senses: Sound', 'Soundscapes and noise.'],
	['Power', 'Energy, strength or influence.'],
	['Interactions', 'Relationships, or an interactive map.'],
	['Borgesian map', 'So detailed it becomes the place.'],
	['Inside out', 'Flip something so it is subtly wrong.'],
	['Collaborative map', 'Made with another person.'],
	['Light & dark', 'Only light and shadow.'],
	['NULL', 'No hint. Make of it what you like.'],
	['Senses: Smell', 'What the nose can detect.'],
	['Hexagons', 'Everything in hexagons.'],
	['OpenStreetMap', 'Use OSM data, or edit OSM.'],
	['Projections', 'Ways to flatten the globe.'],
	['Senses: Taste', 'Food, drink, flavour.'],
	['Network', 'Routes, transit, connections.'],
	['Is this a map?', 'Where a map turns into art.'],
	['Water', 'Rivers, seas, rain, floods.'],
	['New tool', 'Try a tool you have never used.'],
	['Senses: Feeling', 'Map an abstract feeling.'],
	['Raster', 'Do something creative with pixels.'],
	['Pen & paper', 'Draw it by hand.']
].map(([name, hint], i) => ({ day: i + 1, name, hint }));

export const resources = [
	{
		group: 'Open data for the Netherlands',
		items: [
			{
				title: 'OpenStreetMap',
				url: 'https://www.openstreetmap.org',
				note: 'Worldwide map data. Credit "© OpenStreetMap contributors" (ODbL).'
			},
			{
				title: 'Overpass Turbo',
				url: 'https://overpass-turbo.eu',
				note: 'Query and download OSM data in the browser.'
			},
			{
				title: 'PDOK',
				url: 'https://www.pdok.nl',
				note: 'Dutch government geodata: buildings (BAG), topography, aerial photos.'
			},
			{
				title: 'CBS',
				url: 'https://www.cbs.nl',
				note: 'Statistics Netherlands, incl. the district and neighbourhood map (wijken en buurten).'
			},
			{
				title: 'Eindhoven open data',
				url: 'https://data.eindhoven.nl',
				note: 'Municipal datasets: trees, parking, sensors and more.'
			},
			{
				title: 'Natural Earth',
				url: 'https://www.naturalearthdata.com',
				note: 'Free country and coastline data for world maps.'
			}
		]
	},
	{
		group: 'Mapping in R',
		items: [
			{ title: 'sf', url: 'https://r-spatial.github.io/sf/', note: 'Read, transform and analyse vector data.' },
			{ title: 'ggplot2', url: 'https://ggplot2.tidyverse.org', note: 'Plot sf data with geom_sf().' },
			{ title: 'tmap', url: 'https://r-tmap.github.io/tmap/', note: 'Thematic maps with little code.' },
			{
				title: 'Geocomputation with R',
				url: 'https://r.geocompx.org',
				note: 'Free online book, from basics to advanced.'
			}
		]
	},
	{
		group: 'Mapping in Python',
		items: [
			{ title: 'GeoPandas', url: 'https://geopandas.org', note: 'pandas for spatial data.' },
			{ title: 'Matplotlib', url: 'https://matplotlib.org', note: 'Static maps from GeoDataFrame.plot().' },
			{
				title: 'Geographic Data Science with Python',
				url: 'https://geographicdata.science/book/',
				note: 'Free online book with worked examples.'
			}
		]
	},
	{
		group: 'Other tools and help',
		items: [
			{ title: 'QGIS', url: 'https://qgis.org', note: 'Free desktop GIS, no code needed.' },
			{
				title: 'epsg.io: RD New (EPSG:28992)',
				url: 'https://epsg.io/28992',
				note: 'The Dutch coordinate system. Reproject to it before measuring.'
			},
			{
				title: '#30DayMapChallenge',
				url: 'https://30daymapchallenge.com',
				note: 'The official site: themes, rules and past maps.'
			},
			{
				title: 'Rbanism (TU Delft)',
				url: 'https://rbanism.org',
				note: 'Our neighbours run an R edition of the challenge every November.'
			}
		]
	}
];
