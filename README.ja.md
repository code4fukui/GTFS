# GTFS

GTFS (General Transit Feed Specification) オープンデータを扱うためのJavaScriptモジュールです。

## 使い方

```js
import { GTFS } from "https://code4fukui.github.io/GTFS/GTFS.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

const url = "./test/gtfs_sabae.zip";
const gtfsbin = await fetchBin(url);
const gtfs = new GTFS(gtfsbin);
console.log(gtfs.getAgencyName());
console.log(gtfs.getRoutes());
```

## ライブラリ

- [gtfs2json](https://github.com/taisukef/gtfs-map/)

## ライセンス

MIT License
