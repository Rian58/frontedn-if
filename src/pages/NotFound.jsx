import React from "react";
import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      {/* Dekorasi Latar Belakang (Optional: Memberi nuansa brand) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Ikon Ilustrasi */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-50">
              <FileQuestion size={56} className="text-primary" />
            </div>
            {/* Aksen Kuning (Secondary) */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-md animate-bounce">
              <span className="text-primary font-bold text-lg">!</span>
            </div>
          </div>
        </div>

        {/* Teks Utama */}
        <h1 className="text-8xl font-bold text-primary font-jakarta tracking-tighter mb-2">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Maaf, sepertinya Anda tersesat. Halaman yang Anda cari mungkin telah
          dihapus, dipindahkan, atau link yang Anda tuju salah.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-blue-200 hover:-translate-y-1"
          >
            <Home size={20} />
            Ke Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:text-primary transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>
        </div>
      </div>

      {/* Footer Kecil */}
      <div className="absolute bottom-8 text-xs text-gray-400 font-medium">
        Sistem Informasi Akademik &bull; Prodi Informatika
      </div>
    </div>
  );
};

export default NotFound;
