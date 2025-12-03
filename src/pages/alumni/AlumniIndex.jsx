import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
// --- VVV IMPOR useFetch DITAMBAHKAN KEMBALI VVV ---
import useFetch from "../../hooks/useFetch";
// --- ^^^ AKHIR IMPOR useFetch ^^^ ---
import { motion } from "framer-motion";

// --- Varian Animasi ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const AlumniIndex = () => {
  // --- VVV LOGIKA FETCHING DATA DIPERTAHANKAN VVV ---
  const {
    data: responseData,
    loading,
    error,
  } = useFetch("/prestasi?limit=100"); // Mengambil data dari endpoint /prestasi

  // Pastikan data adalah array yang valid
  const alumniList = Array.isArray(responseData)
    ? responseData
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];
  // --- ^^^ AKHIR LOGIKA FETCHING DATA ^^^ ---

  // --- Tampilan Loading ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  // --- Tampilan Error atau Data Kosong ---
  if (error || alumniList.length === 0) {
    return (
      <div className="py-24 bg-white min-h-screen relative flex flex-col items-center justify-center text-center px-4">
        <Link
          to="/"
          aria-label="Kembali ke Halaman Utama"
          className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2 text-primary bg-white shadow-md px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
        >
          <ArrowLeftCircle size={24} className="text-secondary" />
          <span className="hidden sm:inline font-medium">Kembali</span>
        </Link>
        <h1 className="text-4xl font-bold text-primary mb-4">Oops!</h1>
        <p className="text-xl text-gray-600">
          {error ? "Terjadi kesalahan saat memuat data." : "Data alumni tidak dapat dimuat."}
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-800 transition-colors"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white min-h-screen relative overflow-hidden">
      {/* Tombol kembali */}
      <Link
        to="/"
        aria-label="Kembali ke Halaman Utama"
        className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2 text-primary bg-white shadow-md px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </Link>

      <div className="container mx-auto px-4">
        {/* Judul Halaman */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Alumni Kami
          </h1>
          <p className="text-xl text-gray-600">
            Jejak Lulusan Prodi Informatika Universitas Pancasakti Tegal
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </motion.div>

        {/* Grid Kartu Alumni */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Menggunakan 'alumniList' dari fetch, bukan 'allAlumni' statis */}
          {alumniList.map((alumnus) => (
            <motion.div
              key={alumnus.id}
              variants={cardItem}
              // --- DESAIN KARTU BARU (Rounded, Border Bawah, Ramping di Mobile) ---
              className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl block h-full max-w-xs mx-auto sm:max-w-none w-full"
            >
              {/* Link ke Detail */}
              <Link to={`/alumni/${alumnus.id}`} className="block h-full w-full">
                <div className="relative overflow-hidden h-full">
                  {/* Gambar Tinggi (h-96) */}
                  <img
                    src={
                      alumnus.foto_url || // Gunakan foto_url dari API jika ada
                      alumnus.foto ||     // Fallback ke properti 'foto' jika API berbeda
                      "https://placehold.co/400x500/cccccc/ffffff?text=No+Image" // Fallback terakhir
                    }
                    alt={alumnus.nama}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x500/cccccc/ffffff?text=Foto+${alumnus.nama ? alumnus.nama.split(" ")[0] : "Alumni"}`;
                    }}
                  />

                  {/* Overlay Gradasi Kuning */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary via-secondary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                    <h3 className="text-base font-bold text-primary leading-snug mb-1 drop-shadow-sm line-clamp-2">
                      {alumnus.nama}
                    </h3>
                    <p className="text-xs text-blue-900 font-medium leading-relaxed opacity-90 line-clamp-1">
                      {/* Gunakan 'kejuaraan' atau 'pekerjaan' tergantung data API */}
                      {alumnus.kejuaraan || alumnus.pekerjaan || "Alumni Berprestasi"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AlumniIndex;