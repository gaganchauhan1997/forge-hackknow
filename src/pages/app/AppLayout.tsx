import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { TOOLS, CATEGORIES } from "@/lib/tools-config";
import { loadUser } from "@/lib/store";
import {
  Home,
  Upload,
  FileText,
  CreditCard,
  Bot,
  Settings,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Search,
  Bell,
  Crown,
  X,
  Menu,
} from "lucide-react";

const SIDEBAR_TOOL_ICONS: Record<string, string> = {
  builder: "📝", "bullet-upgrader": "✏️", portfolio: "🖼️", gap: "🔄",
  "quick-achievement": "🏆", ats: "📊", "scan-6sec": "⏱️", roast: "🔥",
  "tailor-jd": "🎯", "truth-lock": "🔒", "company-tailor": "🏢",
  "cover-letter": "✉️", "recruiter-hook": "🪝", "app-pack": "📦",
  "role-finder": "🧭", "app-optimizer": "📈", prep: "🎤",
};

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    build: true, analyze: true, tailor: true, outreach: true, strategy: true,
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const navLink = (to: string, icon: React.ReactNode, label: string, badge?: string) => (
    <Link
      to={to}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
        isActive(to)
          ? "bg-[#F9FF00] text-[#1a1a1a] font-bold"
          : "text-white/70 hover:bg-white/10"
      }`}
    >
      <span className="w-6 h-6 flex items-center justify-center shrink-0">{icon}</span>
      <span className="font-oswald uppercase tracking-wide text-xs">{label}</span>
      {badge && (
        <span className="ml-auto text-[10px] bg-[#F9FF00] text-[#1a1a1a] px-1.5 py-0.5 font-bold uppercase">
          {badge}
        </span>
      )}
    </Link>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-2">
        {navLink("/app", <Home size={18} />, "Dashboard")}
        {navLink("/app/upload", <Upload size={18} />, "Upload Resume")}

        {CATEGORIES.map((cat) => {
          const toolsInCat = Object.entries(TOOLS).filter(([, t]) => t.category === cat.id);
          const isOpen = openCategories[cat.id];
          return (
            <div key={cat.id}>
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-2 px-4 py-2.5 mt-1 hover:bg-white/10 transition-colors text-white/80"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-[#F9FF00] text-[#1a1a1a] text-xs font-bold shrink-0" style={{ borderRadius: "50%" }}>
                  {cat.num}
                </span>
                <span className="font-oswald text-xs font-bold uppercase tracking-wider">
                  {cat.label}
                </span>
                <span className="ml-auto text-white/40">
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>
              {isOpen && (
                <div className="ml-2">
                  {toolsInCat.map(([id, tool]) => (
                    <Link
                      key={id}
                      to={`/app/tool/${id}`}
                      onClick={onNavigate}
                      className={`flex items-center gap-3 px-4 py-2 text-xs transition-colors ${
                        location.pathname === `/app/tool/${id}`
                          ? "bg-[#F9FF00]/20 text-[#F9FF00] font-bold"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{SIDEBAR_TOOL_ICONS[id] || tool.icon}</span>
                      <span className="font-inter">{tool.title}</span>
                      {id === "ats" && (
                        <span className="ml-auto text-[9px] bg-[#F9FF00] text-[#1a1a1a] px-1 py-0.5 font-bold">
                          Free
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="mt-4 border-t border-white/10 pt-2">
          {navLink("/app/resumes", <FileText size={18} />, "My Resumes")}
          {navLink("/app/plan", <CreditCard size={18} />, "My Plan", loadUser().plan !== "free" ? loadUser().plan.toUpperCase() : undefined)}
          {navLink("/app/yahavi", <Bot size={18} />, "Yahavi AI")}
          {navLink("/app/settings", <Settings size={18} />, "Settings")}
        </div>
      </div>

      {loadUser().plan === "free" && (
        <div className="p-4 m-3 bg-[#F9FF00]/10 border-2 border-[#F9FF00]/40">
          <div className="flex items-center gap-2 mb-1">
            <Crown size={16} className="text-[#F9FF00]" />
            <span className="font-oswald text-xs font-bold uppercase text-white">Upgrade to Premium</span>
          </div>
          <p className="text-[10px] text-white/50 mb-2 font-inter">
            Unlock 5 more powerful tools
          </p>
          <Link
            to="/app/plan"
            onClick={onNavigate}
            className="block text-center bg-[#F9FF00] text-[#1a1a1a] px-3 py-1.5 text-xs font-oswald font-bold uppercase hover:bg-[#e6e600] transition-colors"
          >
            Upgrade Now →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed] = useState(false);
  const user = loadUser();

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#111] border-b border-white/10 flex items-center h-14 px-4 gap-3">
        {/* Logo */}
        <Link to="/app" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-[#F9FF00] flex items-center justify-center font-oswald font-black text-sm text-[#1a1a1a]">
            F
          </div>
          <span className="hidden md:block font-oswald text-sm font-bold uppercase tracking-wider text-white">
            FORGE YAHAVI
          </span>
        </Link>

        {/* Sidebar toggle (desktop) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex w-7 h-7 items-center justify-center border border-white/20 hover:bg-white/10 transition-colors text-white/60"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden w-8 h-8 flex items-center justify-center text-white/70"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-auto hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 border border-white/10">
          <Search size={14} className="text-white/40" />
          <input
            type="text"
            placeholder="Search tools, resumes, keywords..."
            className="flex-1 bg-transparent text-sm font-inter outline-none placeholder:text-white/30 text-white"
          />
          <kbd className="text-[10px] text-white/30 font-mono border border-white/20 px-1">⌘K</kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Upgrade */}
          <Link
            to="/app/plan"
            className="hidden sm:flex items-center gap-1.5 bg-[#F9FF00] text-[#1a1a1a] px-3 py-1.5 font-oswald text-xs font-bold uppercase hover:bg-[#e6e600] transition-colors"
          >
            <Crown size={14} />
            Upgrade Plan
          </Link>

          {/* Bell */}
          <button className="relative w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF0004] text-white text-[9px] font-bold flex items-center justify-center" style={{ borderRadius: "50%" }}>
              3
            </span>
          </button>

          {/* User Avatar */}
          {user.loggedIn ? (
            <Link to="/app/settings" className="w-8 h-8 bg-[#F9FF00] text-[#1a1a1a] flex items-center justify-center font-oswald text-sm font-bold" style={{ borderRadius: "50%" }}>
              {(user.name || "U")[0].toUpperCase()}
            </Link>
          ) : (
            <Link to="/app/login" className="font-oswald text-xs font-bold uppercase text-[#F9FF00] hover:text-white transition-colors">
              LOG IN
            </Link>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col bg-[#111] border-r border-white/10 transition-all duration-200 shrink-0 ${
            sidebarCollapsed ? "w-16" : "w-60"
          }`}
          style={{ height: "calc(100vh - 56px)", position: "sticky", top: 56 }}
        >
          <SidebarContent collapsed={sidebarCollapsed} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="md:hidden fixed inset-y-0 left-0 w-[280px] bg-[#111] z-50 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#F9FF00] flex items-center justify-center font-oswald font-black text-sm text-[#1a1a1a]">
                    F
                  </div>
                  <span className="font-oswald text-sm font-bold uppercase tracking-wider text-white">
                    FORGE YAHAVI
                  </span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent collapsed={false} onNavigate={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto" style={{ height: "calc(100vh - 56px)" }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111] border-t border-white/10 z-30 flex items-center justify-around h-16 px-2">
        <BottomNavItem to="/app" icon={<Home size={20} />} label="Dashboard" />
        <BottomNavItem to="/app/resumes" icon={<FileText size={20} />} label="My Resumes" />
        <BottomNavItem to="/app/yahavi" icon={<Bot size={22} />} label="Yahavi AI" center />
        <BottomNavItem to="/app/plan" icon={<CreditCard size={20} />} label="My Plan" />
        <BottomNavItem to="/app/settings" icon={<Settings size={20} />} label="Settings" />
      </nav>
    </div>
  );
}

function BottomNavItem({
  to,
  icon,
  label,
  center,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  center?: boolean;
}) {
  const location = useLocation();
  const active = location.pathname === to;

  if (center) {
    return (
      <Link to={to} className="flex flex-col items-center gap-0.5 -mt-4">
        <div className={`w-12 h-12 flex items-center justify-center ${
          active ? "bg-[#F9FF00]" : "bg-[#F9FF00]/80"
        } text-[#1a1a1a] shadow-lg`} style={{ borderRadius: "50%" }}>
          {icon}
        </div>
        <span className={`text-[9px] font-oswald uppercase tracking-wide ${active ? "text-[#F9FF00]" : "text-white/40"}`}>
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Link to={to} className="flex flex-col items-center gap-0.5 py-1 px-2">
      <span className={active ? "text-[#F9FF00]" : "text-white/40"}>{icon}</span>
      <span className={`text-[9px] font-oswald uppercase tracking-wide ${active ? "text-[#F9FF00] font-bold" : "text-white/40"}`}>
        {label}
      </span>
    </Link>
  );
}
