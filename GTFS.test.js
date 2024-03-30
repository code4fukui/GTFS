import * as t from "https://deno.land/std/testing/asserts.ts";
import { GTFS } from "./GTFS.js";
import { Time } from "https://js.sabae.cc/DateTime.js";

const gtfs = new GTFS(await Deno.readFile("test/gtfs_sabae.zip"));

Deno.test("agency name", () => {
  t.assertEquals(gtfs.getAgencyName(), "tutujibus");
});
Deno.test("stops", () => {
  const stops = gtfs.getStops();
  t.assertEquals(stops.length, 293);
  t.assertEquals(stops[0], {
    location_type: "0",
    parent_station: "",
    stop_code: "",
    stop_desc: "福井鉄道神明駅",
    stop_id: "1",
    stop_lat: "35.972846",
    stop_lon: "136.181591",
    stop_name: "神明駅",
    wheelchair_boarding: "",
    zone_id: "",
  });
});
Deno.test("stops", () => {
  const stops = gtfs.getStopNames();
  t.assertEquals(stops.length, 217);
  //console.log(stops);
});
Deno.test("routes", () => {
  const routes = gtfs.getRoutes();
  t.assertEquals(routes.length, 9);
  /*
  t.assertEquals(routes[0], {
    agency_id: "1",
    route_color: "e65100",
    route_desc: "",
    route_id: "1",
    route_long_name: "循環線",
    route_short_name: "",
    route_text_color: "ffffff",
    route_type: "3",
  });
  */
});
Deno.test("timetable", () => {
  const tt = gtfs.getTimetable();
  //t.assertEquals(tt);
  /*
  t.assertEquals(routes[0], {
    agency_id: "1",
    route_color: "e65100",
    route_desc: "",
    route_id: "1",
    route_long_name: "循環線",
    route_short_name: "",
    route_text_color: "ffffff",
    route_type: "3",
  });
  */
});
Deno.test("getTrips", () => {
  const fromst = "JR鯖江駅（１番のりば）";
  const tost = "福井高専";
  const trips = gtfs.getTrips(fromst, tost);
  t.assertEquals(trips.length, 6);
  for (const trip of trips) {
    const fromt = trip.stop_times.find(i => i.stop.stop_name == fromst).departure_time;
    const tot = trip.stop_times.find(i => i.stop.stop_name == tost).arrival_time;
    //console.log(fromt, tot);
  }
});
Deno.test("getTripTimes", () => {
  const fromst = "JR鯖江駅（１番のりば）";
  const tost = "福井高専";
  const ttimes = gtfs.getTripTimes(fromst, tost);
  t.assertEquals(ttimes.length, 6);
  const chk = [
    {
      from: "7:00:00",
      to: "7:12:00",
    },
    {
      from: "8:15:00",
      to: "8:27:00",
    },
    {
      from: "10:05:00",
      to: "10:17:00",
    },
    {
      from: "12:00:00",
      to: "12:35:00",
    },
    {
      from: "15:00:00",
      to: "15:35:00",
    },
    {
      from: "17:05:00",
      to: "17:40:00",
    },
  ];
  t.assertEquals(ttimes, chk);
});
Deno.test("getNextTripTimes", () => {
  const fromst = "JR鯖江駅（１番のりば）";
  const tost = "福井高専";
  const ttimes = gtfs.getNextTripTimes(fromst, tost, 3, new Time("22:13"));
  //console.log(ttimes);
  t.assertEquals(ttimes.length, 3);
  const ttimes2 = gtfs.getNextTripTimes(fromst, tost, 10, new Time("07:01"));
  t.assertEquals(ttimes2.length, 6);
});
