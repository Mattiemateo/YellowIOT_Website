#!/bin/bash
# Gebruik: style.sh <uitgeknipt.png> <uitvoer-prefix>  ->  <prefix>-color.webp, -duo.webp, -schem.webp
# Meestal via tools/process-photos.sh aangeroepen.
set -e
I=$1; O=$2; T=$(mktemp -d)
magick "$I" -trim +repage -bordercolor none -border 40 $T/c.png
magick $T/c.png -alpha extract -threshold 50% $T/m.png
magick $T/m.png -morphology dilate square:4 $T/ol.png
# block shadows like the logo extrusion
mk_layer(){ magick -size $(magick identify -format %wx%h $T/m.png) xc:"$1" \( $2 -alpha off \) -compose copyopacity -composite $3; }
mk_layer '#6E2B1F' "$T/ol.png -roll +16+16" $T/sh2.png
mk_layer '#14A58B' "$T/ol.png -roll +8+8" $T/sh1.png
mk_layer '#FFD21F' "$T/ol.png" $T/olc.png
magick $T/sh2.png $T/sh1.png -compose over -composite $T/olc.png -compose over -composite $T/frame.png
# color
magick $T/c.png -modulate 100,85 \( $T/m.png -alpha off \) -compose copyopacity -composite $T/col.png
magick $T/frame.png $T/col.png -compose over -composite -quality 78 -define webp:alpha-quality=60 ${O}-color.webp
# duotone
magick $T/c.png -alpha off -colorspace gray -auto-level -sigmoidal-contrast 4x45% \( -size 1x128 gradient:'#0B0B0C-#14A58B' -size 1x128 gradient:'#14A58B-#FFE680' -append \) -clut \( $T/m.png -alpha off \) -compose copyopacity -composite $T/duo.png
magick $T/frame.png $T/duo.png -compose over -composite -quality 78 -define webp:alpha-quality=60 ${O}-duo.webp
# schematic: bright yellow edges + faint teal body + paper silhouette
magick $T/c.png -background '#0B0B0C' -alpha remove -colorspace gray -blur 0x1.1 -canny 0x1+5%+15% -morphology dilate disk:1 $T/e.png
magick $T/e.png $T/m.png -compose multiply -composite $T/e2.png
magick $T/m.png -morphology edgeout square:3 $T/sil.png
mk_layer '#0F3D35' "$T/m.png" $T/body.png
mk_layer '#FFD21F' "$T/e2.png" $T/lines.png
mk_layer '#EEEAE0' "$T/sil.png" $T/silc.png
magick $T/body.png $T/lines.png -compose over -composite $T/silc.png -compose over -composite -quality 80 -define webp:alpha-quality=60 ${O}-schem.webp
rm -rf $T
