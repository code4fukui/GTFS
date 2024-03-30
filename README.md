# GTFS

A ES module for GTFS

## Usage

```js
import { GTFS } from "https://code4fukui.github.io/GTFS/GTFS.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

const url = "./test/gtfs_sabae.zip";
const gtfsbin = await fetchBin(url);
const gtfs = new GTFS(gtfsbin);
console.log(gtfs.getAgencyName());
console.log(gtfs.getRoutes());
```

## lib

- [gtfs2json](https://github.com/taisukef/gtfs-map/)
