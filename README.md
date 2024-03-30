# GTFS

A ES module for GTFS

## Usage

```js
import { GTFS } from "https://code4fukui.github.io/GTFS/GTFS.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

const gtfsbin = await fetchBin(url_gtfs);
const gtfs = new GTFS(gtfsbin);
console.log(gtfs.getAgencyName());
console.log(gtfs.getRoutes());
```


## lib

- [GTFS](https://github.com/taisukef/gtfs-map/)
