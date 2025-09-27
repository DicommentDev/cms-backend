# cms-backend

## 📚 **API Documentation**

---

## REVIEWS

---

### 1. **Get All Reviews**
- **Method**: `GET`
- **URL**: `/api/reviews`
- **Description**: Mengambil semua ulasan (reviews) yang tersedia.
- **Request Headers**:  
  - `Content-Type: application/json` (opsional untuk GET)
- **Response**:
  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "rating": 5,
      "message": "Great service!",
      "createdAt": "2024-06-01T10:00:00Z"
    },
    ...
  ]
  ```
- **Status Codes**:
  - `200 OK` – Berhasil mengambil data.
  - `500 Internal Server Error` – Terjadi kesalahan di server.

---

### 2. **Get Review by ID**
- **Method**: `GET`
- **URL**: `/api/reviews/:id`
- **Description**: Mengambil satu ulasan berdasarkan ID.
- **Path Parameters**:
  - `id` *(string/number)* – ID unik dari ulasan.
- **Request Headers**:  
  - `Content-Type: application/json`
- **Response (Success)**:
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "rating": 5,
    "message": "Great service!",
    "createdAt": "2024-06-01T10:00:00Z"
  }
  ```
- **Status Codes**:
  - `200 OK` – Ulasan ditemukan.
  - `404 Not Found` – Ulasan tidak ditemukan.
  - `500 Internal Server Error` – Kesalahan server.

---

### 3. **Create a New Review**
- **Method**: `POST`
- **URL**: `/api/reviews`
- **Description**: Menambahkan ulasan baru.
- **Request Body** *(JSON)*:
  ```json
  {
    "name": "Jane Smith",
    "rating": 4,
    "message": "Good experience overall."
  }
  ```
  > ⚠️ Semua field (`name`, `rating`, `message`) diasumsikan wajib berdasarkan controller.
- **Request Headers**:
  - `Content-Type: application/json`
- **Response (Success)**:
  ```json
  {
    "id": "2",
    "name": "Jane Smith",
    "rating": 4,
    "message": "Good experience overall.",
    "createdAt": "2024-06-02T11:30:00Z"
  }
  ```
- **Status Codes**:
  - `201 Created` – Ulasan berhasil dibuat.
  - `400 Bad Request` – Data tidak valid atau tidak lengkap.
  - `500 Internal Server Error` – Kesalahan server.

---

### 4. **Update a Review**
- **Method**: `PUT`
- **URL**: `/api/reviews/:id`
- **Description**: Memperbarui ulasan berdasarkan ID.
- **Path Parameters**:
  - `id` *(string/number)* – ID ulasan yang akan diupdate.
- **Request Body** *(JSON – partial atau full update)*:
  ```json
  {
    "name": "Jane Smith",
    "rating": 5,
    "message": "Actually, it was excellent!"
  }
  ```
- **Request Headers**:
  - `Content-Type: application/json`
- **Response (Success)**:
  ```json
  {
    "id": "2",
    "name": "Jane Smith",
    "rating": 5,
    "message": "Actually, it was excellent!",
    "updatedAt": "2024-06-02T12:00:00Z"
  }
  ```
- **Status Codes**:
  - `200 OK` – Ulasan berhasil diperbarui.
  - `400 Bad Request` – Data tidak valid.
  - `404 Not Found` – Ulasan dengan ID tersebut tidak ditemukan.
  - `500 Internal Server Error` – Kesalahan server.

---

### 5. **Delete a Review**
- **Method**: `DELETE`
- **URL**: `/api/reviews/:id`
- **Description**: Menghapus ulasan berdasarkan ID.
- **Path Parameters**:
  - `id` *(string/number)* – ID ulasan yang akan dihapus.
- **Request Headers**:  
  - `Content-Type: application/json` (opsional untuk DELETE)
