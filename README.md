# Database

![Day 4 - Database](https://github.com/user-attachments/assets/b40e5aba-b9e4-43d4-b476-25bf496266f1)

Pada learning session kali ini, kita membahas **konsep dasar database**, perannya dalam pengembangan aplikasi, serta penggunaan **MongoDB** sebagai database **NoSQL**. Kita juga mempelajari desain database, indexing, locking, serta properti **ACID** di MongoDB.

## Apa Itu Database?
**Database** adalah kumpulan data yang disimpan secara terstruktur secara elektronik, biasanya di server. Database berfungsi untuk **menyimpan**, **mengelola**, dan **mengambil** data yang dibutuhkan oleh aplikasi, membantu agar data dapat diakses dengan cepat dan efisien.

## Desain Database
Desain database melibatkan proses mengatur struktur data agar efisien, konsisten, dan mudah diakses. Dalam MongoDB, data disimpan dalam bentuk **dokumen** yang dikelompokkan ke dalam **koleksi** (collections).

- **Document**: Berisi data dalam format **JSON-like** yang disimpan sebagai key-value pairs.
- **Collection**: Merupakan kumpulan dokumen yang saling terkait, mirip dengan tabel pada database relasional.

### Desain Database yang Efektif
Dalam database NoSQL seperti MongoDB, seringkali kita menggunakan **denormalisasi** (mengurangi ketergantungan antar data) untuk meningkatkan performa. Denormalisasi memungkinkan duplikasi data agar query lebih cepat dan efisien, karena mengurangi kebutuhan untuk menggabungkan (join) tabel atau dokumen.

![Mongodb](https://github.com/user-attachments/assets/15b6933a-da58-4641-99e8-bbb9956e40ec)

## MongoDB

**MongoDB** adalah database NoSQL yang fleksibel, dirancang untuk menyimpan data dalam format **dokumen** (document-oriented). Cocok untuk data yang semi-terstruktur atau tidak terstruktur, MongoDB menggunakan **BSON** (Binary JSON) untuk menyimpan data. Berikut adalah beberapa konsep utama dan penggunaannya dalam MongoDB:

### Instalasi MongoDB
Untuk menginstal MongoDB, gunakan perintah berikut (untuk sistem berbasis Linux atau MacOS):
```bash
sudo apt install mongodb
```
Untuk memulai server MongoDB:
```bash
sudo systemctl start mongodb
```

### Menghubungkan ke MongoDB dengan Node.js
Kita bisa menggunakan **Mongoose**, yaitu library ODM (Object Data Modeling) untuk MongoDB yang menyediakan skema berbasis data untuk aplikasi Node.js.

Untuk menginstal **Mongoose**:
```bash
npm install mongoose
```

Contoh koneksi ke MongoDB menggunakan Mongoose:
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
```

### Membuat Model Dokumen
Berikut adalah contoh bagaimana kita bisa membuat model untuk koleksi **users**:

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

### Operasi CRUD di MongoDB
Setelah koneksi berhasil, kita bisa melakukan operasi dasar seperti **Create**, **Read**, **Update**, dan **Delete** (CRUD) pada MongoDB.

#### Create (Menyimpan Data)
```javascript
async function createUser() {
  const user = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password'
  });

  const result = await user.save();
  console.log(result);
}
```

#### Read (Membaca Data)
```javascript
async function getUsers() {
  const users = await User.find();
  console.log(users);
}
```

#### Update (Memperbarui Data)
```javascript
async function updateUser(id) {
  const result = await User.findByIdAndUpdate(id, {
    $set: {
      name: 'Jane Doe'
    }
  }, { new: true });

  console.log(result);
}
```

#### Delete (Menghapus Data)
```javascript
async function removeUser(id) {
  const result = await User.findByIdAndRemove(id);
  console.log(result);
}
```

## Indexing dan Locking
- **Indexing**: Membuat indeks untuk mempercepat pencarian data. Di MongoDB, kita dapat membuat indeks pada berbagai kolom (fields) untuk meningkatkan performa query.

  Contoh membuat indeks di MongoDB:
  ```javascript
  db.users.createIndex({ name: 1 });
  ```

- **Locking**: MongoDB menggunakan **locking** pada level dokumen, yang berarti setiap dokumen akan di-lock ketika sedang diubah, untuk memastikan konsistensi data dan menghindari konflik pada saat ada beberapa transaksi yang bersamaan.

## ACID di NoSQL
**ACID** (Atomicity, Consistency, Isolation, Durability) adalah properti yang memastikan keandalan transaksi pada database.

- **Atomicity**: Semua operasi dalam transaksi berhasil atau gagal secara bersamaan.
- **Consistency**: Data harus tetap valid setelah transaksi.
- **Isolation**: Transaksi terpisah satu sama lain.
- **Durability**: Data tetap ada setelah transaksi berhasil meskipun terjadi kegagalan sistem.

MongoDB, meskipun database NoSQL, mendukung **ACID** pada level dokumen, sehingga setiap perubahan pada dokumen memiliki keandalan dan konsistensi tinggi.

## SQL vs NoSQL
- **SQL**: Basis data relasional yang menggunakan tabel dengan skema yang terstruktur (contoh: MySQL, PostgreSQL). Data harus sesuai dengan format tabel yang ditentukan.
  
- **NoSQL**: Basis data yang lebih fleksibel, seperti MongoDB, di mana data tidak perlu sangat terstruktur dan dapat disimpan dalam bentuk dokumen. Cocok untuk aplikasi yang memerlukan skalabilitas tinggi dan fleksibilitas dalam menyimpan data.

### Perbandingan
- **SQL**: Cocok untuk aplikasi dengan hubungan antar tabel yang jelas dan data sangat terstruktur.
- **NoSQL**: Cocok untuk aplikasi modern yang memerlukan fleksibilitas dalam data dan mendukung data tidak terstruktur.

## Denormalisasi
**Denormalisasi** adalah teknik di mana kita menyimpan data yang sama di beberapa tempat untuk menghindari penggabungan (join) data dari tabel atau koleksi yang berbeda. Di MongoDB, denormalisasi sering digunakan untuk mempercepat pembacaan data karena query dengan data terdenormalisasi lebih cepat daripada query dengan data yang terhubung antar koleksi.

### Contoh Denormalisasi
Alih-alih menyimpan ID user di koleksi postingan dan melakukan query terpisah untuk mendapatkan informasi user, kita bisa langsung menyimpan informasi user di dalam dokumen postingan:

```json
{
  "title": "Post Title",
  "content": "Post content...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Kelebihan Denormalisasi
- **Kecepatan akses**: Menghindari multiple query atau join antar tabel.
- **Skalabilitas**: Cocok untuk aplikasi dengan banyak data yang tidak terstruktur.
