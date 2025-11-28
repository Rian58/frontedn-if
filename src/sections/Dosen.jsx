import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";

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
  // 1. Ambil 'data' mentah dari useFetch (namakan responseData agar tidak bingung)
  const { data: responseData, loading, error } = useFetch("/dosen");

  if (loading) {
    return (
      <section id="dosen" className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Memuat data dosen...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  // 2. PERBAIKAN PENTING: Pastikan kita mengambil Array-nya
  // Cek apakah responseData itu array? Jika ya, pakai.
  // Jika tidak, cek apakah dia punya properti .data (seperti format backend kita)? Jika ya, pakai itu.
  // Jika tidak keduanya, pakai array kosong [].
  const dosenList = Array.isArray(responseData)
    ? responseData
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  // 3. Sekarang aman untuk di-slice karena dosenList pasti Array
  const displayDosen = dosenList.slice(0, 4);

  return (
    <section id="dosen" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            MEET OUR
          </h2>
          <p className="text-xl text-gray-600">LECTURERS</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
        >
          {displayDosen.map((dosen) => (
            <motion.div
              key={dosen.id}
              variants={cardItem}
              className="bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary"
            >
              <div className="relative group">
                <img
                  src={
                    dosen.foto_url ||
                    "https://placehold.co/400x288/cccccc/ffffff?text=No+Image"
                  }
                  alt={dosen.nama}
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x288/cccccc/ffffff?text=Foto+Dosen";
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary via-primary/80 to-transparent flex flex-col justify-end items-start text-white p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-base font-semibold drop-shadow-md line-clamp-1">
                    {dosen.nama}
                  </h3>
                  <p className="text-xs text-gray-200 line-clamp-1 mt-1">
                    {dosen.message || "Dosen Informatika"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mt-14"
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
