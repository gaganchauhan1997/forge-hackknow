import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser, saveUser } from "@/lib/store";
import { ArrowLeft, LogIn } from "lucide-react";

export default function AppLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<"free" | "pro" | "premium">("free");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) return;
    loginUser(name.trim(), email.trim());
    saveUser({ plan });
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[#faf6e9] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border-2 border-[#1a1a1a]">
          <div className="bg-[#1a1a1a] text-white px-6 py-5">
            <span className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] block mb-2">
              Forge Yahavi
            </span>
            <h1 className="font-oswald text-2xl font-bold uppercase">LOG IN</h1>
          </div>

          <div className="px-6 py-6 space-y-4">
            <p className="font-inter text-sm text-[#1a1a1a]/70">
              Sign in to access your AI resume tools, saved drafts, and career dashboard.
            </p>

            <div>
              <label className="block font-oswald text-xs font-bold uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gagan Chauhan"
                className="w-full border-2 border-[#1a1a1a]/20 px-3 py-2 font-inter text-sm focus:border-[#F9FF00] outline-none"
              />
            </div>

            <div>
              <label className="block font-oswald text-xs font-bold uppercase tracking-wider mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-2 border-[#1a1a1a]/20 px-3 py-2 font-inter text-sm focus:border-[#F9FF00] outline-none"
              />
            </div>

            <div>
              <label className="block font-oswald text-xs font-bold uppercase tracking-wider mb-1">
                Select Plan
              </label>
              <div className="flex gap-2">
                {(["free", "pro", "premium"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlan(p)}
                    className={`flex-1 py-2 font-oswald text-xs font-bold uppercase border-2 transition-colors ${
                      plan === p
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "border-[#1a1a1a]/20 hover:border-[#F9FF00]"
                    }`}
                  >
                    {p === "free" ? "FREE" : p === "pro" ? "PRO ₹199" : "PREMIUM ₹599"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={!name.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#F9FF00] text-[#1a1a1a] py-3 font-oswald font-bold uppercase text-sm hover:bg-[#e6e600] transition-colors disabled:opacity-50"
            >
              <LogIn size={18} />
              SIGN IN
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-0 mt-3">
          <div className="h-3 bg-[#F9FF00] border-2 border-[#1a1a1a]" />
          <div className="h-3 bg-[#FF0004] border-2 border-[#1a1a1a]" />
          <div className="h-3 bg-[#1a1a1a] border-2 border-[#1a1a1a]" />
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="font-inter text-xs text-[#1a1a1a]/50 hover:text-[#1a1a1a] flex items-center gap-1 mx-auto"
          >
            <ArrowLeft size={12} /> Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}
