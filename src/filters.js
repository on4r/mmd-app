const genresIDtoNameMap_de = {
  12: 'Abenteuer',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Komödie',
  36: 'Historie',
  37: 'Western',
  53: 'Thriller',
  80: 'Krimi',
  99: 'Dokumentarfilm',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Musik',
  10749: 'Liebesfilm',
  10751: 'Familie',
  10752: 'Kriegsfilm',
  10770: 'TV-Film'
}

export function toName(id) {
  return genresIDtoNameMap_de[id]
}

export function toYear(date) {
  return new Date(date).getFullYear()
}
