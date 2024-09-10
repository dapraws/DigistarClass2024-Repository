# Database

![Day 4 - Database](https://github.com/user-attachments/assets/b40e5aba-b9e4-43d4-b476-25bf496266f1)

Di learning session kali ini, kita membahas **konsep dasar database**, perannya dalam pengembangan aplikasi, dan penggunaan **MongoDB** sebagai database **NoSQL**. Kita juga belajar desain database, indexing, locking, serta properti **ACID** di MongoDB.

## Apa Itu Database?
**Database** adalah kumpulan data yang terorganisir dan disimpan secara elektronik, biasanya di server. Database digunakan untuk **menyimpan**, **mengelola**, dan **mengambil** data yang dibutuhkan oleh aplikasi.

## Desain Database
Desain database adalah proses mengatur struktur data agar efisien, konsisten, dan mudah diakses. Dalam MongoDB, data disimpan dalam bentuk **dokumen** yang dikelompokkan ke dalam **koleksi**.

- **Document**: Seperti objek JSON, berisi data dalam format key-value.
- **Collection**: Kumpulan dari beberapa dokumen, mirip seperti tabel di database relasional.

Desain database yang baik harus mempertimbangkan **denormalisasi** (mengurangi ketergantungan antara data), terutama dalam database NoSQL seperti MongoDB, untuk meningkatkan performa.

## Indexing dan Locking
- **Indexing**: Proses membuat indeks untuk mempercepat pencarian data. Di MongoDB, indeks dapat dibuat di berbagai kolom (fields) untuk meningkatkan kinerja query.
  
  Contoh membuat indeks di MongoDB:
  ```javascript
  db.users.createIndex({ name: 1 });
  ```

- **Locking**: MongoDB menggunakan **locking** pada level dokumen, yang berarti setiap dokumen di-lock saat diubah untuk memastikan konsistensi data. Ini meningkatkan kinerja dan memungkinkan penulisan data secara bersamaan.

## ACID di NoSQL
**ACID** adalah kumpulan sifat yang memastikan keandalan transaksi dalam database:
- **Atomicity**: Transaksi dilakukan sepenuhnya atau tidak sama sekali.
- **Consistency**: Data harus tetap valid setelah transaksi.
- **Isolation**: Setiap transaksi terjadi secara independen.
- **Durability**: Data yang sudah disimpan tetap ada meskipun terjadi kegagalan sistem.

Meskipun MongoDB adalah database NoSQL, ia mendukung properti **ACID** pada level dokumen, yang berarti setiap operasi pada dokumen dijamin konsistensi dan keandalannya.

## SQL vs NoSQL
- **SQL**: Basis data relasional seperti MySQL dan PostgreSQL menggunakan tabel dan relasi antar tabel. Cocok untuk data yang sangat terstruktur.
  
- **NoSQL**: Seperti MongoDB, lebih fleksibel dalam menyimpan data tidak terstruktur atau semi-terstruktur. Tidak menggunakan tabel, melainkan dokumen dan koleksi.

Perbedaan ini penting karena aplikasi modern sering membutuhkan fleksibilitas yang ditawarkan oleh NoSQL.

## Denormalisasi
**Denormalisasi** adalah teknik di mana kita menyimpan data yang sama di beberapa tempat untuk menghindari penggabungan tabel (joins) yang kompleks. Dalam MongoDB, denormalisasi sering digunakan untuk mempercepat pembacaan data, karena query di NoSQL umumnya lebih cepat dengan data yang terdenormalisasi.

Contoh: Jika kita memiliki pengguna dan postingan, alih-alih membuat koleksi terpisah untuk pengguna dan postingan, kita bisa menyimpan data pengguna di dalam dokumen postingan agar lebih mudah diakses.
