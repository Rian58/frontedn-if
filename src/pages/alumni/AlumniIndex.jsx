import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";

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

const AlumniIndex = () => {
  const {
    data: responseData,
    loading,
    error,
  } = useFetch("/prestasi?limit=100");

  const alumniList = Array.isArray(responseData)
    ? responseData
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

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
          Data mahasiswa berprestasi tidak dapat dimuat atau belum tersedia.
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
      <Link
        to="/"
        aria-label="Kembali ke Halaman Utama"
        className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2 text-primary bg-white shadow-md px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </Link>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Mahasiswa Berprestasi
          </h1>
          <p className="text-xl text-gray-600">
            Kebanggaan Prodi Informatika Universitas Pancasakti Tegal
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {alumniList.map((alumnus) => (
            <motion.div
              key={alumnus.id}
              variants={cardItem}
              className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl"
            >
              <div className="relative overflow-hidden h-full">
                <img
                  src={
                    alumnus.foto_url ||
                    "https://placehold.co/400x500/cccccc/ffffff?text=No+Image"
                  }
                  alt={alumnus.nama}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x500/cccccc/ffffff?text=Foto+Mahasiswa";
                  }}
                />

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary via-secondary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                  <h3 className="text-base font-bold text-primary leading-snug mb-1 drop-shadow-sm line-clamp-1">
                    {alumnus.nama}
                  </h3>
                  <p className="text-xs text-blue-900 font-medium leading-relaxed opacity-90 line-clamp-2">
                    {alumnus.kejuaraan || alumnus.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AlumniIndex;
