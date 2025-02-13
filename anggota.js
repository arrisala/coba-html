// Data Anggota (Simpan di localStorage untuk sementara)
let anggotaData = JSON.parse(localStorage.getItem('anggotaData')) || [];

// Ambil role dari localStorage
const role = localStorage.getItem('role');

// Tampilkan form tambah anggota hanya untuk pengurus harian
if (role === 'pengurus') {
    document.getElementById('anggota-form').classList.remove('hidden');
}

// Form Tambah Anggota
document.getElementById('anggota-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const namaAnggota = document.getElementById('nama-anggota').value;
    const jabatanAnggota = document.getElementById('jabatan-anggota').value;

    const newAnggota = {
        id: Date.now(), // ID unik berdasarkan timestamp
        nama: namaAnggota,
        jabatan: jabatanAnggota
    };

    anggotaData.push(newAnggota);
    localStorage.setItem('anggotaData', JSON.stringify(anggotaData));
    updateTable();
    this.reset(); // Reset form
});

// Fungsi untuk mengupdate tabel anggota
function updateTable() {
    const tableBody = document.querySelector('#anggota-table tbody');
    tableBody.innerHTML = '';

    anggotaData.forEach((anggota, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${anggota.nama}</td>
            <td>${anggota.jabatan}</td>
            <td>
                ${role === 'pengurus' ? `
                    <button class="edit" onclick="editAnggota(${anggota.id})">Edit</button>
                    <button class="delete" onclick="deleteAnggota(${anggota.id})">Hapus</button>
                ` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi Edit Anggota
function editAnggota(id) {
    const anggota = anggotaData.find(a => a.id === id);
    if (anggota) {
        document.getElementById('nama-anggota').value = anggota.nama;
        document.getElementById('jabatan-anggota').value = anggota.jabatan;

        // Hapus anggota lama
        deleteAnggota(id);
    }
}

// Fungsi Hapus Anggota
function deleteAnggota(id) {
    anggotaData = anggotaData.filter(a => a.id !== id);
    localStorage.setItem('anggotaData', JSON.stringify(anggotaData));
    updateTable();
}

// Tampilkan data saat halaman dimuat
updateTable();