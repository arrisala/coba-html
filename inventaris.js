// Data Inventaris (Simpan di localStorage untuk sementara)
let inventarisData = JSON.parse(localStorage.getItem('inventarisData')) || [];

// Ambil role dari localStorage
const role = localStorage.getItem('role');

// Tampilkan form tambah inventaris hanya untuk pengurus harian
if (role === 'pengurus') {
    document.getElementById('inventaris-form').classList.remove('hidden');
}

// Form Tambah Inventaris
document.getElementById('inventaris-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const namaBarang = document.getElementById('nama-barang').value;
    const jumlah = document.getElementById('jumlah').value;
    const tahun = document.getElementById('tahun').value;
    const kondisi = document.getElementById('kondisi').value;

    const newItem = {
        id: Date.now(), // ID unik berdasarkan timestamp
        namaBarang,
        jumlah,
        tahun,
        kondisi
    };

    inventarisData.push(newItem);
    localStorage.setItem('inventarisData', JSON.stringify(inventarisData));
    updateTable();
    this.reset(); // Reset form
});

// Fungsi untuk mengupdate tabel inventaris
function updateTable() {
    const tableBody = document.querySelector('#inventaris-table tbody');
    tableBody.innerHTML = '';

    inventarisData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.namaBarang}</td>
            <td>${item.jumlah}</td>
            <td>${item.tahun}</td>
            <td>${item.kondisi}</td>
            <td>
                ${role === 'pengurus' ? `
                    <button class="edit" onclick="editInventaris(${item.id})">Edit</button>
                    <button class="delete" onclick="deleteInventaris(${item.id})">Hapus</button>
                ` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi Edit Inventaris
function editInventaris(id) {
    const item = inventarisData.find(i => i.id === id);
    if (item) {
        document.getElementById('nama-barang').value = item.namaBarang;
        document.getElementById('jumlah').value = item.jumlah;
        document.getElementById('tahun').value = item.tahun;
        document.getElementById('kondisi').value = item.kondisi;

        // Hapus item lama
        deleteInventaris(id);
    }
}

// Fungsi Hapus Inventaris
function deleteInventaris(id) {
    inventarisData = inventarisData.filter(i => i.id !== id);
    localStorage.setItem('inventarisData', JSON.stringify(inventarisData));
    updateTable();
}

// Tampilkan data saat halaman dimuat
updateTable();