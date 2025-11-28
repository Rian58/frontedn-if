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
import AboutIndex from "./pages/about/AboutIndex";
import NotFound from "./pages/notFound";
import { appSettings } from "./config/settings";
import api from "./api/index"; // Pastikan path ini benar sesuai struktur Anda

const AppContent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const fullScreenPages = ["/berita", "/dosen", "/prestasi", "/about"];

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

          <Route path="/dosen" element={<DosenIndex />} />

          <Route path="/prestasi" element={<AlumniIndex />} />

          <Route path="/about" element={<AboutIndex />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

function App() {
  // State untuk menyimpan status maintenance dari API
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cek status maintenance dari API saat aplikasi dimuat
  useEffect(() => {
    const checkMaintenanceStatus = async () => {
      try {
        // Panggil endpoint publik yang sudah dibuat di backend
        // Pastikan endpoint ini tidak memerlukan token (public route)
        const response = await api.get("/settings/maintenance");
        if (response.data && response.data.success) {
          setIsMaintenanceMode(response.data.maintenance);
        }
      } catch (error) {
        console.error("Gagal mengecek status maintenance:", error);
        // Default ke false jika gagal agar web tetap bisa diakses
        setIsMaintenanceMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenanceStatus();
  }, []);

  // Gabungkan dengan setting lokal (jika ada)
  const isMaintenance =
    isMaintenanceMode ||
    import.meta.env.VITE_MAINTENANCE_MODE === "true" ||
    appSettings.maintenanceMode;

  if (isLoading) {
    // Tampilkan loading screen sederhana saat cek status
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      {isMaintenance ? (
        <Routes>
          {/* Izinkan akses ke halaman login admin meskipun maintenance */}
          {/* Jika Anda punya halaman login admin di frontend ini, tambahkan rutenya di sini */}
          {/* <Route path="/admin/login" element={<LoginAdmin />} /> */}

          {/* Semua rute lain diarahkan ke Maintenance */}
          <Route path="*" element={<Maintenance />} />
        </Routes>
      ) : (
        <AppContent />
      )}
    </Router>
  );
}

export default App;
