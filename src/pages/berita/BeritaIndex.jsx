import { Link } from "react-router-dom";
import { ArrowLeftCircle, Search, CalendarDays } from "lucide-react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const BeritaIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: responseData, loading, error } = useFetch("/berita?limit=100");

  const beritaList = Array.isArray(responseData)
    ? responseData
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  const filteredNews = beritaList.filter((item) => {
    return item.judul.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 px-4 text-center">
        <p className="text-xl font-bold mb-2">Gagal memuat berita</p>
        <Link to="/" className="text-primary hover:underline">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gray-50 min-h-screen relative">
      <Link
        to="/"
        aria-label="Kembali ke Halaman Utama"
        className="fixed top-6 left-6 z-30 flex items-center gap-2 text-primary bg-white border border-gray-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all"
      >
        <ArrowLeftCircle size={22} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </Link>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Semua Berita
          </h1>
          <p className="text-lg text-gray-600">
            Prodi Informatika Universitas Pancasakti Tegal
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        <div className="max-w-2xl mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition outline-none"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col md:flex-row group min-h-[250px]"
              >
                <div className="w-full md:w-1/3 h-56 md:h-auto relative overflow-hidden flex-shrink-0">
                  <Link
                    to={`/berita/${item.slug}`}
                    className="block w-full h-full"
                  >
                    <img
                      src={
                        item.foto_url ||
                        "https://placehold.co/600x400/cccccc/ffffff?text=No+Image"
                      }
                      alt={item.judul}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/600x400/cccccc/ffffff?text=Foto+Tidak+Ada";
                      }}
                    />
                  </Link>
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                    Berita
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <CalendarDays size={16} className="text-secondary" />
                    <time>
                      {item.created_at
                        ? format(new Date(item.created_at), "d MMMM yyyy", {
                            locale: id,
                          })
                        : "-"}
                    </time>
                  </div>

                  <Link to={`/berita/${item.slug}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 hover:text-primary transition-colors line-clamp-2 leading-snug break-words">
                      {item.judul}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm md:text-base leading-relaxed break-words">
                    {item.isi}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/berita/${item.slug}`}
                      className="text-primary font-semibold hover:text-secondary transition-colors inline-flex items-center gap-1 group/link"
                    >
                      Baca Selengkapnya
                      <span className="group-hover/link:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Tidak Ada Berita Ditemukan
              </h3>
              <p className="text-gray-500">Coba gunakan kata kunci lain.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeritaIndex;
