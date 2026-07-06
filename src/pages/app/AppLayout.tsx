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
  onNavigate,
}: {
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
          ? "bg-[#D4FF3D] text-[#000000] font-bold"
          : "text-white/70 hover:bg-[#F5F0E8]/10"
      }`}
    >
      <span className="w-6 h-6 flex items-center justify-center shrink-0">{icon}</span>
      <span className="font-oswald uppercase tracking-wide text-xs">{label}</span>
      {badge && (
        <span className="ml-auto text-[10px] bg-[#D4FF3D] text-[#000000] px-1.5 py-0.5 font-bold uppercase">
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
                className="w-full flex items-center gap-2 px-4 py-2.5 mt-1 hover:bg-[#F5F0E8]/10 transition-colors text-white/80"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-[#D4FF3D] text-[#000000] text-xs font-bold shrink-0">
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
                          ? "bg-[#D4FF3D]/30 text-[#D4FF3D] font-bold"
                          : "text-white/60 hover:bg-[#F5F0E8]/5 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{SIDEBAR_TOOL_ICONS[id] || tool.icon}</span>
                      <span className="font-inter">{tool.title}</span>
                      {id === "ats" && (
                        <span className="ml-auto text-[9px] bg-[#D4FF3D] text-[#000000] px-1 py-0.5 font-bold">
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
        <div className="p-4 m-3 border-2 border-[#D4FF3D] bg-[#D4FF3D]">
          <div className="flex items-center gap-2 mb-1">
            <Crown size={16} className="text-[#000000]" />
            <span className="font-oswald text-xs font-bold uppercase text-[#000000]">Upgrade to Premium</span>
          </div>
          <p className="text-[10px] text-[#000000]/60 mb-2 font-inter">
            Unlock 5 more powerful tools
          </p>
          <Link
            to="/app/plan"
            onClick={onNavigate}
            className="block text-center bg-[#000000] text-[#D4FF3D] px-3 py-1.5 text-xs font-oswald font-bold uppercase hover:bg-[#333] transition-colors"
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
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col">
      {/* Top Bar — dark like landing page header */}
      <header className="sticky top-0 z-50 bg-[#000000] border-b-2 border-[#000000] flex items-center h-14 px-4 gap-3">
        <Link to="/app" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-[#D4FF3D] flex items-center justify-center font-oswald font-black text-sm text-[#000000]">
            F
          </div>
          <span className="hidden md:block font-oswald text-sm font-bold uppercase tracking-wider text-white">
            FORGE YAHAVI
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex w-7 h-7 items-center justify-center border border-white/20 hover:bg-[#F5F0E8]/10 transition-colors text-white/60"
        >
          <ChevronLeft size={14} />
        </button>

        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden w-8 h-8 flex items-center justify-center text-white/70"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 max-w-lg mx-auto hidden md:flex items-center gap-2 bg-[#F5F0E8]/10 px-3 py-1.5 border border-white/20">
          <Search size={14} className="text-white/40" />
          <input
            type="text"
            placeholder="Search tools, resumes, keywords..."
            className="flex-1 bg-transparent text-sm font-inter outline-none placeholder:text-white/30 text-white"
          />
          <kbd className="text-[10px] text-white/30 font-mono border border-white/20 px-1">⌘K</kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/app/plan"
            className="hidden sm:flex items-center gap-1.5 bg-[#D4FF3D] text-[#000000] px-3 py-1.5 font-oswald text-xs font-bold uppercase hover:bg-[#BFFF00] transition-colors"
          >
            <Crown size={14} />
            Upgrade Plan
          </Link>

          <button className="relative w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF0000] text-white text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {user.loggedIn ? (
            <Link to="/app/settings" className="w-8 h-8 bg-[#D4FF3D] text-[#000000] flex items-center justify-center font-oswald text-sm font-bold">
              {(user.name || "U")[0].toUpperCase()}
            </Link>
          ) : (
            <Link to="/app/login" className="font-oswald text-xs font-bold uppercase text-[#D4FF3D] hover:text-white transition-colors">
              LOG IN
            </Link>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar — dark */}
        <aside
          className={`hidden md:flex flex-col bg-[#000000] border-r-2 border-[#000000] transition-all duration-200 shrink-0 ${
            sidebarCollapsed ? "w-16" : "w-60"
          }`}
          style={{ height: "calc(100vh - 56px)", position: "sticky", top: 56 }}
        >
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay — dark */}
        {sidebarOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="md:hidden fixed inset-y-0 left-0 w-[280px] bg-[#000000] z-50 flex flex-col shadow-none">
              <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#333]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#D4FF3D] flex items-center justify-center font-oswald font-black text-sm text-[#000000]">
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
              <SidebarContent onNavigate={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Main Content — cream bg like landing page */}
        <main className="flex-1 overflow-y-auto bg-[#F5F0E8]" style={{ height: "calc(100vh - 56px)" }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav — dark */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#000000] border-t-2 border-[#000000] z-30 flex items-center justify-around h-16 px-2">
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
          active ? "bg-[#D4FF3D]" : "bg-[#D4FF3D]/80"
        } text-[#000000] shadow-none`}>
          {icon}
        </div>
        <span className={`text-[9px] font-oswald uppercase tracking-wide ${active ? "text-[#D4FF3D]" : "text-white/40"}`}>
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Link to={to} className="flex flex-col items-center gap-0.5 py-1 px-2">
      <span className={active ? "text-[#D4FF3D]" : "text-white/40"}>{icon}</span>
      <span className={`text-[9px] font-oswald uppercase tracking-wide ${active ? "text-[#D4FF3D] font-bold" : "text-white/40"}`}>
        {label}
      </span>
    </Link>
  );
}
