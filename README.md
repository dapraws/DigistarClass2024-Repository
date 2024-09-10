# Routing & Restful API

![Day 3 - RestFul API](https://github.com/user-attachments/assets/617fa1bb-5ff7-4bf9-b742-e03a6f6031cb)

Di sesi ini, kita belajar tentang **Routing** dan **Restful API**, dua konsep penting dalam pengembangan aplikasi web. Kita akan membahas cara menangani permintaan HTTP dan membangun API endpoint dengan berbagai metode HTTP seperti **GET**, **POST**, **PUT**, dan **DELETE**.

## Konsep Dasar Routing
**Routing** adalah proses menentukan **rute** (path) yang harus diikuti oleh aplikasi ketika menerima permintaan HTTP dari client. Dengan routing, kita bisa mengatur bagaimana server merespons permintaan ke berbagai URL.

## Cara Kerja Routing
Saat server menerima permintaan dari client, server akan mengecek **path** URL yang diminta dan memutuskan bagaimana meresponsnya. Contohnya, ketika ada request ke `/home`, server akan memberikan halaman utama, sementara request ke `/about` akan memberikan halaman tentang.

Contoh routing sederhana di **Express.js**:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Selamat Datang');
});

app.get('/greet', (req, res) => {
  res.send('Hai Darrel!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Route Parameters
**Route Parameters** digunakan untuk menangani permintaan dinamis, di mana bagian dari URL bisa berubah. Misalnya, jika kita ingin menangani permintaan untuk detail produk berdasarkan ID produk, kita bisa menggunakan parameter seperti ini:

```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Product ID: ${userId}`);
});
```

Pada contoh di atas, `:id` adalah route parameter yang bisa menangkap nilai dinamis dari URL, misalnya `/product/123` akan mengembalikan `Product ID: 123`.

## Query Parameters
**Query Parameters** adalah bagian dari URL yang dimulai setelah tanda `?` dan biasanya digunakan untuk mengirimkan data tambahan dalam permintaan. Contohnya, jika kita ingin mencari produk berdasarkan nama dan kategori:

```javascript
app.get('/search', (req, res) => {
  const { name, category } = req.query;
  res.send(`Searching for ${name} in category ${category}`);
});
```

URL seperti `/search?name=phone&category=electronics` akan menangkap query parameters `name` dan `category`.

## Membuat API Endpoint
Untuk membangun **Restful API**, kita perlu membuat beberapa **API endpoint** yang bisa menangani berbagai metode HTTP. Setiap endpoint akan melakukan operasi berbeda berdasarkan metode yang digunakan:

- **GET**: Mengambil data.
- **POST**: Menambahkan data baru.
- **PUT**: Mengupdate data yang ada.
- **DELETE**: Menghapus data.

Contoh endpoint API di **Express.js**:

```javascript
app.get('/users', (req, res) => {
  res.send('Get all users');
});

app.post('/users', (req, res) => {
  res.send('Create a new user');
});

app.put('/users/:id', (req, res) => {
  res.send(`Update user with ID: ${req.params.id}`);
});

app.delete('/users/:id', (req, res) => {
  res.send(`Delete user with ID: ${req.params.id}`);
});
```
