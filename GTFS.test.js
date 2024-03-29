import * as t from "https://deno.land/std/testing/asserts.ts";
import { GTFS } from "./GTFS.js";

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
Deno.test("geojson", () => {
  const geojson = gtfs.getGeoJSON();
  console.log(geojson);
  //t.assertEquals(routes.length, 9);
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
