import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

declare global {
  interface Window {
      city: any;
  }
}

class TakamatsuMap extends maplibregl.Map {
  constructor(params: any) {
    const defaults = {
      container: 'map',
      style: 'https://geoloniamaps.github.io/gsi/style.json',
      center: [134.04654783784918, 34.34283588989655],
      zoom: 12
    }

    super({...defaults, ...params});
  }
}

window.city = {}
window.city.Takamatsu = maplibregl
window.city.Takamatsu.Map = TakamatsuMap
