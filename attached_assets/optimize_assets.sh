#!/usr/bin/env bash
set -euo pipefail

DIR="$(pwd)"
echo "🔄 Otimizando arquivos em $DIR"

for path in *; do
  [[ -f "$path" ]] || continue             # só arquivos normais
  [[ "$path" == ori_* ]] && continue       # ignora se já é backup

  name="${path%.*}"
  ext_lc="$(tr 'A-Z' 'a-z' <<< "${path##*.}")"
  ori="ori_${path}"

  echo " ▶️  $path → $ori + otimizado"
  mv "$path" "$ori"                        # mantém backup

  case "$ext_lc" in
    jpg|jpeg)
      ffmpeg -hide_banner -loglevel error -i "$ori" \
             -vf "scale='if(gt(iw,1920),1920,iw)':-2" \
             -map_metadata -1 -q:v 3 "$path"
      ;;
    png)
      pngquant --quality=70-90 --strip --skip-if-larger \
               --output "${name}-tmp.png" "$ori" && \
      mv "${name}-tmp.png" "$path" || mv "$ori" "$path"
      ;;
    mp4)
      ffmpeg -hide_banner -loglevel error -i "$ori" \
             -vf "scale='if(gt(iw,1920),1920,iw)':-2" \
             -c:v libx264 -crf 28 -preset veryslow \
             -c:a aac -b:a 128k "$path"
      ;;
    *)
      echo "   ⚠️  Tipo não suportado; mantendo original"
      mv "$ori" "$path"
      ;;
  esac
done

echo "✅  Feito! Originais agora são ori_*"
