# AGENTS.md – instructions for AI coding agents

This repo is the TU/e BE Coding Café starter for the #30DayMapChallenge 2026 (1–30 Nov).
Participants make one map per themed day in **R or Python** and submit it under `maps/`.
You are helping a participant make *their* map. Keep it simple, honest and reproducible.

## Project layout

```
data/                 pre-downloaded Eindhoven data (GeoJSON, EPSG:4326) + data/README.md (source, licence)
r/                    R starter: install.R (packages), day01_points.R (sf + ggplot2)
python/               Python starter: requirements.txt, day01_points.py (geopandas + matplotlib)
maps/_TEMPLATE/       README template for a submission
maps/dayNN-<handle>/  one folder per map: map.png + code + README.md
signup.md             who does which day (do not edit other people's rows)
README.md             themes, rules, how to share
```

## Rules

1. **Use the data in `data/` first.** Only fetch new data if the map really needs it, and then
   from a real, citable source (OpenStreetMap/Overpass, PDOK, CBS, data.eindhoven.nl).
   Record the source, query/URL, download date and licence in the map's README.
2. **Never invent data.** No made-up coordinates, counts, place names or attribute values,
   not even as "placeholders". If data is missing or a download fails, stop and tell the user.
   Day 10 (Prompting only) is no exception: the AI writes the code, the data must still be real.
3. **Always state the CRS.** Print/check the input CRS after reading. For the Netherlands,
   reproject to **EPSG:28992 (Amersfoort / RD New)** before plotting, measuring or buffering.
   Say which CRS the map uses (e.g. in the caption or README).
4. **Credit sources on the map.** Anything from OpenStreetMap must show
   **"© OpenStreetMap contributors"** (ODbL). Credit PDOK/CBS/Eindhoven as their licence asks.
5. **Save outputs to `maps/<day>-<name>/`**, i.e. `maps/dayNN-<github-handle>/map.png`
   (two-digit day, e.g. `maps/day07-jdoe/`). Put the code and a `README.md` (copied from
   `maps/_TEMPLATE/README.md`) in the same folder. Don't write outputs anywhere else, and don't
   touch other people's folders.
6. **Write the one-line AI disclosure** in that README, stating honestly what you (the AI) did
   and what the participant did, e.g.
   `**AI disclosure:** AI wrote the plotting code, I chose the data and the projection.`
   Day 10 is fully AI by design – say so, and save the prompts (e.g. `prompts.md`).
7. **Keep scripts runnable top to bottom** in a fresh session: load libraries at the top,
   use relative paths from the repo root (or find the root like the day01 scripts do),
   no hidden state, no interactive steps, no absolute paths to someone's laptop.
8. **Stay small.** Prefer packages already used here (R: sf, ggplot2, optionally tmap;
   Python: geopandas, matplotlib). Add new ones to `r/install.R` or `python/requirements.txt`
   only if needed. Don't commit large data (> ~5 MB) – download it in the script instead.
9. Check the result: actually run the script and look at the PNG before saying it's done.

## Running

```bash
Rscript r/day01_points.R <handle>          # R
python python/day01_points.py <handle>     # Python (in a venv with python/requirements.txt)
```
