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
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  top: 2 * 36,
  left: 0,
  padding: '10px'
};

export const sideBarControlStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
}

export const testData = [
  {
    "coordinates": {
      "latitude": 38.616667,
      "longitude": -90.2,
      "point": [
        38.616667,
        -90.2
      ]
    },
    "label": "St. Louis, MO",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Stlouis_wikivoyage_banner.jpg/800px-Stlouis_wikivoyage_banner.jpg",
    "description": "City in Missouri, and Home of the Blues.",
    "details": [
      {
        "label": "In Downtown St. Louis",
        "description": "One of the main landmarks of the Midwest",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b9/St_Louis_Gateway_Arch.jpg",
        "title": "The Gateway Arch"
      },
      {
        "label": "Throughout the City and County",
        "description": "Holy Grail of St. Louis-Style thin crust Pizza since 1964",
        "image": "http://web.archive.org/web/20191015045214im_/https://www.imospizza.com/Portals/0/DynamicForms_Exports/Images/logo-imos.png?ver=2016-04-20-174200-000",
        "title": "Imo's Pizza"
      },
    ]
  },
  {
    "coordinates": {
      "latitude": 35.226944,
      "longitude": -80.843333,
      "point": [
        35.226944,
        -80.843333,
      ]
    },
    "label": "Charlotte, NC",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Skyline_of_Charlotte%2C_North_Carolina_%28fall_2007%29.jpg",
    "description": "City in North Carolina",
    "details": [
      {
        "label": "Uptown Charlotte",
        "description": "This colorful staple in Uptown Charlotte unifies the cirty with its LED colors seen across the skyline at night",
        "image": "https://upload.wikimedia.org/wikipedia/commons/5/54/Duke_Energy_Center_cropped.jpg",
        "title": "Duke Energy Building"
      },
      {
        "label": "Throughout the South",
        "description": "While founded in Greensboro, this chain is unofficially the In-n-Out of the South.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cook_Out_restaurant%2C_Watson_Blvd%2C_Warner_Robins.jpg/220px-Cook_Out_restaurant%2C_Watson_Blvd%2C_Warner_Robins.jpg",
        "title": "Cook Out"
      },
    ]
  },
  {
    "coordinates": {
      "latitude": 41.308333,
      "longitude": -72.925,
      "point": [
        41.308333,
        -72.925
      ]
    },
    "label": "New Haven, CT",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/NewHavenCT_Green.jpg",
    "description": "City in Connecticut",
    "details": [
      {
        "label": "Downtown New Haven",
        "description": "This library system holds some of the nation's most revered collections.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/65/Sterling_Memorial_Library_-_Yale_University.jpg",
        "title": "Yale University Library"
      },
      {
        "label": "Wooster Square",
        "description": "Legend has it that this was the birthplace of American Pizza",
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Whiteclampie.jpg",
        "title": "Frank Pepe's Pizzeria"
      },
    ]
  },
  {
    "coordinates": {
      "latitude": 37.8,
      "longitude": -122.25,
      "point": [
        37.8,
        -122.25,
      ]
    },
    "label": "Oakland, CA",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Oakland_California_skyline.jpg",
    "description": "City in the East Bay, California",
    "details": [
      {
        "label": "Downtown Oakland",
        "description": "This performance venue has been graced with some of the most renowned musicians and performers",
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Paramount_Oakland_571434cu.jpg",
        "title": "Paramount Theatre"
      },
      {
        "label": "Throughout the West Coast",
        "description": "Founded in SoCal, adored all over the West Coast.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/In-N-Out_Treats.jpg/800px-In-N-Out_Treats.jpg",
        "title": "IN-N-OUT Burger"
      },
    ]
  },
]
