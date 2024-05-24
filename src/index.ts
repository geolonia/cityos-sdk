import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Papa from 'papaparse';
import { parseApiKey } from './utils';

import style from './style.json'

declare global {
  interface Window {
      city: any;
  }
}

class TakamatsuMap extends maplibregl.Map {
  constructor(params: any) {
    const defaults = {
      container: 'map',
      style: style,
      center: [134.04654783784918, 34.34283588989655],
      zoom: 12,
      transformRequest: (url: string, resourceType: string) => {
        const apiKey = parseApiKey();

        if (!apiKey) {
          return { url };
        }

        if ((resourceType === 'Tile') && url.startsWith('https://tileserver.geolonia.com')) {
          const updatedUrl = url.replace('YOUR-API-KEY', apiKey);

          return { url: updatedUrl };
        }
        return { url };
      }
    }

    super({...defaults, ...params});
  }

  loadData(className: string, paint: any | undefined | null, layout: any | undefined | null) {
    const paintDefault = {
      'fill-color': '#FF0000',
      'fill-opacity': 0.2
    }

    this.addLayer({
      id: className,
      type: 'fill',
      source: 'takamatsu',
      'source-layer': 'main',
      paint: {...paintDefault, ...paint},
      "filter": [
        "all",
        [
          "==",
          "class",
          className
        ],
      ],
    }, 'poi');
  }

  async loadCSV(url: string) {
    // Fetch the csv from the url
    const res = await fetch(url);
    const csv = await res.text();

    const data = Papa.parse(csv, {header: true}).data

    // Convert the data to geojson use `緯度` as latitude and `経度` as longitude
    const geojson = {
      type: 'FeatureCollection',
      features: data.map((d: any) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [d.経度, d.緯度]
        },
        properties: d
      }))
    }

    this.addSource(url, {
      type: 'geojson',
      data: geojson,
    })

    // Add the geojson as layer to the map
    this.addLayer({
      id: url,
      type: 'circle',
      source: url,
      paint: {
        'circle-radius': 9,
        'circle-color': '#FF0000',
        'circle-opacity': 0.5,
      }
    }, 'poi');

    this.addLayer(    {
      "id": `symbol-${url}`,
      "type": "symbol",
      "source": url,
      "layout": {
        'text-field': "{名称}",
        "text-font": [
          "Noto Sans CJK JP Bold"
        ],
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        'text-radial-offset': 0.5,
        'text-justify': 'auto',
        'text-size': 12,
        'text-anchor': 'top',
        'text-max-width': 12,
        'text-allow-overlap': false,
      },
      "paint": {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    })
  }
}

window.city = {}
window.city.Takamatsu = maplibregl
window.city.Takamatsu.Map = TakamatsuMap
window.city.Takamatsu.Popup = maplibregl.Popup;

