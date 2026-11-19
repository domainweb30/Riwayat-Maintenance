# Gardena Maintenance Dashboard

Dashboard kartu riwayat maintenance digital PT Gardena Furniture, dibangun menggunakan HTML, CSS yang diinjeksi dari `style.js`, dan JavaScript ES Modules tanpa framework.

## Cara menjalankan
1. Ekstrak folder.
2. Buka folder dengan VS Code.
3. Jalankan melalui Live Server (disarankan), bukan `file://`, agar modul ES berjalan lancar.
4. Buka `index.html` pada browser.

## Fitur
- KPI: jumlah catatan, downtime total, respons rata-rata, biaya total.
- Grafik bar sederhana: jumlah gangguan, downtime, komponen yang tercatat.
- Ringkasan jadwal PM usulan.
- Tabel riwayat dengan pencarian, filter equipment dan tipe CM/PM.
- Tambah/edit/hapus catatan maintenance.
- Export CSV.
- Print view.
- Theme toggle.
- Persistensi localStorage.

## Data awal
17 catatan yang tersedia dalam HTML sumber. Data disimpan lokal pada browser, bukan cloud/database. Gunakan Reset browser storage atau hapus key `gardena_maintenance_dashboard_v3` untuk mengembalikan data awal.

## Struktur
- `index.html`: markup
- `app.js`: bootstrap
- `style.js`: tema dan responsive CSS
- `data/maintenance-data.js`: seed records
- `js/config.js`: equipment dan PM schedule
- `js/dashboard.js`: KPI
- `js/charts.js`: visualisasi
- `js/table.js`: table, filter, CSV
- `js/form.js`: form CRUD
- `js/storage.js`: local storage
- `js/utils.js`: formatting/helpers
