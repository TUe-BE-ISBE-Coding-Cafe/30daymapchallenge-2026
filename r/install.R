# Install the R packages used in this repo.
# Run once:  Rscript r/install.R
#
# On macOS/Windows CRAN ships binary builds of sf (GDAL/GEOS/PROJ included).
# On Linux you first need the system libraries, e.g. on Ubuntu:
#   sudo apt install libgdal-dev libgeos-dev libproj-dev libudunits2-dev

required <- c("sf", "ggplot2")
optional <- c("tmap", "osmdata", "ggspatial")  # nice to have, not needed for day01

to_install <- setdiff(required, rownames(installed.packages()))
if (length(to_install) > 0) {
  install.packages(to_install, repos = "https://cloud.r-project.org")
}

# Uncomment to install the optional packages as well:
# install.packages(setdiff(optional, rownames(installed.packages())),
#                  repos = "https://cloud.r-project.org")

for (pkg in required) {
  cat(sprintf("%-10s %s\n", pkg, as.character(packageVersion(pkg))))
}
