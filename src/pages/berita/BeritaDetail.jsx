import { useParams, Link } from "react-router-dom";
import { ArrowLeftCircle, Calendar, Tag } from "lucide-react";
import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const BeritaDetail = () => {
  const { slug } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  // Efek animasi saat halaman dimuat
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  // Fetch Data
  const {
    data: articleResponse,
    loading,
    error,
  } = useFetch(`/berita/slug/${slug}`);

  const { data: relatedResponse } = useFetch("/berita?limit=4");

  const extractData = (response) => {
    if (Array.isArray(response)) return response;
    if (response?.data && Array.isArray(response.data)) return response.data;
    return [];
  };

  const article = articleResponse?.data || articleResponse;
  const relatedList = extractData(relatedResponse);
  const relatedNews = relatedList
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  // Error State (404)
  if (error || !article) {
    return (
      <div className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
        {/* Tombol Kembali untuk Halaman Error */}
        <Link
          to="/berita"
          className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeftCircle size={22} className="text-secondary" />
          <span className="font-medium text-primary">Kembali</span>
        </Link>
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-2">Berita tidak ditemukan.</p>
        <Link
          to="/berita"
          className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md"
        >
          Kembali ke Semua Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* --- PERBAIKAN TOMBOL KEMBALI DI SINI --- */}
      <Link
        to="/berita"
        aria-label="Kembali ke Daftar Berita"
        // Menggunakan 'z-[100]' agar selalu di atas elemen lain
        // Menghapus 'hidden sm:inline' agar teks selalu muncul di HP juga
        className="fixed top-4 left-4 md:top-6 md:left-8 z-[100] flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 text-primary transition-all duration-300 group"
      >
        <ArrowLeftCircle
          size={24}
          className="text-secondary group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-bold text-sm"></span>
      </Link>
      {/* ---------------------------------------- */}

      {/* Spacer agar konten tidak tertutup tombol */}
      <div className="h-20 lg:h-24"></div>

      <div className="container mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* KOLOM KIRI (KONTEN UTAMA) */}
          <div className="lg:col-span-8">
            {/* Judul & Metadata */}
            <div
              className={`text-center lg:text-left mb-8 transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight mt-4 md:mt-0">
                {article.judul}
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3 text-gray-600 text-sm">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <Tag size={16} className="text-secondary" />
                  <span className="font-medium">Berita</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <Calendar size={16} className="text-secondary" />
                  <time>
                    {article.created_at
                      ? format(new Date(article.created_at), "d MMMM yyyy", {
                          locale: localeId,
                        })
                      : "-"}
                  </time>
                </div>
              </div>
            </div>

            {/* Gambar Utama */}
            <div
              className={`mb-10 transition-all duration-700 ease-out delay-100 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                <img
                  src={
                    article.foto_url?.startsWith("http")
                      ? article.foto_url
                      : `${import.meta.env.VITE_API_BASE_URL.replace(
                          "/api",
                          ""
                        )}/${article.foto_url}` ||
                        "https://placehold.co/1200x675/cccccc/ffffff?text=No+Image"
                  }
                  alt={article.judul}
                  className="w-full h-auto aspect-video object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/1200x675/cccccc/ffffff?text=Gambar+Tidak+Ditemukan";
                  }}
                />
              </div>
            </div>

            {/* Isi Artikel */}
            <article
              className={`transition-all duration-700 ease-out delay-200 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed 
                           prose-headings:text-primary prose-headings:font-bold 
                           prose-a:text-blue-600 hover:prose-a:text-blue-800 
                           prose-img:rounded-xl 
                           whitespace-pre-wrap break-words overflow-hidden w-full"
              >
                {article.isi}
              </div>
            </article>
          </div>

          {/* KOLOM KANAN (SIDEBAR) */}
          <div
            className={`lg:col-span-4 relative transition-all duration-700 ease-out delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="sticky top-28 bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-6 border-b border-gray-200 pb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-secondary rounded-full"></span>
                Berita Terkait
              </h2>

              <div className="space-y-5">
                {relatedNews.length > 0 ? (
                  relatedNews.map((related) => (
                    <Link
                      to={`/berita/${related.slug}`}
                      key={related.id}
                      className="flex items-start gap-4 group transition-all hover:-translate-y-1 bg-white p-3 rounded-xl border border-gray-100 hover:shadow-md"
                    >
                      <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg shadow-sm border border-gray-200">
                        <img
                          src={
                            related.foto_url?.startsWith("http")
                              ? related.foto_url
                              : `${import.meta.env.VITE_API_BASE_URL.replace(
                                  "/api",
                                  ""
                                )}/${related.foto_url}` ||
                                "https://placehold.co/150x150/cccccc/ffffff?text=Img"
                          }
                          alt={related.judul}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/150x150/cccccc/ffffff?text=Img";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                        <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {related.judul}
                        </h3>
                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-auto">
                          <Calendar size={12} className="text-secondary" />
                          {related.created_at
                            ? format(
                                new Date(related.created_at),
                                "d MMM yyyy",
                                { locale: localeId }
                              )
                            : "-"}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic text-center py-4">
                    Belum ada berita terkait.
                  </p>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                <Link
                  to="/berita"
                  className="text-sm font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1"
                >
                  Lihat Semua Berita{" "}
                  <ArrowLeftCircle size={16} className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaDetail;
