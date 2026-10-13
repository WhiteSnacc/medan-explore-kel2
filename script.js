const destinasi = [
  { nama: "Istana Maimun", cari: "Istana Maimun Medan", kategori: "Wisata Sejarah", lokasi: "Medan Maimun", rating: 4.7, emoji: "🏯", warna: "from-amber-400 to-orange-600",
    deskripsi: "Istana peninggalan Kesultanan Deli dengan arsitektur perpaduan Melayu, Islam, dan Eropa.", gambar: "" },
  { nama: "Masjid Raya Al-Mashun", cari: "Masjid Raya Al Mashun Medan", kategori: "Wisata Sejarah", lokasi: "Medan Kota", rating: 4.8, emoji: "🕌", warna: "from-sky-400 to-indigo-600",
    deskripsi: "Masjid bersejarah bergaya Maroko dan Timur Tengah yang menjadi ikon Kota Medan.", gambar: "" },
  { nama: "Tjong A Fie Mansion", cari: "Tjong A Fie Mansion Medan", kategori: "Wisata Sejarah", lokasi: "Kesawan, Medan", rating: 4.6, emoji: "🏛️", warna: "from-rose-400 to-red-600",
    deskripsi: "Rumah kediaman saudagar Tionghoa terkenal dengan arsitektur Tionghoa-Eropa.", gambar: "" },
  { nama: "Berastagi", cari: "Berastagi Karo", kategori: "Alam", lokasi: "Kab. Karo", rating: 4.5, emoji: "⛰️", warna: "from-emerald-400 to-green-700",
    deskripsi: "Dataran tinggi sejuk dengan pemandangan Gunung Sibayak dan Sinabung serta pasar buah.", gambar: "" },
  { nama: "Air Terjun Sipiso-piso", cari: "Air Terjun Sipiso-piso", kategori: "Alam", lokasi: "Kab. Karo", rating: 4.7, emoji: "🌊", warna: "from-cyan-400 to-blue-600",
    deskripsi: "Air terjun tinggi yang jatuh langsung ke Danau Toba dengan panorama memukau.", gambar: "" },
  { nama: "Bukit Lawang", cari: "Bukit Lawang Langkat", kategori: "Alam", lokasi: "Langkat", rating: 4.8, emoji: "🦧", warna: "from-lime-400 to-green-800",
    deskripsi: "Pusat konservasi orangutan Sumatra dengan wisata trekking hutan dan tubing sungai.", gambar: "" },
  { nama: "Sibolangit Centre", cari: "Sibolangit Deli Serdang", kategori: "Rekreasi", lokasi: "Deli Serdang", rating: 4.2, emoji: "🎡", warna: "from-fuchsia-400 to-purple-600",
    deskripsi: "Taman rekreasi keluarga di kaki pegunungan dengan beragam wahana dan area outbound.", gambar: "" },
  { nama: "Merdeka Walk", cari: "Merdeka Walk Medan", kategori: "Kuliner", lokasi: "Lapangan Merdeka", rating: 4.4, emoji: "🍜", warna: "from-yellow-400 to-red-500",
    deskripsi: "Pusat jajanan malam dengan aneka kuliner khas Medan seperti soto, mie, dan durian.", gambar: "" }
];

/* ========== BAGIAN 10: TOP DESTINATION ========== */
const topGrid = document.getElementById("topGrid");
const btnRate = document.getElementById("sortRating");
const btnName = document.getElementById("sortName");
const JUMLAH_TOP = 5;

function buatBintang(rating) {
  const penuh = Math.round(rating);
  let bintang = "";
  for (let i = 1; i <= 5; i++) {
    bintang += i <= penuh ? "★" : "☆";
  }
  return bintang;
}

function ambilTop(mode) {
  const salinan = destinasi.slice();
  if (mode === "nama") {
    salinan.sort((a, b) => a.nama.localeCompare(b.nama));
  } else {
    salinan.sort((a, b) => b.rating - a.rating);
  }
  return salinan.slice(0, JUMLAH_TOP);
}

/* ========== GAMBAR DESTINASI (foto asli dari Wikipedia) ========== */
// Tampilan sementara / cadangan jika foto gagal dimuat
function placeholder(d, memuat) {
  return `<div class="h-48 bg-gradient-to-br ${d.warna} flex flex-col items-center justify-center text-white ${memuat ? "animate-pulse" : ""}">
            <span class="text-5xl">${d.emoji}</span>
            <span class="text-xs mt-2">${memuat ? "Memuat gambar..." : d.nama}</span>
          </div>`;
}

// Mencari foto di Wikipedia (bahasa Indonesia dulu, lalu Inggris)
async function cariGambarWiki(kata) {
  const bahasa = ["id", "en"];
  for (let i = 0; i < bahasa.length; i++) {
    const url = "https://" + bahasa[i] + ".wikipedia.org/w/api.php?action=query&generator=search"
      + "&gsrsearch=" + encodeURIComponent(kata) + "&gsrlimit=5&prop=pageimages&piprop=thumbnail"
      + "&pithumbsize=700&format=json&origin=*";
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.query) {
        const hasil = Object.values(json.query.pages).sort((a, b) => a.index - b.index);
        for (let j = 0; j < hasil.length; j++) {
          if (hasil[j].thumbnail) return hasil[j].thumbnail.source;
        }
      }
    } catch (err) {
      // abaikan, coba bahasa berikutnya
    }
  }
  return "";
}

