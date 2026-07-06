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
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#F5F0E8] border-2 border-[#000000]">
          <div className="bg-[#000000] text-white px-6 py-5">
            <span className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#D4FF3D] block mb-2">
              Forge Yahavi
            </span>
            <h1 className="font-oswald text-2xl font-bold uppercase">LOG IN</h1>
          </div>

          <div className="px-6 py-6 space-y-4">
            <p className="font-inter text-sm text-[#000000]/70">
              Sign in to access your AI resume tools, saved drafts, and career dashboard.
            </p>

            <div>
              <label className="block font-oswald text-xs font-bold uppercase tracking-wider mb-1 text-[#000000]">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gagan Chauhan"
                className="w-full border-2 border-[#000000] px-3 py-2 font-inter text-sm focus:border-[#D4FF3D] outline-none"
              />
            </div>

            <div>
              <label className="block font-oswald text-xs font-bold uppercase tracking-wider mb-1 text-[#000000]">
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-2 border-[#000000] px-3 py-2 font-inter text-sm focus:border-[#D4FF3D] outline-none"
              />
            </div>

            <div>
              <label className="block font-oswald text-xs font-bold uppercase tracking-wider mb-1 text-[#000000]">
                Select Plan
              </label>
              <div className="flex gap-0">
                {(["free", "pro", "premium"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlan(p)}
                    className={`flex-1 py-2 font-oswald text-xs font-bold uppercase border-2 transition-colors ${
                      plan === p
                        ? "bg-[#D4FF3D] text-[#000000] border-[#000000]"
                        : "bg-[#F5F0E8] text-[#000000] border-[#000000] hover:bg-[#D4FF3D]"
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
              className="w-full flex items-center justify-center gap-2 bg-[#D4FF3D] text-[#000000] py-3 font-oswald font-bold uppercase text-sm border-2 border-[#000000] hover:bg-[#BFFF00] transition-colors disabled:opacity-50"
            >
              <LogIn size={18} />
              SIGN IN
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-0 mt-3">
          <div className="h-3 bg-[#D4FF3D] border-2 border-[#000000]" />
          <div className="h-3 bg-[#FF0000] border-2 border-[#000000]" />
          <div className="h-3 bg-[#000000] border-2 border-[#000000]" />
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="font-inter text-xs text-[#000000]/50 hover:text-[#000000] flex items-center gap-1 mx-auto"
          >
            <ArrowLeft size={12} /> Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}
