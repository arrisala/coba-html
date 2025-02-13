// Data Kegiatan (Simpan di localStorage untuk sementara)
let kegiatanData = JSON.parse(localStorage.getItem('kegiatanData')) || [];

// Ambil role dari localStorage
const role = localStorage.getItem('role');

// Tampilkan form tambah kegiatan hanya untuk pengurus harian
if (role === 'pengurus') {
    document.getElementById('kegiatan-form').classList.remove('hidden');
}

// Form Tambah Kegiatan
document.getElementById('kegiatan-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const namaKegiatan = document.getElementById('nama-kegiatan').value;
    const tanggalKegiatan = document.getElementById('tanggal-kegiatan').value;
    const deskripsiKegiatan = document.getElementById('deskripsi-kegiatan').value;

    const newKegiatan = {
        id: Date.now(), // ID unik berdasarkan timestamp
        nama: namaKegiatan,
        tanggal: tanggalKegiatan,
        deskripsi: deskripsiKegiatan
    };

    kegiatanData.push(newKegiatan);
    localStorage.setItem('kegiatanData', JSON.stringify(kegiatanData));
    updateTable();
    this.reset(); // Reset form
});

// Fungsi untuk mengupdate tabel kegiatan
function updateTable() {
    const tableBody = document.querySelector('#kegiatan-table tbody');
    tableBody.innerHTML = '';

    kegiatanData.forEach((kegiatan, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${kegiatan.nama}</td>
            <td>${kegiatan.tanggal}</td>
            <td>${kegiatan.deskripsi}</td>
            <td>
                ${role === 'pengurus' ? `
                    <button class="edit" onclick="editKegiatan(${kegiatan.id})">Edit</button>
                    <button class="delete" onclick="deleteKegiatan(${kegiatan.id})">Hapus</button>
                ` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi Edit Kegiatan
function editKegiatan(id) {
    const kegiatan = kegiatanData.find(k => k.id === id);
    if (kegiatan) {
        document.getElementById('nama-kegiatan').value = kegiatan.nama;
        document.getElementById('tanggal-kegiatan').value = kegiatan.tanggal;
        document.getElementById('deskripsi-kegiatan').value = kegiatan.deskripsi;

        // Hapus kegiatan lama
        deleteKegiatan(id);
    }
}

// Fungsi Hapus Kegiatan
function deleteKegiatan(id) {
    kegiatanData = kegiatanData.filter(k => k.id !== id);
    localStorage.setItem('kegiatanData', JSON.stringify(kegiatanData));
    updateTable();
}

// Tampilkan data saat halaman dimuat
updateTable();