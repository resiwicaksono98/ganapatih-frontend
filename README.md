# React + TypeScript + Vite

Template ini menyediakan setup minimal untuk menjalankan React di Vite dengan HMR dan beberapa aturan ESLint.

Saat ini, dua plugin resmi tersedia:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) menggunakan [Babel](https://babeljs.io/) untuk Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) menggunakan [SWC](https://swc.rs/) untuk Fast Refresh

## Memperluas konfigurasi ESLint

Jika Anda mengembangkan aplikasi produksi, kami merekomendasikan untuk memperbarui konfigurasi untuk mengaktifkan aturan lint yang sadar tipe:

- Konfigurasikan properti `parserOptions` tingkat atas seperti ini:


export default tseslint.config({
  languageOptions: {
    // opsi lain...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})


- Ganti `tseslint.configs.recommended` dengan `tseslint.configs.recommendedTypeChecked` atau `tseslint.configs.strictTypeChecked`
- Opsional tambahkan `...tseslint.configs.stylisticTypeChecked`
- Instal [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) dan perbarui konfigurasi:


// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Setel versi react
  settings: { react: { version: '18.3' } },
  plugins: {
    // Tambahkan plugin react
    react,
  },
  rules: {
    // aturan lain...
    // Aktifkan aturan yang direkomendasikan
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})


## Menjalankan Proyek

Untuk menjalankan proyek ini, ikuti langkah-langkah berikut:

1. Instal dependensi dengan menjalankan perintah berikut di terminal:

   npm install


2. Tambahkan file `.env` di root proyek Anda dan masukkan `MAPBOX_ACCESS_TOKEN` Anda:

   MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here


3. Jalankan proyek dengan perintah:

   npm run dev
