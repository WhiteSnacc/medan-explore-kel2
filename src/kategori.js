const KATEGORI = {
  sejarah: 'Wisata Sejarah',
  alam: 'Alam',
  rekreasi: 'Rekreasi',
  kuliner: 'Kuliner'
};

document.querySelectorAll('[data-category]').forEach(el => {
  const key = el.dataset.category;
  if (key !== 'semua' && !(key in KATEGORI)) {
    console.warn(`Kategori tidak dikenal: "${key}". Gunakan salah satu dari: ${Object.keys(KATEGORI).join(', ')}`);
  }
});