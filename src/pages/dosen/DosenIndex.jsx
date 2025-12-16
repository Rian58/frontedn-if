import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircle, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";

/* =====================
   Animation Variants
===================== */
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

const DosenIndex = () => {
  /* =====================
     Fetch Data
  ===================== */
  const { data: responseData, loading, error } = useFetch("/dosen?limit=100");

  /* =====================
     Copy Feedback State
  ===================== */
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (e, text, id) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  /* =====================
     Normalize API Response
  ===================== */
  const dosenList = useMemo(() => {
    if (Array.isArray(responseData)) return responseData;
    if (responseData?.data && Array.isArray(responseData.data)) {
      return responseData.data;
    }
    return [];
  }, [responseData]);

  /* =====================
     Loading State
  ===================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" />
      </div>
    );
  }

  /* =====================
     Error / Empty State
  ===================== */
  if (error || dosenList.length === 0) {
    return (
      <div className="py-24 bg-white min-h-screen relative flex flex-col items-center justify-center text-center px-4">
        <Link
          to="/"
          className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2
                     text-primary bg-white shadow-md px-4 py-2 rounded-full
                     hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
        >
          <ArrowLeftCircle size={24} className="text-secondary" />
          <span className="hidden sm:inline font-medium">Kembali</span>
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-4">Oops!</h1>
        <p className="text-xl text-gray-600">
          Data dosen tidak tersedia saat ini.
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

  /* =====================
     Main Render
  ===================== */
  return (
    <div className="py-24 bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2
                   text-primary bg-white shadow-md px-4 py-2 rounded-full
                   hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </Link>

      <div className="container mx-auto px-4">
        {/* Page Title */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Staf Pengajar
          </h1>
          <p className="text-xl text-gray-600">
            Program Studi Informatika Universitas Pancasakti Tegal
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6" />
        </motion.div>

        {/* Lecturer Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {dosenList.map((dosen) => (
            <motion.div
              key={dosen.id}
              variants={cardItem}
              className="group bg-white shadow-md hover:shadow-xl transition-all
                         overflow-hidden hover:-translate-y-1 border-b-4 border-secondary
                         relative rounded-2xl max-w-xs mx-auto w-full"
            >
              <div className="relative overflow-hidden h-full">
                <img
                  src={
                    dosen.foto_url ||
                    "https://placehold.co/400x500/cccccc/ffffff?text=Foto+Dosen"
                  }
                  alt={dosen.nama}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x500/cccccc/ffffff?text=Foto+Dosen";
                  }}
                />

                {/* Overlay */}
                <div
                  className="absolute bottom-0 left-0 w-full
                                bg-gradient-to-t from-primary via-primary/90 to-transparent
                                pt-28 pb-5 px-5 flex flex-col justify-end"
                >
                  <h3 className="text-base font-bold text-white mb-1 drop-shadow-md">
                    {dosen.nama}
                  </h3>

                  {/* NIP + Copy */}
                  {dosen.nip && (
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-secondary font-semibold uppercase opacity-80">
                        NIP. {dosen.nip}
                      </p>
                      <button
                        onClick={(e) => handleCopy(e, dosen.nip, dosen.id)}
                        className="p-1 rounded-full hover:bg-white/10
                                   text-secondary transition-colors z-10"
                        aria-label="Salin NIP"
                      >
                        {copiedId === dosen.id ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          <Copy size={14} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DosenIndex;
