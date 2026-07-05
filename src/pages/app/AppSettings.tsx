import { useState } from "react";
import { loadUser, saveUser, logoutUser, loadKeys, saveKeys } from "@/lib/store";
import { PROVIDERS, PROVIDER_ORDER } from "@/lib/providers";
import {
  User,
  Lock,
  Key,
  GraduationCap,
  BarChart3,
  FileDown,
  LogOut,
  ChevronRight,
  ArrowLeft,
  X,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router";

type SettingsModal = null | "photo" | "name" | "password" | "keys" | "chapters" | "usage" | "history";

export default function AppSettings() {
  const [user, setUser] = useState(loadUser());
  const [activeModal, setActiveModal] = useState<SettingsModal>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const updateUser = (patch: Partial<typeof user>) => {
    const updated = { ...user, ...patch };
    setUser(updated);
    saveUser(patch);
  };

  const settingsItems = [
    {
      icon: <User size={20} />,
      iconBg: "bg-[#F9FF00]",
      title: "Profile Photo",
      subtitle: "Upload or change your profile photo",
      right: user.photo ? (
        <img src={user.photo} alt="" className="w-10 h-10 object-cover border-2 border-[#1a1a1a]" style={{ borderRadius: "50%" }} />
      ) : (
        <div className="w-10 h-10 bg-[#1a1a1a]/10 flex items-center justify-center border-2 border-[#1a1a1a]" style={{ borderRadius: "50%" }}>
          <User size={20} className="text-[#1a1a1a]/30" />
        </div>
      ),
      onClick: () => setActiveModal("photo"),
    },
    {
      icon: <User size={20} />,
      iconBg: "bg-[#F9FF00]",
      title: "Name",
      subtitle: "View or update your name",
      right: <span className="font-inter text-sm text-[#1a1a1a]/60">{user.name || "—"}</span>,
      onClick: () => setActiveModal("name"),
    },
    {
      icon: <Lock size={20} />,
      iconBg: "bg-[#F9FF00]",
      title: "Change Password",
      subtitle: "Reset or change your password",
      onClick: () => setActiveModal("password"),
    },
    {
      icon: <Key size={20} />,
      iconBg: "bg-[#F9FF00]",
      title: "API Keys",
      subtitle: "Manage your API keys",
      onClick: () => setActiveModal("keys"),
    },
    {
      icon: <GraduationCap size={20} />,
      iconBg: "bg-[#F9FF00]",
      title: "Ongoing Chapters of Your Life",
      subtitle: "Add skills, courses, degrees or goals you're currently pursuing",
      badge: "New",
      onClick: () => setActiveModal("chapters"),
    },
    {
      icon: <BarChart3 size={20} />,
      iconBg: "bg-[#F9FF00]",
      title: "API Key Usage",
      subtitle: "View your API key usage and limits",
      onClick: () => setActiveModal("usage"),
    },
    {
      icon: <FileDown size={20} />,
      iconBg: "bg-[#F9FF00]",
      title: "History - Export Invoice",
      subtitle: "Download your invoices and payment history",
      actionButton: (
        <span className="flex items-center gap-1 bg-[#F9FF00] border-2 border-[#1a1a1a] px-2 py-1 text-[10px] font-oswald font-bold uppercase text-[#1a1a1a]">
          <FileDown size={12} /> Download
        </span>
      ),
      onClick: () => setActiveModal("history"),
    },
    {
      icon: <LogOut size={20} />,
      iconBg: "bg-[#FF0004]",
      title: "Logout",
      subtitle: "Sign out from your account",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="md:hidden flex items-center gap-2 mb-3 text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-oswald text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase">Settings</h1>
        <p className="font-inter text-sm text-[#1a1a1a]/60 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {settingsItems.map((item) => (
          <button
            key={item.title}
            onClick={item.onClick}
            className={`bg-white border-2 ${
              item.danger ? "border-[#FF0004] hover:bg-[#FF0004]/5" : "border-[#1a1a1a] hover:border-[#F9FF00]"
            } p-4 flex items-center gap-3 text-left transition-colors w-full`}
          >
            <div className={`w-10 h-10 ${item.iconBg} flex items-center justify-center shrink-0 text-[#1a1a1a] border-2 border-[#1a1a1a]`} style={{ borderRadius: "8px" }}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-oswald text-sm font-bold text-[#1a1a1a]">{item.title}</h3>
                {item.badge && (
                  <span className="text-[9px] bg-[#F9FF00] text-[#1a1a1a] px-1.5 py-0.5 font-bold border border-[#1a1a1a]">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="font-inter text-[11px] text-[#1a1a1a]/50 mt-0.5 truncate">
                {item.subtitle}
              </p>
            </div>
            {item.right && <div className="shrink-0">{item.right}</div>}
            {item.actionButton && <div className="shrink-0">{item.actionButton}</div>}
            {!item.right && !item.actionButton && (
              <ChevronRight size={16} className="text-[#1a1a1a]/30 shrink-0" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 bg-[#F9FF00] border-2 border-[#1a1a1a] p-4 flex items-center justify-center gap-2">
        <Lock size={14} className="text-[#1a1a1a]" />
        <span className="font-inter text-xs text-[#1a1a1a]/80 font-bold">
          Your data is 100% secure and private.
        </span>
      </div>

      <p className="text-center font-inter text-[10px] text-[#1a1a1a]/30 mt-4">
        App Version 1.0.0
      </p>

      {activeModal === "name" && (
        <SettingsModalWrapper title="Update Name" onClose={() => setActiveModal(null)}>
          <NameEditor
            name={user.name}
            onSave={(name) => {
              updateUser({ name });
              setActiveModal(null);
            }}
          />
        </SettingsModalWrapper>
      )}

      {activeModal === "keys" && (
        <SettingsModalWrapper title="API Keys" onClose={() => setActiveModal(null)}>
          <ApiKeysEditor />
        </SettingsModalWrapper>
      )}

      {activeModal === "photo" && (
        <SettingsModalWrapper title="Profile Photo" onClose={() => setActiveModal(null)}>
          <p className="font-inter text-sm text-[#1a1a1a]/60 p-4">
            Photo upload coming soon. Your profile photo will be stored locally in the browser.
          </p>
        </SettingsModalWrapper>
      )}

      {activeModal === "password" && (
        <SettingsModalWrapper title="Change Password" onClose={() => setActiveModal(null)}>
          <p className="font-inter text-sm text-[#1a1a1a]/60 p-4">
            Password management coming soon. Currently using local-only auth.
          </p>
        </SettingsModalWrapper>
      )}

      {activeModal === "chapters" && (
        <SettingsModalWrapper title="Ongoing Chapters" onClose={() => setActiveModal(null)}>
          <p className="font-inter text-sm text-[#1a1a1a]/60 p-4">
            Track your ongoing learning, courses, and goals here. Coming soon.
          </p>
        </SettingsModalWrapper>
      )}

      {activeModal === "usage" && (
        <SettingsModalWrapper title="API Key Usage" onClose={() => setActiveModal(null)}>
          <ApiUsageView />
        </SettingsModalWrapper>
      )}

      {activeModal === "history" && (
        <SettingsModalWrapper title="History & Invoices" onClose={() => setActiveModal(null)}>
          <p className="font-inter text-sm text-[#1a1a1a]/60 p-4">
            No invoices yet. Your payment history will appear here.
          </p>
        </SettingsModalWrapper>
      )}
    </div>
  );
}

function SettingsModalWrapper({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto border-2 border-[#1a1a1a]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#1a1a1a] bg-[#1a1a1a] text-white">
          <h2 className="font-oswald text-sm font-bold uppercase tracking-wider">{title}</h2>
          <button onClick={onClose} className="hover:text-[#F9FF00]">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function NameEditor({ name, onSave }: { name: string; onSave: (name: string) => void }) {
  const [value, setValue] = useState(name);
  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Your name"
        className="w-full border-2 border-[#1a1a1a] px-3 py-2 font-inter text-sm focus:border-[#F9FF00] outline-none"
      />
      <button
        onClick={() => onSave(value)}
        className="w-full bg-[#F9FF00] text-[#1a1a1a] py-2 font-oswald font-bold uppercase text-sm border-2 border-[#1a1a1a] hover:bg-[#e6e600] transition-colors flex items-center justify-center gap-2"
      >
        <Check size={16} /> Save
      </button>
    </div>
  );
}

function ApiKeysEditor() {
  const [keys, setKeys] = useState(loadKeys());

  const handleSave = (provider: string, value: string) => {
    const updated = { ...keys, [provider]: value };
    setKeys(updated);
    saveKeys(updated);
  };

  return (
    <div className="p-4 space-y-4">
      <p className="font-inter text-xs text-[#1a1a1a]/60">
        Bring Your Own Key (BYOK) — paste API keys from free-tier providers below.
        Keys are stored locally in your browser only.
      </p>
      {PROVIDER_ORDER.map((id) => {
        const p = PROVIDERS[id];
        return (
          <div key={id} className="border-2 border-[#1a1a1a] p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-oswald text-xs font-bold uppercase">{p.name}</span>
              <a
                href={p.keyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#1a1a1a] font-bold hover:text-[#FF0004] font-inter"
              >
                Get key →
              </a>
            </div>
            <p className="font-inter text-[10px] text-[#1a1a1a]/50 mb-2">{p.note}</p>
            <input
              type="password"
              placeholder={p.keyHint}
              value={(keys as Record<string, string>)[id] || ""}
              onChange={(e) => handleSave(id, e.target.value)}
              className="w-full border-2 border-[#1a1a1a]/30 px-2 py-1.5 font-mono text-xs focus:border-[#F9FF00] outline-none"
            />
          </div>
        );
      })}
    </div>
  );
}

function ApiUsageView() {
  const keys = loadKeys();
  const activeProviders = PROVIDER_ORDER.filter((id) => (keys as Record<string, string>)[id]);

  return (
    <div className="p-4">
      {activeProviders.length === 0 ? (
        <p className="font-inter text-sm text-[#1a1a1a]/60">
          No API keys configured. Add keys in the API Keys section.
        </p>
      ) : (
        <div className="space-y-3">
          {activeProviders.map((id) => {
            const p = PROVIDERS[id];
            return (
              <div key={id} className="border-2 border-[#1a1a1a] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-oswald text-xs font-bold uppercase">{p.name}</span>
                  <span className="text-[10px] text-green-600 font-bold">● ACTIVE</span>
                </div>
                <p className="font-inter text-[10px] text-[#1a1a1a]/50 mt-1">{p.note}</p>
                <div className="mt-2 w-full h-2 bg-[#1a1a1a]/10 border border-[#1a1a1a]">
                  <div className="h-full bg-[#F9FF00] w-1/4" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
