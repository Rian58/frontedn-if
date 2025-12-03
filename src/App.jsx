import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import Maintenance from "./pages/Maintenance";
import BeritaIndex from "./pages/berita/BeritaIndex";
import BeritaDetail from "./pages/berita/BeritaDetail";
import DosenIndex from "./pages/dosen/DosenIndex";
import AlumniIndex from "./pages/alumni/AlumniIndex";
// --- VVV IMPOR HALAMAN BARU VVV ---
import AlumniDetail from "./pages/alumni/AlumniDetail"; 
// --- ^^^ AKHIR IMPOR ^^^ ---
import AboutIndex from "./pages/about/AboutIndex";
import NotFound from "./pages/notFound"; // Pastikan file ini ada atau hapus jika belum dibuat
import { appSettings } from "./config/settings";
// import api from "./api/index"; // (Opsional: Jika belum ada backend, bisa dikomentari dulu)

const AppContent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const fullScreenPages = ["/berita", "/dosen", "/alumni", "/about", "/prestasi"];

  const isFullScreen = fullScreenPages.some((path) =>
    location.pathname.startsWith(path)
  );

  const handleCollapseToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  const mainMarginClass = isFullScreen
    ? ""
    : isCollapsed
    ? "lg:ml-20"
    : "lg:ml-64";

  return (
    <div className="App bg-gray-50 min-h-screen">
      <ScrollToTop />

      {!isFullScreen && <Navbar onToggleCollapse={handleCollapseToggle} />}

      <main className={`transition-all duration-300 ${mainMarginClass}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maintenance" element={<Maintenance />} />

          <Route path="/berita" element={<BeritaIndex />} />
          <Route path="/berita/:slug" element={<BeritaDetail />} />
          {/* Note: Pastikan di BeritaDetail Anda menerima param 'slug' atau ganti jadi ':id' jika pakai ID */}

          <Route path="/dosen" element={<DosenIndex />} />

          <Route path="/prestasi" element={<AlumniIndex />} />
          
          {/* --- VVV RUTE BARU UNTUK DETAIL ALUMNI VVV --- */}
          {/* Rute ini menangani klik dari kartu alumni */}
          <Route path="/alumni" element={<AlumniIndex />} />
          <Route path="/alumni/:id" element={<AlumniDetail />} />
          {/* --- ^^^ AKHIR RUTE BARU ^^^ --- */}

          <Route path="/about" element={<AboutIndex />} />

          {/* Fallback route */}
          <Route path="*" element={<div>Halaman Tidak Ditemukan</div>} /> 
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

function App() {
  // State untuk menyimpan status maintenance
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cek status maintenance
  useEffect(() => {
    // Simulasi cek status (jika belum ada backend)
    const checkMaintenanceStatus = async () => {
      try {
        // Jika sudah ada backend:
        // const response = await api.get("/settings/maintenance");
        // setIsMaintenanceMode(response.data.maintenance);
        
        // Untuk sementara hardcode false agar aplikasi jalan
        setIsMaintenanceMode(false); 
      } catch (error) {
        console.error("Gagal mengecek status maintenance:", error);
        setIsMaintenanceMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenanceStatus();
  }, []);

  // Gabungkan dengan setting lokal
  const isMaintenance =
    isMaintenanceMode ||
    import.meta.env.VITE_MAINTENANCE_MODE === "true" ||
    appSettings.maintenanceMode;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      {isMaintenance ? (
        <Routes>
          <Route path="*" element={<Maintenance />} />
        </Routes>
      ) : (
        <AppContent />
      )}
    </Router>
  );
}

export default App;