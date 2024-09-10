# JSON Web Token (JWT)

![Day 5 - JSON Web Token](https://github.com/user-attachments/assets/09a35edd-694d-40a9-b174-e99602cda4b0)

Di learning session ini, kita mempelajari **JSON Web Token (JWT)**, konsep dasar tentang bagaimana JWT digunakan dalam **autentikasi** dan **pertukaran informasi** antara client dan server. Kita membahas cara kerja JWT dan bagaimana mengimplementasikannya menggunakan **Node.js** dan **Express**.

## Apa Itu JWT?
**JSON Web Token (JWT)** adalah standar untuk membuat token yang bisa digunakan untuk autentikasi dan pertukaran informasi dengan aman antara dua pihak. JWT terdiri dari tiga bagian:
- **Header**: Berisi tipe token dan algoritma enkripsi yang digunakan.
- **Payload**: Berisi data atau klaim, misalnya data user.
- **Signature**: Tanda tangan digital untuk memverifikasi token.

JWT biasanya digunakan untuk **otentikasi stateless** di mana server tidak perlu menyimpan sesi pengguna.

### Contoh Struktur JWT
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- **Header**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- **Payload**: `eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE1MTYyMzkwMjJ9`
- **Signature**: `SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

## Bagaimana JWT Bekerja?
1. **Client** mengirim permintaan login dengan kredensial (username dan password).
2. Jika kredensial valid, **server** menghasilkan JWT yang berisi informasi user, dan mengirimkannya kembali ke client.
3. **Client** menyimpan JWT (biasanya di local storage atau cookie) dan mengirimkannya di setiap permintaan ke server untuk mengakses endpoint yang dilindungi.
4. **Server** memverifikasi JWT pada setiap permintaan untuk memastikan token valid dan pengguna yang diotentikasi.

## Instalasi dan Persiapan Node.js dan Express
Untuk mengimplementasikan JWT, kita akan menggunakan **Node.js** dan **Express**. Pastikan kamu sudah menginstal **Node.js** di komputermu. Kemudian, buat project baru dan instal Express serta paket lain yang dibutuhkan:

```bash
mkdir jwt-auth
cd jwt-auth
npm init -y
npm install express jsonwebtoken bcryptjs body-parser
```

### Paket yang Digunakan
- **express**: Framework untuk membuat server.
- **jsonwebtoken**: Untuk membuat dan memverifikasi JWT.
- **bcryptjs**: Untuk mengenkripsi password.
- **body-parser**: Untuk mem-parsing request body dari client.

## Membuat Server Express Sederhana
Langkah pertama adalah membuat server Express sederhana. Buat file `server.js` dan tambahkan kode berikut:

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to JWT Authentication');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Jalankan server dengan perintah `node server.js` dan buka di browser pada `http://localhost:3000`.

## Membuat Model User
Selanjutnya, kita akan membuat model user sederhana. Karena kita tidak menggunakan database untuk sesi ini, kita akan menyimpan user di dalam array sebagai contoh.

Buat array untuk menyimpan user dan fungsi untuk mengenkripsi password dengan **bcryptjs**:

```javascript
const bcrypt = require('bcryptjs');

const users = [];

function registerUser(username, password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  users.push({ username, password: hashedPassword });
}

function findUser(username) {
  return users.find(user => user.username === username);
}
```

## Registrasi User dan Login dengan JWT
Sekarang kita akan membuat rute untuk **registrasi** dan **login** menggunakan JWT. Tambahkan rute berikut di file `server.js`:

### Registrasi User
```javascript
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (findUser(username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  registerUser(username, password);
  res.status(201).json({ message: 'User registered successfully' });
});
```

### Login User dan Membuat JWT
```javascript
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});
```

- **Registrasi**: Menggunakan `POST /register` untuk menambahkan user baru.
- **Login**: Menggunakan `POST /login` untuk memverifikasi kredensial user dan mengembalikan JWT jika berhasil.
***
#DigistarClass #DigistarClass2024 #LivinginTelkom #TelkomIndonesia #BackEnd #LearningSession
