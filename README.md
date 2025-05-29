# UAS_PEMWEB_RA_MAULINA_122140080


# Pustaka-App

## Deskripsi
Pustaka-App adalah aplikasi web peminjaman buku fullstack yang menggunakan React di frontend dan Pyramid di backend.  
Aplikasi ini memudahkan pengguna untuk meminjam buku secara online, dengan pengelolaan data buku dan peminjaman oleh admin dan user.  
Frontend menggunakan React dengan routing dinamis, backend menggunakan Pyramid dengan templating Jinja2.

---

## Dependensi Paket
Berikut adalah paket/library yang digunakan agar aplikasi dapat berjalan dengan baik:

### Frontend
- **react** & **react-dom**  
  Inti framework React yang digunakan untuk membangun antarmuka pengguna (UI) yang responsif dan dinamis.

- **react-router-dom**  
  Digunakan untuk mengatur navigasi halaman pada aplikasi React Single Page Application (SPA).

- **axios**  
  Library untuk melakukan HTTP request ke backend API.

- **@testing-library/react**  
  Digunakan untuk menulis dan menjalankan unit test pada komponen React.

- **web-vitals**  
  Untuk memonitor performa aplikasi di sisi pengguna.

### Backend
- **pyramid**  
  Framework web Python yang menjadi dasar backend aplikasi ini.

- **pyramid_jinja2**  
  Integrasi template engine Jinja2 dengan Pyramid untuk merender halaman HTML secara dinamis.

- **sqlalchemy**  
  Object Relational Mapper (ORM) yang memudahkan pengelolaan database dengan Python.

- **alembic**  
  Alat migrasi database yang bekerja bersama SQLAlchemy untuk mempermudah update skema database.

- **waitress**  
  Server WSGI ringan dan stabil untuk menjalankan aplikasi Pyramid di lingkungan produksi.

- **pytest**  
  Framework testing Python untuk menulis dan menjalankan test backend.

---

## Fitur
- Autentikasi dan login pengguna (user dan admin).  
- Dashboard khusus untuk admin dan user dengan tampilan dan akses berbeda.  
- Manajemen buku lengkap (CRUD): menambah, melihat, mengubah, dan menghapus data buku.  
- Manajemen peminjaman buku: pengguna dapat meminjam buku, admin dapat mengelola peminjaman tersebut.  
- Manajemen daftar favorit buku untuk pengguna.  
- Halaman laporan peminjaman yang membantu admin memonitor aktivitas peminjaman.

---

## Referensi
- [React Documentation](https://reactjs.org/docs/getting-started.html)  
- [Pyramid Documentation](https://docs.pylonsproject.org/projects/pyramid/en/latest/)  
- [Jinja2 Template Engine](https://jinja.palletsprojects.com/)  
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)  
- [Alembic Documentation](https://alembic.sqlalchemy.org/en/latest/)
