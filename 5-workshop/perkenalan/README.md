# Package Perkenalan

Package ini menyediakan fungsi sederhana untuk memperkenalkan diri dengan nama, asal, dan hobi. Fungsi ini akan menghasilkan string perkenalan.

## Instalasi

Anda dapat menginstal paket ini melalui npm:

```bash
npm install perkenalan
```

## Penggunaan

Berikut adalah cara menggunakan fungsi `perkenalan`:

```javascript
const perkenalan = require("perkenalan");

const nama = "Darrel";
const asal = "Jakarta";
const hobi = "coding";

const kenalkan = perkenalan(nama, asal, hobi);
console.log(kenalkan);
// Output: Halo, namaku Darrel dari Jakarta, dan hobiku coding. Salam kenal!
```

## Parameter

- `nama` (string): Nama Anda.
- `asal` (string): Tempat asal Anda.
- `hobi` (string): Hobi Anda.

## Nilai Kembali

Fungsi ini akan mengembalikan string dengan format:

```
Halo, namaku {nama} dari {asal}, dan hobiku {hobi}. Salam kenal!
```
