import { gtfs2json } from "https://taisukef.github.io/gtfs-map/gtfs2json.js";

export class GTFS {
  constructor(gtfszipbin) {
    const gtfs = this.gtfs = gtfs2json(gtfszipbin);
    
    for (const r of gtfs.routes) {
      r.trips = gtfs.trips.filter(i => i.route_id == r.route_id);
    }
    for (const t of gtfs.trips) {
      t.shapes = gtfs.shapes.filter(i => i.shape_id == t.shape_id);
      t.stop_times = gtfs.stop_times.filter(i => i.trip_id == t.trip_id);
    }
    for (const s of gtfs.stop_times) {
      s.stop = gtfs.stops.find(i => i.stop_id == s.stop_id);
    }
  }
  getAgencyName() {
    return this.gtfs.agency[0]?.agency_name;
  }
  getStops() {
    return this.gtfs.stops;
  }
  getRoutes() {
    return this.gtfs.routes;
  }
  getGeoJSONTrip(trip) {
    return {
      type: "LineString",
      coordinates: trip.shapes.map(i => [i.shape_pt_lon, i.shape_pt_lat]),
    };
  }
  getGeoJSONRoute(route) {
    return {
      type: "FeatureCollection",
      features: route.trips.map(i => this.getGeoJSONTrip(i)),
    };
  }
  getGeoJSON() {
    return {
      type: "FeatureCollection",
      features: this.gtfs.routes.map(i => this.getGeoJSONRoute(i)),
    };
  }
};