// Memasang foto ke dalam card. Jika d.gambar sudah diisi manual (mis. "img/maimun.jpg"), itu yang dipakai.
async function muatGambar(d, wadah) {
  if (!d.gambar) {
    d.gambar = await cariGambarWiki(d.cari);
  }
  if (d.gambar) {
    const img = document.createElement("img");
    img.src = d.gambar;
    img.alt = d.nama;
    img.className = "h-48 w-full object-cover";
    img.onerror = function () { wadah.innerHTML = placeholder(d, false); };
    wadah.innerHTML = "";
    wadah.appendChild(img);
  } else {
    wadah.innerHTML = placeholder(d, false);
  }
}

function renderTop(mode) {
  const data = ambilTop(mode);
  let html = "";

  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    // Wadah gambar: diisi foto asli oleh fungsi muatGambar() setelah card tampil
    const visual = `<div id="visual-${i}" class="h-48 overflow-hidden bg-slate-200">${placeholder(d, true)}</div>`;

    // Animasi hover memakai class Tailwind: hover:-translate-y-2 hover:shadow-2xl transition
    html += `
      <article class="relative bg-white rounded-2xl overflow-hidden shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <span class="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">#${i + 1}</span>
        ${visual}
        <div class="p-5">
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">${d.kategori}</span>
          <h3 class="mt-2 text-lg font-bold">${d.nama}</h3>
          <p class="text-sm text-slate-500">📍 ${d.lokasi}</p>
          <p class="text-amber-500 mt-1">${buatBintang(d.rating)} <span class="text-slate-600 text-sm">${d.rating.toFixed(1)}</span></p>
          <p class="text-sm text-slate-600 mt-2">${d.deskripsi}</p>
        </div>
      </article>`;
  }
  topGrid.innerHTML = html;

  for (let k = 0; k < data.length; k++) {
    muatGambar(data[k], document.getElementById("visual-" + k));
  }
}

function setAktif(aktif, nonaktif) {
  aktif.className = "px-4 py-2 bg-emerald-600 text-white text-sm";
  nonaktif.className = "px-4 py-2 bg-white text-emerald-700 text-sm";
}

btnRate.addEventListener("click", function () { renderTop("rating"); setAktif(btnRate, btnName); });
btnName.addEventListener("click", function () { renderTop("nama"); setAktif(btnName, btnRate); });

renderTop("rating");

/* ========== BAGIAN 14: VALIDASI FORM ========== */
const form = document.getElementById("askForm");
const inputNama = document.getElementById("nama");
const inputPesan = document.getElementById("pesan");
const namaError = document.getElementById("namaError");
const pesanError = document.getElementById("pesanError");
const counter = document.getElementById("counter");
const formSuccess = document.getElementById("formSuccess");
const MAKS_PESAN = 200;

// Mengubah tampilan input memakai class Tailwind
function setStatus(input, status) {
  input.classList.remove("border-slate-300", "border-red-500", "bg-red-50", "border-green-500", "bg-green-50");
  if (status === "error") {
    input.classList.add("border-red-500", "bg-red-50");
  } else if (status === "ok") {
    input.classList.add("border-green-500", "bg-green-50");
  } else {
    input.classList.add("border-slate-300");
  }
}

function tampilError(input, elemen, teks) {
  elemen.textContent = teks;
  elemen.classList.remove("hidden");
  setStatus(input, "error");
}

function tampilBenar(input, elemen) {
  elemen.classList.add("hidden");
  setStatus(input, "ok");
}

function validasiNama() {
  const nilai = inputNama.value.trim();
  const polaHuruf = /^[A-Za-z\s.']+$/;

  if (nilai === "") {
    tampilError(inputNama, namaError, "Nama wajib diisi.");
    return false;
  } else if (nilai.length < 3) {
    tampilError(inputNama, namaError, "Nama minimal 3 karakter.");
    return false;
  } else if (!polaHuruf.test(nilai)) {
    tampilError(inputNama, namaError, "Nama hanya boleh berisi huruf.");
    return false;
  }
  tampilBenar(inputNama, namaError);
  return true;
}

function validasiPesan() {
  const nilai = inputPesan.value.trim();

  if (nilai === "") {
    tampilError(inputPesan, pesanError, "Pesan wajib diisi.");
    return false;
  } else if (nilai.length < 10) {
    tampilError(inputPesan, pesanError, "Pesan minimal 10 karakter.");
    return false;
  } else if (nilai.length > MAKS_PESAN) {
    tampilError(inputPesan, pesanError, "Pesan maksimal " + MAKS_PESAN + " karakter.");
    return false;
  }
  tampilBenar(inputPesan, pesanError);
  return true;
}

inputNama.addEventListener("input", validasiNama);

inputPesan.addEventListener("input", function () {
  const panjang = inputPesan.value.length;
  counter.textContent = panjang + " / " + MAKS_PESAN;
  counter.className = panjang > MAKS_PESAN ? "text-red-500 ml-auto" : "text-slate-400 ml-auto";
  validasiPesan();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  formSuccess.classList.add("hidden");

  const namaValid = validasiNama();
  const pesanValid = validasiPesan();

  if (namaValid && pesanValid) {
    formSuccess.textContent = "Terima kasih, " + inputNama.value.trim() + "! Pertanyaan Anda sudah kami terima.";
    formSuccess.classList.remove("hidden");
    form.reset();
    counter.textContent = "0 / " + MAKS_PESAN;
    setStatus(inputNama, "normal");
    setStatus(inputPesan, "normal");
  }
});