# HTTP Server

![Day 2 - HTTP Server](https://github.com/user-attachments/assets/7494c0ee-a455-4682-ba46-9d6a48040a7a)

Di sesi pembelajaran ini, kita akan bahas **HTTP Server** dan cara membuatnya menggunakan **Node.js**.

## Apa itu HTTP Server?
HTTP Server adalah server yang berfungsi untuk **menerima** dan **memproses** permintaan dari **client** (browser) melalui protokol HTTP. HTTP Server adalah komponen penting dalam pengembangan web karena memungkinkan komunikasi antara client dan server.

## Peran dan Fungsi HTTP Server
- **Menerima HTTP Request**: Server menerima permintaan dari client seperti GET, POST, PUT, DELETE, dll.
- **Mengolah Data**: Server dapat memproses data yang dikirim oleh client (misalnya dari form).
- **Mengirim Response**: Setelah memproses request, server mengirimkan respons seperti halaman HTML, data JSON, atau file lainnya.

## Metode HTTP Request
- **GET**: Meminta data dari server.
- **POST**: Mengirim data ke server.
- **PUT**: Mengupdate data di server.
- **DELETE**: Menghapus data dari server.

## Parsing URL dan Headers
Ketika client mengirim request, URL dan headers juga dikirim ke server. Kita bisa **parsing URL** untuk mengambil informasi penting, seperti path atau query parameters, dan **memproses headers** untuk melihat informasi tambahan seperti jenis konten yang dikirim.

## Cara Kerja HTTP Server di Node.js
Dengan **Node.js**, kita bisa membuat server HTTP sederhana dengan menggunakan modul `http`. Berikut contoh singkat cara membuat HTTP server:

```
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

Server di atas akan menampilkan **"Hello, World!"** setiap kali ada request ke `localhost:3000`.

## Routing
Routing adalah proses menentukan apa yang harus dilakukan server ketika menerima request ke path tertentu. Misalnya:

```
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Selamat Datang</h1>');
  } else if (req.url === '/greet') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Halo Darrel</h1>');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page Not Found</h1>');
  }
});
```

## Respon Status
Setiap kali server merespons request, server akan mengirim **status code** seperti:
- **200**: OK (Berhasil).
- **404**: Not Found (Halaman tidak ditemukan).
- **500**: Internal Server Error (Kesalahan di server).
