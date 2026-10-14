
const tombol = document.querySelectorAll('.filter-btn');
const kartu = document.querySelectorAll('.destinasi-card');
const info = document.getElementById('filter-info');
const kosong = document.getElementById('filter-kosong');
const pencarian = document.getElementById('search-destination');

let kategoriAktif = 'semua';

function terapkanFilter() {
    const kataKunci = pencarian
        ? pencarian.value.trim().toLowerCase()
        : '';

    let jumlah = 0;

    kartu.forEach(card => {
        const kategori = card.dataset.category;
        const teksDestinasi = card.textContent.toLowerCase();

        const cocokKategori =
            kategoriAktif === 'semua' ||
            kategori === kategoriAktif;

        const cocokNama = teksDestinasi.includes(kataKunci);

        const tampil = cocokKategori && cocokNama;

        // Sembunyikan kartu secara langsung tanpa bergantung pada CSS
        card.style.display = tampil ? '' : 'none';

        if (tampil) {
            jumlah++;
        }
    });

    tombol.forEach(btn => {
        btn.setAttribute(
            'aria-pressed',
            String(btn.dataset.category === kategoriAktif)
        );
    });

    const namaKategori = kategoriAktif === 'semua'
        ? 'semua kategori'
        : (typeof KATEGORI !== 'undefined'
            ? KATEGORI[kategoriAktif] || kategoriAktif
            : kategoriAktif);

    if (info) {
        info.textContent =
            `Menampilkan ${jumlah} destinasi dari ${namaKategori}`;
    }

    if (kosong) {
        kosong.textContent = jumlah === 0
            ? 'Destinasi tidak ditemukan. Coba nama atau kategori lain.'
            : '';

        kosong.style.display = jumlah === 0 ? '' : 'none';
    }
}

tombol.forEach(btn => {
    btn.addEventListener('click', () => {
        kategoriAktif = btn.dataset.category;
        terapkanFilter();
    });
});

if (pencarian) {
    pencarian.addEventListener('input', terapkanFilter);
}

terapkanFilter();