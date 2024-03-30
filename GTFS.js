import { gtfs2json } from "https://taisukef.github.io/gtfs-map/gtfs2json.js";
import { Time } from "https://js.sabae.cc/DateTime.js";

export class GTFS {
  constructor(gtfszipbin) {
    const gtfs = this.gtfs = gtfs2json(gtfszipbin);
    
    for (const r of gtfs.routes) {
      r.trips = gtfs.trips.filter(i => i.route_id == r.route_id);
      for (const t of r.trips) {
        t.route = r;
      }
    }
    for (const t of gtfs.trips) {
      if (gtfs.shapes) {
        t.shapes = gtfs.shapes.filter(i => i.shape_id == t.shape_id);
      }
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
    if (trip.shapes) {
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: trip.shapes.map(i => [i.shape_pt_lon, i.shape_pt_lat]),
        },
      };
    } else {
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: trip.stop_times.map(i => [i.stop.stop_lon, i.stop.stop_lat]),
        },
      };
    }
  }
  getGeoJSONRoute(route) {
    return {
      type: "FeatureCollection",
      features: route.trips.map(i => this.getGeoJSONTrip(i)),
    };
  }
  /*
  getGeoJSON() {
    return {
      type: "FeatureCollection",
      features: this.gtfs.routes.map(i => this.getGeoJSONRoute(i)),
    };
  }
  */
  getTimetable() {
    const list = [];
    this.gtfs.routes.forEach(route => {
      for (const trip of route.trips) {
        const d = {
          ID: route.route_long_name + " " + trip.trip_short_name + " " + trip.trip_headsign,
        };
        for (const stopt of trip.stop_times) {
          const stopname = stopt.stop.stop_name;
          d[stopname + "_着"] = stopt.arrival_time;
          d[stopname + "_発"] = stopt.departure_time;
        }
        list.push(d);
      }
    });
    return list;
  }
  getTrips(fromstop, tostop) { // must be same trip
    const list = [];
    if (fromstop == tostop) return list;
    for (const route of this.gtfs.routes) {
      for (const trip of route.trips) {
        const nfrom = trip.stop_times.findIndex(i => i.stop.stop_name == fromstop);
        if (nfrom < 0) continue;
        const nto = trip.stop_times.findIndex(i => i.stop.stop_name == tostop);
        if (nto < nfrom) continue;
        list.push(trip);
      }
    }
    return list;
  }
  getTripTimes(fromstop, tostop) {
    return this.getTrips(fromstop, tostop).map(trip => {
      const fromt = trip.stop_times.find(i => i.stop.stop_name == fromstop).departure_time;
      const tot = trip.stop_times.find(i => i.stop.stop_name == tostop).arrival_time;
      return { from: fromt, to: tot };
    });
  }
  getNextTripTimes(fromstop, tostop, maxlen = 3, nowm) {
    const trs = this.getTripTimes(fromstop, tostop);
    const now = (nowm || new Time()).quantizeMinutes().toMinutes();
    const res = trs.filter(trip => {
      const fromt = new Time(trip.from);
      const d = now - fromt.toMinutes();
      return d <= 0;
    });
    if (res.length > maxlen) res.length = maxlen;
    return res;
  }
};
