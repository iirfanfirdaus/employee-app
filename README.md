# Employee App

Employee App adalah aplikasi berbasis Node.js dengan Sequelize sebagai ORM dan menggunakan Docker untuk containerization.

## Setup Database

### 1. Sesuaikan env
copy file .env.example menjadi .env dan sesuai kan value nya

### 2. Membuat Database
npx sequelize-cli db:create

### 3. Melakukan Migrasi Database
npx sequelize-cli db:migrate

### 4. Menjalankan Seeder
npx sequelize-cli db:seed:all

## Menjalankan Aplikasi

### 1. Menjalankan Secara Lokal
npm run watch # Untuk mode pengembangan dengan auto-restart npm run start # Untuk menjalankan aplikasi secara normal

### 2. Menjalankan dengan Docker

#### a. Membuat Docker Image
docker build -t employee-app .

#### b. Menjalankan Container
docker run -d -p 8000:8000 --name employee-app-container employee-app

## Informasi Tambahan
- source code berada di folder PROJECT_FOLDER.
- Pastikan Anda memiliki Node.js dan npm terinstal.
- Pastikan database sudah dikonfigurasi dengan benar di file konfigurasi Sequelize.
- untuk running di local bisa menggunakan npm run watch atau npm run start.


Jika ada kendala, silakan cek dokumentasi Sequelize atau Docker untuk referensi lebih lanjut.