- **Response (Success)**:
  ```json
  {
    "message": "Review deleted",
    "review": {
      "id": "2",
      "name": "Jane Smith",
      "rating": 5,
      "message": "Actually, it was excellent!"
    }
  }
  ```
- **Status Codes**:
  - `200 OK` – Ulasan berhasil dihapus.
  - `404 Not Found` – Ulasan tidak ditemukan.
  - `500 Internal Server Error` – Kesalahan server.

---

## 📌 Catatan Tambahan:
- Semua endpoint berada di bawah prefix `/api/reviews` (pastikan router dipasang dengan benar di Express).
- Format `rating` diasumsikan sebagai angka (misal: 1–5).
- Error handling sudah mencakup kasus "Review not found" dengan status `404`, dan error validasi/data dengan `400`.
- Logging internal sudah diimplementasikan (tidak terlihat di response, hanya untuk debugging/server monitoring).

---

## CATEGORIES

> Base URL: `/api/categories`

---

### 1. **Get All Categories**
- **Method**: `GET`
- **URL**: `/api/categories`
- **Description**: Mengambil daftar semua kategori.
- **Request Headers**:  
  - `Content-Type: application/json` *(opsional untuk GET)*
- **Response (200 OK)**:
  ```json
  [
    {
      "id": "1",
      "name": "Electronics",
      "slug": "electronics",
      "createdAt": "2024-06-01T10:00:00Z"
    },
    {
      "id": "2",
      "name": "Books",
      "slug": "books",
      "createdAt": "2024-06-01T10:05:00Z"
    }
  ]
  ```
- **Status Codes**:
  - `200 OK` – Berhasil mengambil data.
  - `500 Internal Server Error` – Terjadi kesalahan di server.

---

### 2. **Get Category by ID**
- **Method**: `GET`
- **URL**: `/api/categories/:id`
- **Description**: Mengambil detail satu kategori berdasarkan ID.
- **Path Parameters**:
  - `id` *(string/number)* – ID unik kategori.
- **Request Headers**:  
  - `Content-Type: application/json`
- **Response (200 OK)**:
  ```json
  {
    "id": "1",
    "name": "Electronics",
    "slug": "electronics",
    "createdAt": "2024-06-01T10:00:00Z"
  }
  ```
- **Status Codes**:
  - `200 OK` – Kategori ditemukan.
  - `404 Not Found` – Kategori tidak ditemukan (`{ "error": "Category not found" }`).
  - `500 Internal Server Error` – Kesalahan server.

---

### 3. **Create a New Category**
- **Method**: `POST`
- **URL**: `/api/categories`
- **Description**: Menambahkan kategori baru.
- **Request Body** *(JSON)*:
  ```json
  {
    "name": "Fashion",
    "slug": "fashion"
  }
  ```
  > ⚠️ Field `name` dan `slug` diasumsikan wajib berdasarkan destructuring di controller.
- **Request Headers**:
  - `Content-Type: application/json` *(wajib)*
- **Response (201 Created)**:
  ```json
  {
    "id": "3",
    "name": "Fashion",
    "slug": "fashion",
    "createdAt": "2024-06-02T14:30:00Z"
  }
  ```
- **Status Codes**:
  - `201 Created` – Kategori berhasil dibuat.
  - `400 Bad Request` – Data tidak valid, duplikat slug, atau field wajib kosong (`{ "error": "<pesan error>" }`).
  - `500 Internal Server Error` – Kesalahan tak terduga di server.

---

### 4. **Update a Category**
- **Method**: `PUT`
- **URL**: `/api/categories/:id`
- **Description**: Memperbarui data kategori berdasarkan ID (full update).
- **Path Parameters**:
  - `id` *(string/number)* – ID kategori yang akan diupdate.
- **Request Body** *(JSON)*:
  ```json
  {
    "name": "Men's Fashion",
    "slug": "mens-fashion"
  }
  ```
- **Request Headers**:
  - `Content-Type: application/json`
