import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  Home,
  Info,
  Users,
  GraduationCap,
  Briefcase,
  Newspaper,
  Image,
  Mail,
  Target, // <-- IKON DITAMBAHKAN DI SINI
} from "lucide-react";

const Navbar = ({ onToggleCollapse }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "#home");

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Visi Misi", href: "#visi-misi", icon: Target },
    { name: "Tentang", href: "#tentang", icon: Info },
    { name: "Organisasi", href: "#organisasi", icon: Users },
    { name: "Dosen", href: "#dosen", icon: GraduationCap },
    { name: "Alumni", href: "#alumni", icon: Briefcase },
    { name: "Berita", href: "#berita", icon: Newspaper },

    { name: "Kontak", href: "#kontak", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    if (onToggleCollapse) onToggleCollapse(isCollapsed);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },

      { root: null, rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, [isCollapsed, onToggleCollapse]);

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggleCollapse) onToggleCollapse(newState);
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    window.history.pushState(null, null, href);

    setIsSidebarOpen(false);
  };

  const sidebarWidthClass = isCollapsed ? "w-20" : "w-64";

  return (
    <>
      {!isSidebarOpen && (
        <button
          className={`fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden transition-all ${
            isScrolled
              ? "bg-white text-blue-700 shadow-md"
              : "bg-blue-800 text-white"
          }`}
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 h-full ${sidebarWidthClass} shadow-xl z-40 bg-white transition-all duration-300
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header Sidebar */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-blue-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img
                src="/Logo IFUPS.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <img
                src="/WeAreIFUPS.svg"
                alt="Fakultas Teknik Informatika"
                className="w-12 h-12 object-contain"
              />
            </div>
          )}

          <button
            className={`hidden lg:flex p-1 rounded text-white hover:bg-blue-700 transition ${
              isCollapsed ? "mx-auto" : ""
            }`}
            onClick={handleCollapse}
          >
            {isCollapsed ? (
              <ChevronsRight size={24} />
            ) : (
              <ChevronsLeft size={24} />
            )}
          </button>

          {isSidebarOpen && (
            <button
              className="absolute right-3 top-3 lg:hidden flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          )}
        </div>

        {/* Menu Navigasi */}
        <nav className="mt-6 flex flex-col space-y-2 px-1">
          {navItems.map((item) => {
            const isActive = item.href === activeHash;
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "px-4"
                } py-2 rounded-md transition 
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold border-r-4 border-blue-700"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                // *** INI PERUBAHAN UTAMANYA ***
                onClick={(e) => handleLinkClick(e, item.href)}
                title={item.name}
              >
                <Icon size={24} className={isCollapsed ? "mx-auto" : "mr-3"} />
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            );
          })}
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
