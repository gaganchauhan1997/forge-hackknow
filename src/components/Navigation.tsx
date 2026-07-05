import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Search, Bell, ChevronDown, Zap } from "lucide-react";

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const desktopTabs = [
    { label: "DASHBOARD", href: "/dashboard" },
    { label: "AI TOOLS", action: () => scrollToSection("portfolio"), badge: "NEW" },
    { label: "MY RESUMES", action: () => scrollToSection("roster") },
    { label: "MY PLAN", action: () => scrollToSection("pricing") },
    { label: "RESOURCES", action: () => scrollToSection("process"), dropdown: true },
    { label: "PRICING", action: () => scrollToSection("pricing") },
  ];

  const mobileTabs = [
    { label: "DASHBOARD", href: "/dashboard", active: location.pathname === "/dashboard" },
    { label: "AI TOOLS", action: () => scrollToSection("portfolio"), badge: "NEW" },
    { label: "MY RESUMES", action: () => scrollToSection("roster") },
    { label: "MY PLAN", action: () => scrollToSection("pricing") },
  ];

  const moreItems = [
    { label: "RESOURCES", action: () => scrollToSection("process") },
    { label: "PRICING", action: () => scrollToSection("pricing") },
    { label: "INQUIRY", action: () => scrollToSection("inquiry") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* ======= DESKTOP NAV ======= */}
      <div className="hidden md:block bg-[#1a1a1a]">
        <div className="flex items-center h-14 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 mr-6">
            <div className="w-8 h-8 bg-[#F9FF00] flex items-center justify-center rounded-sm">
              <span className="font-oswald text-lg font-bold text-[#1a1a1a] leading-none">F</span>
            </div>
            <div className="leading-none">
              <span className="font-oswald text-sm font-bold text-white tracking-wide block">
                FORGE YAHAVI
              </span>
              <span className="font-inter text-[9px] text-white/50 tracking-[0.15em] uppercase">
                AI Career Engine
              </span>
            </div>
          </Link>

          {/* Nav Tabs */}
          <div className="flex items-center gap-1">
            {desktopTabs.map((tab, i) => (
              <button
                key={i}
                onClick={tab.href ? () => (window.location.href = tab.href) : tab.action}
                className="flex items-center gap-1.5 px-3 py-2 font-oswald text-xs font-semibold uppercase tracking-wide text-white/80 hover:text-[#F9FF00] transition-colors rounded"
              >
                {tab.label}
                {tab.badge && (
                  <span className="bg-[#F9FF00] text-[#1a1a1a] font-oswald text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                    {tab.badge}
                  </span>
                )}
                {tab.dropdown && <ChevronDown size={12} className="text-white/50" />}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="flex items-center bg-white/10 rounded px-3 py-1.5 mr-3">
            <Search size={14} className="text-white/50 mr-2" />
            <span className="font-inter text-xs text-white/40 hidden lg:inline">
              Search tools, resumes...
            </span>
            <span className="font-inter text-[9px] text-white/30 ml-4 hidden lg:inline border border-white/20 rounded px-1">
              ⌘ K
            </span>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 mr-2 text-white/70 hover:text-white transition-colors">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 bg-[#F9FF00] text-[#1a1a1a] font-oswald text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center gap-1.5 bg-[#F9FF00] text-[#1a1a1a] font-oswald text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded hover:bg-[#e6eb00] transition-colors"
              >
                <Zap size={12} />
                UPGRADE PLAN
              </button>
              <button
                onClick={logout}
                className="w-7 h-7 rounded-full bg-[#F9FF00] text-[#1a1a1a] font-oswald text-xs font-bold flex items-center justify-center"
                title={user?.name || "Profile"}
              >
                {(user?.name || "U").charAt(0).toUpperCase()}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="font-oswald text-xs font-semibold uppercase tracking-wide text-white/80 hover:text-white transition-colors px-3 py-1.5"
              >
                LOG IN
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1.5 bg-[#F9FF00] text-[#1a1a1a] font-oswald text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded hover:bg-[#e6eb00] transition-colors"
              >
                SIGN UP
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ======= MOBILE NAV ======= */}
      <div className="md:hidden bg-[#1a1a1a]">
        {/* Top row */}
        <div className="flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#F9FF00] flex items-center justify-center rounded-sm">
              <span className="font-oswald text-base font-bold text-[#1a1a1a] leading-none">F</span>
            </div>
            <div className="leading-none">
              <span className="font-oswald text-sm font-bold text-white tracking-wide block">
                FORGE YAHAVI
              </span>
              <span className="font-inter text-[8px] text-white/50 tracking-[0.15em] uppercase">
                AI Career Engine
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button className="p-2 text-white/70">
              <Search size={20} />
            </button>
            <button className="relative p-2 text-white/70">
              <Bell size={20} />
              <span className="absolute top-0.5 right-0.5 bg-[#F9FF00] text-[#1a1a1a] font-oswald text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center border-t border-white/10 overflow-x-auto scrollbar-hide">
          {mobileTabs.map((tab, i) => (
            <button
              key={i}
              onClick={tab.href ? () => (window.location.href = tab.href) : tab.action}
              className={`flex items-center gap-1 px-4 py-2.5 font-oswald text-xs font-semibold uppercase tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                tab.active
                  ? "text-[#F9FF00] border-b-2 border-[#F9FF00]"
                  : "text-white/70"
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="bg-[#F9FF00] text-[#1a1a1a] font-oswald text-[7px] font-bold px-1 py-0.5 rounded-sm">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex items-center gap-1 px-4 py-2.5 font-oswald text-xs font-semibold uppercase tracking-wide text-white/70 whitespace-nowrap shrink-0"
          >
            MORE <ChevronDown size={12} />
          </button>
        </div>

        {/* More dropdown (mobile) */}
        {moreOpen && (
          <div className="bg-[#2a2a2a] border-t border-white/10">
            {moreItems.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="w-full text-left px-6 py-3 font-oswald text-sm font-semibold uppercase text-white/80 hover:text-[#F9FF00] hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Hamburger menu (full items + auth) */}
        {menuOpen && (
          <div className="bg-[#1a1a1a] border-t border-white/10">
            {[...desktopTabs, ...moreItems.filter(m => !desktopTabs.find(d => d.label === m.label))].map((item, i) => (
              <button
                key={i}
                onClick={item.href ? () => (window.location.href = item.href!) : item.action}
                className="w-full text-left px-6 py-4 border-b border-white/10 font-oswald text-base font-semibold uppercase text-white/90 hover:text-[#F9FF00] hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                {item.label}
                {"badge" in item && item.badge && (
                  <span className="bg-[#F9FF00] text-[#1a1a1a] font-oswald text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="px-6 py-4 border-t border-white/10">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/dashboard"
                    className="font-oswald text-base font-semibold uppercase text-white"
                  >
                    {user?.name || "MY ACCOUNT"}
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full bg-white/10 text-white font-oswald text-sm font-bold uppercase tracking-wide py-3 rounded hover:bg-white/20 transition-colors"
                  >
                    LOG OUT
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full bg-[#F9FF00] text-[#1a1a1a] font-oswald text-sm font-bold uppercase tracking-wide py-3 rounded text-center hover:bg-[#e6eb00] transition-colors"
                  >
                    SIGN UP
                  </Link>
                  <Link
                    to="/login"
                    className="w-full border border-white/30 text-white font-oswald text-sm font-bold uppercase tracking-wide py-3 rounded text-center hover:bg-white/10 transition-colors"
                  >
                    LOG IN
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
