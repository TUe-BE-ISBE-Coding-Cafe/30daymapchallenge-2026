"""Day 01 - Points: cafés in the municipality of Eindhoven.

#30DayMapChallenge 2026 - TU/e BE Coding Café

Run (from anywhere): python python/day01_points.py [your-github-handle]
Output:              maps/day01-<handle>/map.png

Data: © OpenStreetMap contributors (ODbL), pre-downloaded in data/ (see data/README.md)
"""
import sys
from pathlib import Path

import geopandas as gpd
import matplotlib

matplotlib.use("Agg")  # no window needed, just write the PNG
import matplotlib.pyplot as plt

# ---- 1. Settings -----------------------------------------------------------
handle = sys.argv[1] if len(sys.argv) > 1 else "example"  # change to your GitHub handle
# Walk up until data/ is found, so the script also works when copied into maps/dayNN-<handle>/
here = Path(__file__).resolve().parent
repo_root = next(
    (p for p in [here, *here.parents] if (p / "data" / "eindhoven_cafes.geojson").exists()), None
)
if repo_root is None:
    sys.exit("Could not find data/eindhoven_cafes.geojson - run from inside the repo.")
out_dir = repo_root / "maps" / f"day01-{handle}"
out_dir.mkdir(parents=True, exist_ok=True)

# ---- 2. Read data (both files are EPSG:4326, WGS84 lon/lat) ----------------
cafes = gpd.read_file(repo_root / "data" / "eindhoven_cafes.geojson")
boundary = gpd.read_file(repo_root / "data" / "eindhoven_boundary.geojson")
print("Input CRS:", cafes.crs)

# ---- 3. Project to EPSG:28992 (Amersfoort / RD New, metres) ----------------
cafes = cafes.to_crs(epsg=28992)
boundary = boundary.to_crs(epsg=28992)
print("Projected CRS:", cafes.crs)

# ---- 4. Plot ---------------------------------------------------------------
fig, ax = plt.subplots(figsize=(7, 7))
boundary.plot(ax=ax, facecolor="0.95", edgecolor="0.25", linewidth=0.6)
cafes.plot(ax=ax, color="#c8102e", markersize=10, alpha=0.8)
ax.set_axis_off()
ax.set_aspect("equal")

ax.text(0, 1.07, "Cafés in Eindhoven", transform=ax.transAxes,
        fontsize=16, fontweight="bold", ha="left", va="bottom")
ax.text(0, 1.02, f"{len(cafes)} places tagged amenity=cafe  |  #30DayMapChallenge Day 1: Points",
        transform=ax.transAxes, fontsize=10, ha="left", va="bottom")
ax.text(0, -0.02,
        "Data: © OpenStreetMap contributors (ODbL), downloaded 2026-10-21  |  CRS: EPSG:28992 (RD New)",
        transform=ax.transAxes, fontsize=7, color="0.4", ha="left", va="top")

# ---- 5. Save ---------------------------------------------------------------
out_file = out_dir / "map.png"
fig.savefig(out_file, dpi=200, bbox_inches="tight", facecolor="white")
print("Saved", out_file)
