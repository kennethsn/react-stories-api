export const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export const mapStyle = {
"version": 8,
"name": "OSM",
"metadata": {

},
"sources": {
  "osm": {
    "type": "raster",
    "tiles": [
      "http://tile.openstreetmap.org/{z}/{x}/{y}.png"
    ],
    "minzoom": 0,
    "maxzoom": 14,
    attribution:
      'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
  }
},
"sprite": "https://openmaptiles.github.io/klokantech-basic-gl-style/sprite",
"glyphs": "https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=undefined",
"layers": [
  {
    "id": "osm",
    "type": "raster",
    "source": "osm"
  }
],
"id": "klokantech-basic"
}


export const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};



export const testData = [
  {
"coordinates": {
"latitude": 41.686866666,
"longitude": -73.895188888,
"point": [
41.686866666,
-73.895188888
]
},
"label": "Vassar College",
"details": [
{
"label": "Vassar College",
"id": "Q2093794",
"instance": {
"label": "private not-for-profit educational institution",
"id": "Q23002054"
},
"description": "private, coeducational liberal arts college in Poughkeepsie, New York, in the United States",
"image": "http://commons.wikimedia.org/wiki/Special:FilePath/Vassar%20College%20ca%201862.jpg",
"website": "http://www.vassar.edu",
"logo": "http://commons.wikimedia.org/wiki/Special:FilePath/Vassar%20College%20logotype.png",
"qualifiers": {
"P580": {
"label": "start time",
"id": "P580",
"datatype": "Time",
"values": {
"1931-01-01T00:00:00Z": {
"label": {
"label": "1931",
"year": 1931
},
"id": ""
}
}
},
"P582": {
"label": "end time",
"id": "P582",
"datatype": "Time",
"values": {
"1943-01-01T00:00:00Z": {
"label": {
"label": "1943",
"year": 1943
},
"id": ""
}
}
}
},
"title": "Employer: Vassar College"
},
{
"label": "Vassar College",
"id": "Q2093794",
"instance": {
"label": "private not-for-profit educational institution",
"id": "Q23002054"
},
"description": "private, coeducational liberal arts college in Poughkeepsie, New York, in the United States",
"image": "http://commons.wikimedia.org/wiki/Special:FilePath/Vassar%20College%20ca%201862.jpg",
"website": "http://www.vassar.edu",
"logo": "http://commons.wikimedia.org/wiki/Special:FilePath/Vassar%20College%20logotype.png",
"references": {
"P478": {
"property": {
"label": "http://www.wikidata.org/prop/reference/P478",
"id": "P478"
},
"value": {
"label": "1",
"id": ""
}
},
"P304": {
"property": {
"label": "http://www.wikidata.org/prop/reference/P304",
"id": "P304"
},
"value": {
"label": "616-617",
"id": ""
}
},
"P248": {
"property": {
"label": "http://www.wikidata.org/prop/reference/P248",
"id": "P248"
},
"value": {
"label": "The Biographical Dictionary of Women in Science",
"id": "Q28721132",
"description": "A two-volume bio/bibliographical resource covering approximately 2500 women scientists"
}
}
},
"qualifiers": {
"P580": {
"label": "start time",
"id": "P580",
"datatype": "Time",
"values": {
"1924-01-01T00:00:00Z": {
"label": {
"label": "1924",
"year": 1924
},
"id": ""
}
}
},
"P582": {
"label": "end time",
"id": "P582",
"datatype": "Time",
"values": {
"1928-01-01T00:00:00Z": {
"label": {
"label": "1928",
"year": 1928
},
"id": ""
}
}
},
"P512": {
"label": "academic degree",
"id": "P512",
"datatype": "WikibaseItem",
"values": {
"bachelor's degree": {
"label": "bachelor's degree",
"id": "Q163727",
"description": "undergraduate academic degree lasting from three to seven years"
}
}
},
"P812": {
"label": "academic major",
"id": "P812",
"datatype": "WikibaseItem",
"values": {
"mathematics": {
"label": "mathematics",
"id": "Q395",
"description": "science of the structure of abstract objects such as numbers, spaces, functions and relations"
},
"physics": {
"label": "physics",
"id": "Q413",
"description": "study of matter and its motion, along with related concepts such as energy and force"
}
}
}
},
"title": "Educated At: Vassar College"
}
]
},
{
"coordinates": {
"latitude": 39.953885,
"longitude": -75.193048,
"point": [
39.953885,
-75.193048
]
},
"label": "University of Pennsylvania",
"details": [
{
"label": "University of Pennsylvania",
"id": "Q49117",
"instance": {
"label": "private not-for-profit educational institution",
"id": "Q23002054"
},
"description": "private research university in Philadelphia, Pennsylvania",
"image": "http://commons.wikimedia.org/wiki/Special:FilePath/Penn%20campus%202.jpg",
"website": "http://www.upenn.edu",
"logo": "http://commons.wikimedia.org/wiki/Special:FilePath/UPenn%20shield%20with%20banner.svg",
"title": "Employer: University of Pennsylvania"
}
]
},
{
"coordinates": {
"latitude": 42.904722222,
"longitude": -78.849444444,
"point": [
42.904722222,
-78.849444444
]
},
"image": "http://commons.wikimedia.org/wiki/Special:FilePath/BuffaloMontage1.jpg",
"label": "Buffalo",
"description": "county seat city in Erie County, New York, USA",
"id": "Q40435",
"details": [
{
"label": "Remington Rand",
"id": "Q1372129",
"instance": {
"label": "business",
"id": "Q4830453"
},
"description": "American manufacturer",
"image": "http://commons.wikimedia.org/wiki/Special:FilePath/Remington%20typewriter%201907%20%2802%29.jpg",
"title": "Employer: Remington Rand"
}
]
},
]
