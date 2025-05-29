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

## Cara Menjalankan

### 1. Jalankan Backend
- Pastikan Python 3 sudah terinstall.
- (Opsional tapi direkomendasikan) Buat dan aktifkan virtual environment:
  ```bash
  python -m venv venv
  source venv/bin/activate  # Linux/macOS
  venv\Scripts\activate     # Windows
  ```
- Install dependensi backend:
  ```bash
  pip install pyramid pyramid_jinja2 sqlalchemy alembic waitress pytest
  ```
- Jalankan migrasi database (jika menggunakan Alembic):
  ```bash
  alembic upgrade head
  ```
- Jalankan server backend:
  ```bash
  pserve development.ini --reload
  ```
  *(Sesuaikan dengan file konfigurasi yang ada di proyek)*

### 2. Jalankan Frontend
- Pastikan Node.js dan npm/yarn sudah terinstall.
- Masuk ke folder frontend (`src`):
  ```bash
  cd src
  ```
- Install dependensi frontend:
  ```bash
  npm install
  ```
  atau
  ```bash
  yarn install
  ```
- Jalankan frontend development server:
  ```bash
  npm start
  ```
  atau
  ```bash
  yarn start
  ```
- Buka browser dan akses:
  ```
  http://localhost:3000
  ```

---

## Fitur
- Autentikasi dan login pengguna (user dan admin).  
- Dashboard khusus untuk admin dan user dengan tampilan dan akses berbeda.  
- Manajemen buku lengkap (CRUD): menambah, melihat, mengubah, dan menghapus data buku.  
- Manajemen peminjaman buku: pengguna dapat meminjam buku, admin dapat mengelola peminjaman tersebut.  
- Manajemen daftar favorit buku untuk pengguna.  
- Halaman laporan peminjaman yang membantu admin memonitor aktivitas peminjaman.

---
## Testing Backend
Jalankan pengujian backend dari direktori backend/:
 ```bash
  pytest
  ```

## Referensi
- [React Documentation](https://reactjs.org/docs/getting-started.html)  
- [Pyramid Documentation](https://docs.pylonsproject.org/projects/pyramid/en/latest/)  
- [Jinja2 Template Engine](https://jinja.palletsprojects.com/)  
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)  
- [Alembic Documentation](https://alembic.sqlalchemy.org/en/latest/)


---
## Dokumentasi

![Screenshot (376)](https://github.com/user-attachments/assets/ed781e5e-a77c-49f4-9719-a6a92a081cb2)
![Screenshot (377)](https://github.com/user-attachments/assets/0513d822-5cb7-42e0-a818-8d3527028e11)
![Screenshot (378)](https://github.com/user-attachments/assets/81e607ac-5cde-4ef1-92b8-6226343719bc)
![Screenshot (379)](https://github.com/user-attachments/assets/557efe59-afeb-45cf-b0d0-e8341733fbb7)
![Screenshot (380)](https://github.com/user-attachments/assets/174fcae4-53d9-415b-aecc-5023a5c6e21b)
![Screenshot (381)](https://github.com/user-attachments/assets/8b4e001e-f642-41c9-83ac-8b5504e25765)
![Screenshot (363)](https://github.com/user-attachments/assets/ba8e08a7-b6c5-43b5-82af-727b325a07c2)
![Screenshot (364)](https://github.com/user-attachments/assets/dab3ea32-702c-43a0-b363-0319224e7dbe)
![Screenshot (365)](https://github.com/user-attachments/assets/743440e6-3a75-419e-a999-f6ab8e0672cb)
![Screenshot (366)](https://github.com/user-attachments/assets/f929798f-34c5-4fcd-b590-d1555fd32681)
![Screenshot (382)](https://github.com/user-attachments/assets/a6bc710c-d10e-49cd-b512-8bf12fadff7c)
![Screenshot (383)](https://github.com/user-attachments/assets/52576796-2ddc-49b9-88f9-62f5b5dc2f9f)
