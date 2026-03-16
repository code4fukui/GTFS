# GTFS

GTFS (General Transit Feed Specification)形式のオープンデータを扱うためのJavaScriptモジュールです。GTFS形式のデータ解析、バス停情報の取得、ルート情報の取得、時刻表の取得、地図上へのルート描画などの機能を提供します。

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

## ライセンス

MIT License