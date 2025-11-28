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

const Alumni = () => {
  const { data: responseData, loading, error } = useFetch("/prestasi");

  const prestasiList = Array.isArray(responseData)
    ? responseData
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  const featuredPrestasi = prestasiList.slice(0, 4);

  if (loading) {
    return (
      <section id="alumni" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Memuat data mahasiswa berprestasi...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section id="alumni" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            MAHASISWA BERPRESTASI
          </h2>
          <p className="text-xl text-gray-600">Kebanggaan Prodi Informatika</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-14"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredPrestasi.map((item) => (
            <motion.div
              key={item.id}
              variants={cardItem}
              className="bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 group"
            >
              <div className="relative">
                <img
                  src={
                    item.foto_url ||
                    "https://placehold.co/400x288/cccccc/ffffff?text=No+Image"
                  }
                  alt={`Foto ${item.nama}`}
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x288/cccccc/ffffff?text=Foto+Mahasiswa";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-secondary via-secondary/80 to-transparent flex flex-col justify-end items-start text-primary p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-base font-semibold drop-shadow-sm line-clamp-1">
                    {item.nama}
                  </h3>
                  <p className="text-sm text-blue-900 font-medium line-clamp-1">
                    {item.kejuaraan}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link
            to="/prestasi"
            className="bg-primary text-white px-10 py-3 rounded-ifups hover:bg-blue-900 transition-colors inline-block"
          >
            Lihat Semua Prestasi
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Alumni;