- **Response (200 OK)**:
  ```json
  {
    "id": "3",
    "name": "Men's Fashion",
    "slug": "mens-fashion",
    "updatedAt": "2024-06-02T15:00:00Z"
  }
  ```
- **Status Codes**:
  - `200 OK` – Kategori berhasil diperbarui.
  - `400 Bad Request` – Data tidak valid atau duplikat slug.
  - `404 Not Found` – Kategori tidak ditemukan (`{ "error": "Category not found" }`).
  - `500 Internal Server Error` – Kesalahan server.

---

### 5. **Delete a Category**
- **Method**: `DELETE`
- **URL**: `/api/categories/:id`
- **Description**: Menghapus kategori berdasarkan ID.
- **Path Parameters**:
  - `id` *(string/number)* – ID kategori yang akan dihapus.
- **Request Headers**:  
  - `Content-Type: application/json` *(opsional)*
- **Response (200 OK)**:
  ```json
  {
    "message": "Category deleted",
    "category": {
      "id": "3",
      "name": "Men's Fashion",
      "slug": "mens-fashion"
    }
  }
  ```
- **Status Codes**:
  - `200 OK` – Kategori berhasil dihapus.
  - `404 Not Found` – Kategori tidak ditemukan (`{ "error": "Category not found" }`).
  - `500 Internal Server Error` – Kesalahan server (misal: gagal menghapus karena constraint database).

---

## 📌 Catatan Penting:
- **Slug**: Biasanya digunakan untuk URL-friendly identifier (contoh: `electronics`, `mens-fashion`). Pastikan unik dan tidak mengandung spasi/simbol ilegal.
- **Error Handling**:  
  - `404` hanya dikembalikan jika pesan error persis `"Category not found"`.  
  - Error validasi (misal: nama kosong, slug duplikat) akan menghasilkan `400`.
- **Idempotensi**:  
  - `PUT` bersifat *full update* — kirim semua field yang relevan.
  - Jika ingin *partial update*, pertimbangkan menggunakan `PATCH` di masa depan.

---

## CITIES

---

> **Base URL**: `/api/cities`

---

### 1. **Get All Cities**
- **Method**: `GET`  
- **URL**: `/api/cities`  
- **Description**: Mengambil daftar semua kota.  
- **Request Headers**:  
  - `Content-Type: application/json` *(opsional untuk GET)*  
- **Response (200 OK)**:
  ```json
  [
    {
      "id": "1",
      "city_name": "Jakarta",
      "slug": "jakarta",
      "province": "DKI Jakarta",
      "createdAt": "2024-06-01T08:00:00Z"
    },
    {
      "id": "2",
      "city_name": "Bandung",
      "slug": "bandung",
      "province": "Jawa Barat",
      "createdAt": "2024-06-01T08:05:00Z"
    }
  ]
  ```
- **Status Codes**:
  - `200 OK` – Berhasil mengambil data.
  - `500 Internal Server Error` – Terjadi kesalahan di server.

---

### 2. **Get City by ID**
- **Method**: `GET`  
- **URL**: `/api/cities/:id`  
- **Description**: Mengambil detail satu kota berdasarkan ID.  
- **Path Parameters**:
  - `id` *(string/number)* – ID unik kota.  
- **Request Headers**:  
  - `Content-Type: application/json`  
- **Response (200 OK)**:
  ```json
  {
    "id": "1",
    "city_name": "Jakarta",
    "slug": "jakarta",
    "province": "DKI Jakarta",
    "createdAt": "2024-06-01T08:00:00Z"
  }
  ```
- **Status Codes**:
  - `200 OK` – Kota ditemukan.
  - `404 Not Found` – Kota tidak ditemukan → `{ "error": "City not found" }`
  - `500 Internal Server Error` – Kesalahan server.

---

