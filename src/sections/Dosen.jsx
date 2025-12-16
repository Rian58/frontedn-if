import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch"; // 1. Menggunakan Custom Hook

// --- Varian Animasi ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Dosen = () => {
  // 2. Fetching Data (Best Practice)
  // Kita mengambil data dari endpoint /dosen
  const { data: responseData, loading, error } = useFetch("/dosen");

  // 3. Normalisasi Data
  // Memastikan data selalu berupa array untuk mencegah error .map
  const dosenList = Array.isArray(responseData)
    ? responseData
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  // 4. Slice Data (Hanya ambil 4 untuk Halaman Utama)
  const featuredLecturers = dosenList.slice(0, 4);

  // --- Tampilan Loading (Skeleton Sederhana) ---
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- Tampilan Error (Sembunyikan Section atau Tampilkan Pesan) ---
  if (error || featuredLecturers.length === 0) {
    // Return null untuk menyembunyikan section jika data gagal dimuat agar tidak merusak tampilan home
    return null;
  }

  // --- Tampilan Utama ---
  return (
    <section id="dosen" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Judul Section */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            MEET OUR
          </h2>
          <p className="text-xl text-gray-600">LECTURERS</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>

        {/* Grid Card Dosen */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredLecturers.map((lecturer) => (
            <motion.div
              key={lecturer.id}
              variants={cardItem}
              // Style Kartu: Rounded-2xl, Shadow, Border Bawah Kuning
              className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl max-w-xs mx-auto sm:max-w-none w-full"
            >
              {/* Link ke Detail Dosen */}
              <Link
                to={`/dosen/${lecturer.id}`}
                className="block h-full w-full"
              >
                <div className="relative overflow-hidden h-full">
                  {/* Gambar */}
                  <img
                    src={
                      lecturer.foto_url ||
                      lecturer.foto ||
                      lecturer.photo ||
                      "https://placehold.co/400x500/cccccc/ffffff?text=No+Image"
                    }
                    alt={lecturer.nama}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x500/cccccc/ffffff?text=Foto+Dosen";
                    }}
                  />

                  {/* Overlay Gradasi & Teks */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                    {/* Nama Dosen */}
                    <h3 className="text-base font-bold text-white leading-snug mb-1 drop-shadow-md">
                      {lecturer.nama || lecturer.name}
                    </h3>

                    {/* Jabatan */}
                    <p className="text-xs text-gray-200 font-medium leading-relaxed opacity-90">
                      {lecturer.jabatan || lecturer.position || "Dosen"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Tombol Lihat Semua */}
        <motion.div
          className="text-center mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link
            to="/dosen"
            className="bg-primary text-white px-10 py-3 rounded-ifups hover:bg-blue-900 transition-colors inline-block"
          >
            Lihat Semua Dosen
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Dosen;
