const tombol = document.querySelectorAll('.filter-btn');
const kartu = document.querySelectorAll('.destinasi-card');
const info = document.getElementById('filter-info');
const kosong = document.getElementById('filter-kosong');

function terapkanFilter(kategori) {
  let jumlah = 0;

  kartu.forEach(card => {
    const cocok = kategori === 'semua' || card.dataset.category === kategori;
    card.classList.toggle('hidden', !cocok);
    if (cocok) jumlah++;
  });

  tombol.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.category === kategori);
  });

  const nama = kategori === 'semua' ? 'semua kategori' : KATEGORI[kategori];
  info.textContent = `Menampilkan ${jumlah} destinasi dari ${nama}`;
  kosong.classList.toggle('hidden', jumlah !== 0);
}

tombol.forEach(btn => {
  btn.addEventListener('click', () => terapkanFilter(btn.dataset.category));
});

terapkanFilter('semua');