### 3. **Create a New City**
- **Method**: `POST`  
- **URL**: `/api/cities`  
- **Description**: Menambahkan kota baru.  
- **Request Body** *(JSON – wajib)*:
  ```json
  {
    "city_name": "Surabaya",
    "slug": "surabaya",
    "province": "Jawa Timur"
  }
  ```
  > ⚠️ Field berikut diasumsikan **wajib** berdasarkan destructuring di controller:  
  > - `city_name` (nama kota)  
  > - `slug` (identifier URL-friendly, biasanya lowercase dan tanpa spasi)  
  > - `province` (nama provinsi tempat kota berada)  

- **Request Headers**:
  - `Content-Type: application/json` *(wajib)*  
- **Response (201 Created)**:
  ```json
  {
    "id": "3",
    "city_name": "Surabaya",
    "slug": "surabaya",
    "province": "Jawa Timur",
    "createdAt": "2024-06-02T10:20:00Z"
  }
  ```
- **Status Codes**:
  - `201 Created` – Kota berhasil dibuat.
  - `400 Bad Request` – Data tidak valid, field kosong, atau duplikasi slug → `{ "error": "<pesan error>" }`
  - `500 Internal Server Error` – Kesalahan tak terduga di server.

---

### 4. **Update a City**
- **Method**: `PUT`  
- **URL**: `/api/cities/:id`  
- **Description**: Memperbarui data kota berdasarkan ID (*full update*).  
- **Path Parameters**:
  - `id` *(string/number)* – ID kota yang akan diupdate.  
- **Request Body** *(JSON)*:
  ```json
  {
    "city_name": "Surabaya City",
    "slug": "surabaya-city",
    "province": "East Java"
  }
  ```
- **Request Headers**:
  - `Content-Type: application/json`  
- **Response (200 OK)**:
  ```json
  {
    "id": "3",
    "city_name": "Surabaya City",
    "slug": "surabaya-city",
    "province": "East Java",
    "updatedAt": "2024-06-02T11:00:00Z"
  }
  ```
- **Status Codes**:
  - `200 OK` – Kota berhasil diperbarui.
  - `400 Bad Request` – Data tidak valid atau slug duplikat.
  - `404 Not Found` – Kota tidak ditemukan → `{ "error": "City not found" }`
  - `500 Internal Server Error` – Kesalahan server.

---

### 5. **Delete a City**
- **Method**: `DELETE`  
- **URL**: `/api/cities/:id`  
- **Description**: Menghapus kota berdasarkan ID.  
- **Path Parameters**:
  - `id` *(string/number)* – ID kota yang akan dihapus.  
- **Request Headers**:  
  - `Content-Type: application/json` *(opsional)*  
- **Response (200 OK)**:
  ```json
  {
    "message": "City deleted",
    "city": {
      "id": "3",
      "city_name": "Surabaya City",
      "slug": "surabaya-city",
      "province": "East Java"
    }
  }
  ```
- **Status Codes**:
  - `200 OK` – Kota berhasil dihapus.
  - `404 Not Found` – Kota tidak ditemukan → `{ "error": "City not found" }`
  - `500 Internal Server Error` – Gagal menghapus (misal: karena ketergantungan data di tabel lain).

---

## 📌 Catatan Tambahan:
- **Field Naming**:  
  - Menggunakan `city_name` (bukan `name`) untuk kejelasan konteks.
  - `slug` harus unik dan URL-safe (contoh: `jakarta`, `bandung`, `surabaya-city`).
- **Province**: Disimpan sebagai string (bukan ID relasi), kecuali jika di masa depan Anda menggunakan relasi ke tabel `provinces`.
- **Error Handling**:  
  - Hanya error dengan pesan `"City not found"` yang menghasilkan `404`.  
  - Validasi input (misal: `city_name` kosong) akan menghasilkan `400`.
- **Idempotensi**:  
  - Gunakan `PUT` untuk *full replace*. Jika butuh *partial update*, pertimbangkan tambahkan endpoint `PATCH` di masa depan.

---