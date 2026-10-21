# Day 01 - Points: cafés in the municipality of Eindhoven
# #30DayMapChallenge 2026 - TU/e BE Coding Café
#
# Run from the repo root:   Rscript r/day01_points.R [your-github-handle]
# Output:                   maps/day01-<handle>/map.png
#
# Data: © OpenStreetMap contributors (ODbL), pre-downloaded in data/ (see data/README.md)

library(sf)
library(ggplot2)

# ---- 1. Settings ------------------------------------------------------------
args   <- commandArgs(trailingOnly = TRUE)
handle <- if (length(args) >= 1) args[1] else "example"   # change to your GitHub handle

# Find the repo root: walk up from the script (or the working directory) until data/ is found.
# This keeps the script working when you copy it into maps/dayNN-<handle>/.
file_arg  <- grep("^--file=", commandArgs(trailingOnly = FALSE), value = TRUE)
start_dir <- if (length(file_arg) == 1) dirname(normalizePath(sub("^--file=", "", file_arg))) else getwd()
repo_root <- start_dir
while (!file.exists(file.path(repo_root, "data", "eindhoven_cafes.geojson"))) {
  parent <- dirname(repo_root)
  if (parent == repo_root) stop("Could not find data/eindhoven_cafes.geojson - run from inside the repo.")
  repo_root <- parent
}

out_dir <- file.path(repo_root, "maps", paste0("day01-", handle))
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

# ---- 2. Read data (both files are EPSG:4326, WGS84 lon/lat) ----------------
cafes    <- st_read(file.path(repo_root, "data", "eindhoven_cafes.geojson"),    quiet = TRUE)
boundary <- st_read(file.path(repo_root, "data", "eindhoven_boundary.geojson"), quiet = TRUE)
cat("Input CRS:", st_crs(cafes)$input, "\n")

# ---- 3. Project to EPSG:28992 (Amersfoort / RD New, metres) -----------------
cafes    <- st_transform(cafes, 28992)
boundary <- st_transform(boundary, 28992)
cat("Projected CRS:", st_crs(cafes)$input, "\n")

# ---- 4. Plot ----------------------------------------------------------------
p <- ggplot() +
  geom_sf(data = boundary, fill = "grey95", colour = "grey40", linewidth = 0.4) +
  geom_sf(data = cafes, colour = "#c8102e", size = 1.8, alpha = 0.8) +
  coord_sf(crs = st_crs(28992), datum = NA) +
  labs(
    title    = "Caf\u00e9s in Eindhoven",   # \u escapes keep accents safe in any locale
    subtitle = paste0(nrow(cafes), " places tagged amenity=cafe  |  #30DayMapChallenge Day 1: Points"),
    caption  = "Data: \u00a9 OpenStreetMap contributors (ODbL), downloaded 2026-10-21  |  CRS: EPSG:28992 (RD New)"
  ) +
  theme_void(base_size = 11) +
  theme(
    plot.title      = element_text(face = "bold", size = 16),
    plot.caption    = element_text(colour = "grey40", size = 7, hjust = 0),
    plot.background = element_rect(fill = "white", colour = NA),
    plot.margin     = margin(10, 10, 10, 10)
  )

# ---- 5. Save ----------------------------------------------------------------
out_file <- file.path(out_dir, "map.png")
ggsave(out_file, p, width = 7, height = 7, dpi = 200, bg = "white")
cat("Saved", out_file, "\n")
