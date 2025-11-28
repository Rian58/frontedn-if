// src/components/layout/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo IFUPS */}
              <img
                src="/Logo IFUPS.png"
                alt="Logo IFUPS"
                className="h-10 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/003D8D/FECE00?text=IF";
                }}
              />
              <img
                src="/WeAreIFUPS.svg"
                alt="#WEARE IFUPS Logo"
                className="h-10 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/120x40/003D8D/FECE00?text=UPS";
                }}
              />
            </div>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Program Studi Informatika Universitas Pancasakti Tegal -
              Menghasilkan lulusan yang kompeten di bidang teknologi informasi.
            </p>

            {/* --- VVV IKON SOSIAL MEDIA DIPERBARUI (SVG LEBIH BERSIH) VVV --- */}
            <div className="flex space-x-4 items-center">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1M51TP8HXT/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/informatika.upstegal"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@ftikpancasakti3480"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
            {/* --- ^^^ AKHIR PERUBAHAN IKON SOSIAL MEDIA ^^^ --- */}
          </div>

          {/* Link Cepat */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Info Selanjutnya</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://pmb.upstegal.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  PMB-UPS
                </a>
              </li>
              <li>
                <a
                  href="https://upstegal.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  UPS-Tegal
                </a>
              </li>
              <li>
                <a
                  href="https://pmb.upstegal.ac.id/prodi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Program Studi
                </a>
              </li>
              <li>
                <a
                  href="https://lib.upstegal.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Perpustakan
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <address className="not-italic text-gray-300 text-sm space-y-1">
              <p>Jl. Halmahera No.1</p>
              <p>Tegal, Jawa Tengah</p>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:info@ifups.tegal.ac.id"
                  className="hover:text-secondary"
                >
                  info@ifups.tegal.ac.id
                </a>
              </p>
              <p>
                Telp:{" "}
                <a href="tel:62811269009" className="hover:text-secondary">
                  (0283) 351082
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Prodi Informatika UPS Tegal. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
