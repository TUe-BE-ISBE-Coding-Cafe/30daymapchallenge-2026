# #30DayMapChallenge 2026 – TU/e BE Coding Café

Starter repository for the TU/e Built Environment Coding Café's take on the
[#30DayMapChallenge](https://30daymapchallenge.com), **1–30 November 2026**.
R or Python, beginners very welcome.

**See all the maps:** <https://tue-be-isbe-coding-cafe.github.io/30daymapchallenge-2026/>

![Day 1 example: cafés in Eindhoven](maps/day01-example/map.png)

## What is the challenge?

A community challenge to make **one map per day** in November, each day with a theme.
There is no sign-up and no jury: you make a map, post it with **#30DayMapChallenge**, and look at what
everyone else made. **Any tool is very welcome** (R, Python, QGIS, pen and paper...), and **fewer than
30 maps is completely fine** – one map is a success. Using AI is supported too (see
[AI is welcome](#ai-is-welcome)). Official site: <https://30daymapchallenge.com>.

## Café dates

| When | What | Where |
|---|---|---|
| **Wed 28 Oct 2026, 12:00–13:30** | Intro session: the challenge, this repo, make your Day 1 map together | Vertigo 9.06, TU/e |

Bring a laptop with R or Python installed (see [Quick start](#quick-start)). Lunch is on you.

## How to take part

**Join first:** fill in the [sign-up form](https://forms.cloud.microsoft/e/Qqk5yjSuVT) (2 minutes). It works even if you can't
come to the café: we'll send you updates. If enough people join, we'll also hold a
show-and-tell at the end of November.

1. **Pick 1–2 days** from the [theme table](#2026-themes) and put your name in [signup.md](signup.md)
   (optional, but it helps us spread the days).
2. **Fork** this repo on GitHub (or just clone it if you don't plan to submit a PR).
   ```bash
   git clone https://github.com/<you>/30daymapchallenge-2026.git
   cd 30daymapchallenge-2026
   ```
3. **Make a map.** Start from `r/day01_points.R` or `python/day01_points.py` and the data in `data/`.
4. **Add it under `maps/`** in a folder `maps/dayNN-<github-handle>/` containing
   - `map.png` – your map,
   - your code (`.R`, `.py`, `.qmd`, `.ipynb`, ...),
   - `README.md` – copied from [maps/_TEMPLATE/README.md](maps/_TEMPLATE/README.md) and filled in,
     **including the one-line AI disclosure**.
5. **Share it** (see [How to share](#how-to-share)).

See [maps/day01-example/](maps/day01-example/) for a complete example.

## 2026 themes

| Day | Date | Theme | Notes |
|---:|---|---|---|
| 01 | Sun 1 Nov | Points | Starter scripts in `r/` and `python/` |
| 02 | Mon 2 Nov | Lines | |
| 03 | Tue 3 Nov | Polygons | |
| 04 | Wed 4 Nov | Clusters | |
| 05 | Thu 5 Nov | Senses: Sight | |
| 06 | Fri 6 Nov | Vintage | |
| 07 | Sat 7 Nov | 10 minute map | |
| 08 | Sun 8 Nov | Utopia | |
| 09 | Mon 9 Nov | Urban-rural | |
| 10 | Tue 10 Nov | Prompting only | Map made **entirely** through an AI chat/CLI |
| 11 | Wed 11 Nov | Senses: Sound | |
| 12 | Thu 12 Nov | Power | |
| 13 | Fri 13 Nov | Interactions | |
| 14 | Sat 14 Nov | Borgesian map | |
| 15 | Sun 15 Nov | Inside out | |
| 16 | Mon 16 Nov | Collaborative map | With **another person** – AI doesn't count |
| 17 | Tue 17 Nov | Light & dark | |
| 18 | Wed 18 Nov | NULL | |
| 19 | Thu 19 Nov | Senses: Smell | |
| 20 | Fri 20 Nov | Hexagons | |
| 21 | Sat 21 Nov | OpenStreetMap | |
| 22 | Sun 22 Nov | Projections | |
| 23 | Mon 23 Nov | Senses: Taste | |
| 24 | Tue 24 Nov | Network | |
| 25 | Wed 25 Nov | Is this a map? | |
| 26 | Thu 26 Nov | Water | |
| 27 | Fri 27 Nov | New tool | |
| 28 | Sat 28 Nov | Senses: Feeling | |
| 29 | Sun 29 Nov | Raster | |
| 30 | Mon 30 Nov | Pen & paper | |

Always check <https://30daymapchallenge.com> for the official descriptions.

## AI is welcome

This year (2026/27) the BE Coding Café's theme is **AI in research software development**, so using an
AI assistant or agent to help make your maps is supported. It is not the main aim, though: the point
is making maps, and maps made in R, Python or any other tool without AI are just as welcome.
Days 10 (Prompting only) and 27 (New tool) fit AI especially well.

Being open about it is the one rule. Every map's `README.md` has **one line**
saying what the AI did and what you did, for example:

> **AI disclosure:** AI wrote the plotting code, I chose the data and the projection.

> **AI disclosure:** No AI used.

> **AI disclosure:** I wrote the code; ChatGPT helped me debug a CRS error.

**Day 10 (Prompting only) is the exception by design:** the map is made fully through an AI chat
or CLI. Still write the disclosure line and include the prompts you used (e.g. `prompts.md`).
Whatever the AI produced, *you* are responsible for checking the data and the map are real and correct.

If you use an AI coding agent in this repo, it reads [AGENTS.md](AGENTS.md).

## How to share

- **Pull request to this repo:** commit your `maps/dayNN-<handle>/` folder on your fork and open a PR to
  [TUe-BE-ISBE-Coding-Cafe/30daymapchallenge-2026](https://github.com/TUe-BE-ISBE-Coding-Cafe/30daymapchallenge-2026).
  One folder per map, please don't edit other people's folders.
- **Social media:** post the map with **#30DayMapChallenge** (and the day's theme) on Bluesky, Mastodon,
  LinkedIn, Instagram... Credit your data sources in the post or the image.
- **Optional:** tag **Rbanism** (TU Delft, rbanism@tudelft.nl), who run an R-only edition of the challenge.
  This TU/e repo accepts both R and Python.

## Quick start

All data in `data/` is in **EPSG:4326** (lon/lat). For maps of the Netherlands, reproject to
**EPSG:28992 (Amersfoort / RD New)**, which is in metres.

### R

```bash
Rscript r/install.R              # installs sf + ggplot2 (once)
Rscript r/day01_points.R <you>   # writes maps/day01-<you>/map.png
```

Or open `r/day01_points.R` in RStudio/Positron with the repo as the working directory and run it top to bottom.
On Linux, `sf` needs GDAL/GEOS/PROJ system libraries first (see comments in `r/install.R`).

### Python

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r python/requirements.txt
python python/day01_points.py <you>   # writes maps/day01-<you>/map.png
```

Conda users: `conda install -c conda-forge geopandas matplotlib` works too.

## Data sources

Pre-downloaded in `data/` (see [data/README.md](data/README.md)):

- `eindhoven_cafes.geojson` – cafés (`amenity=cafe`) in the municipality of Eindhoven, points.
- `eindhoven_boundary.geojson` – municipal boundary of Eindhoven, polygon.

Good places for more:

| Source | What | Licence / attribution |
|---|---|---|
| [OpenStreetMap](https://www.openstreetmap.org) via [Overpass Turbo](https://overpass-turbo.eu), R `osmdata`, Python `osmnx` | Anything mapped by volunteers: amenities, roads, buildings, trees... | **ODbL 1.0**. You **must** credit "**© OpenStreetMap contributors**" on the map. Derived databases must stay ODbL. |
| [PDOK](https://www.pdok.nl) | Dutch government geodata: BAG buildings, BGT, BRT/TOP10NL, AHN elevation, aerial photos, admin boundaries | Mostly **CC0** or **CC BY 4.0** – check each dataset; crediting "PDOK / Kadaster" is good practice. |
| [CBS](https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische-data) | Statistics per municipality/district/neighbourhood (wijk- en buurtkaart), 100 m and 500 m grid squares | **CC BY 4.0** – credit "CBS". |
| [Eindhoven open data](https://data.eindhoven.nl) | Municipal datasets: trees, lamp posts, parking, events... | Mostly **CC0** or **CC BY** – check the dataset page. |

Write every source and its licence in your map's README.

## Repository layout

```
.
├── README.md            this file
├── AGENTS.md            instructions for AI coding agents (CLAUDE.md points here)
├── signup.md            who does which day
├── data/                small pre-downloaded Eindhoven data + data/README.md
├── r/                   R starter: install.R, day01_points.R
├── python/              Python starter: requirements.txt, day01_points.py
├── maps/
│   ├── _TEMPLATE/       README template for submissions
│   └── dayNN-<handle>/  one folder per map
└── site/                the showcase website (SvelteKit), built from maps/
```

## Showcase website

The website in `site/` shows what the challenge is, the 30 themes, every map in `maps/`, and
resources. It is rebuilt and published to GitHub Pages
(`.github/workflows/pages.yml`) every time something is merged into `main`, so a new map shows
up a few minutes after its pull request is merged. You never need to edit the site to add a map.

To run it locally (Node 22 or newer; GitHub builds with Node 24):

```bash
cd site
npm install
npm run dev      # collects maps/ and starts http://localhost:5173
```

`scripts/collect-maps.js` reads each `maps/dayNN-<handle>/` folder: the image (`map.png`, or the
first image it finds) and the fields in its `README.md` (name, data sources, tools, CRS, AI
disclosure, what I learned). Texts, themes and resource links live in `site/src/lib/content.js`.

## Licence

Code: [MIT](LICENSE). Data in `data/` is © OpenStreetMap contributors under ODbL 1.0.
Maps in `maps/` remain the work of their authors and carry the licences of the data they use – see [LICENSE](LICENSE).

Organised by the TU/e BE Coding Café.
