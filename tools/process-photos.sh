#!/bin/bash
# Zet robotfoto's (HEIC/JPG) om naar de gestileerde afbeeldingen van de site.
#
#   tools/process-photos.sh 2026-season/intake.HEIC [naam]
#
# Maakt src/assets/robot/<naam>-color.webp, -duo.webp en -schem.webp.
# Nodig: macOS (Vision-framework voor het uitknippen), ImageMagick (brew install imagemagick).
set -euo pipefail
cd "$(dirname "$0")/.."

IN=$1
NAME=${2:-$(basename "${IN%.*}")}
T=$(mktemp -d)
trap 'rm -rf "$T"' EXIT

# 1. Compileer het uitknip-hulpje één keer.
[ -x tools/.bin/cutout ] || { mkdir -p tools/.bin && swiftc -O tools/cutout.swift -o tools/.bin/cutout; }

# 2. Goed draaien (EXIF) en verkleinen.
magick "$IN" -auto-orient -strip -resize '1400x1400>' "$T/src.png"

# 3. Achtergrond weghalen met Apple Vision.
tools/.bin/cutout "$T/src.png" "$T/cut.png"

# 4. Stijlvarianten met het geel/teal/roest-kader van het logo.
tools/style.sh "$T/cut.png" "src/assets/robot/$NAME"
ls -la src/assets/robot/"$NAME"-*.webp
