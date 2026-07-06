import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import { TOOLS, PLAN_TOOLS } from "@/lib/tools-config";
import { loadUser, loadDraft, saveDraft, clearDraft, loadPrefs, savePrefs } from "@/lib/store";
import { aiCall, mdToHtml } from "@/lib/providers";
import { ArrowLeft, Copy, Check, Loader2, Lock } from "lucide-react";

export default function ToolRunner() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = toolId ? TOOLS[toolId] : null;
  const user = loadUser();
  const plan = user.plan || "free";
  const allowedTools = PLAN_TOOLS[plan] || PLAN_TOOLS.free;
  const isLocked = toolId ? !allowedTools.includes(toolId) : false;

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [selectedChip, setSelectedChip] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [provider, setProvider] = useState("");

  useEffect(() => {
    if (toolId) {
      const draft = loadDraft(toolId);
      setInputs(draft);
      const prefs = loadPrefs();
      if (tool?.chips) {
        setSelectedChip((prefs as unknown as Record<string, string>)[tool.chips.prefKey] || tool.chips.options[0]?.value || "");
      }
    }
    setOutput("");
    setError("");
  }, [toolId]);

  const handleInputChange = useCallback(
    (id: string, value: string) => {
      setInputs((prev) => {
        const next = { ...prev, [id]: value };
        if (toolId) saveDraft(toolId, next);
        return next;
      });
    },
    [toolId]
  );

  const handleChipChange = useCallback(
    (value: string) => {
      setSelectedChip(value);
      if (tool?.chips) {
        savePrefs({ [tool.chips.prefKey]: value } as Record<string, string>);
      }
    },
    [tool]
  );

  const handleRun = async () => {
    if (!tool) return;
    const missing = tool.inputs.filter((inp) => inp.required && !inputs[inp.id]?.trim());
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map((m) => m.label).join(", ")}`);
      return;
    }
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const systemMsg = tool.systemPrompt(selectedChip);
      const userMsg = tool.userPrompt(inputs, selectedChip);
      const { result, provider: usedProvider } = await aiCall(
        [
          { role: "system", content: systemMsg },
          { role: "user", content: userMsg },
        ],
        { temperature: tool.temperature, max_tokens: tool.maxTokens }
      );
      setOutput(result);
      setProvider(usedProvider);
    } catch (e: unknown) {
      setError((e as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputs({});
    setOutput("");
    setError("");
    if (toolId) clearDraft(toolId);
  };

  if (!tool) {
    return (
      <div className="p-8 text-center">
        <h1 className="font-oswald text-2xl font-bold mb-2 text-[#000000]">Tool Not Found</h1>
        <Link to="/app" className="font-inter text-sm text-[#FF0000] hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center">
        <div className="bg-[#F5F0E8] border-2 border-[#000000] p-8">
          <Lock size={48} className="mx-auto text-[#000000]/20 mb-4" />
          <h1 className="font-oswald text-2xl font-bold mb-2 text-[#000000]">{tool.title}</h1>
          <p className="font-inter text-sm text-[#000000]/60 mb-6">
            This tool requires a {plan === "free" ? "Pro or Premium" : "Premium"} plan.
          </p>
          <Link
            to="/app/plan"
            className="inline-block bg-[#D4FF3D] text-[#000000] px-6 py-3 font-oswald font-bold uppercase border-2 border-[#000000] hover:bg-[#BFFF00] transition-colors"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/app" className="text-[#000000]/50 hover:text-[#000000]">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{tool.icon}</span>
            <h1 className="font-oswald text-xl md:text-2xl font-bold text-[#000000] uppercase">{tool.title}</h1>
          </div>
          <p className="font-inter text-xs text-[#000000]/60 mt-0.5">{tool.subtitle}</p>
        </div>
      </div>

      {tool.chips && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tool.chips.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleChipChange(opt.value)}
              className={`px-3 py-1.5 text-xs font-oswald font-bold uppercase tracking-wider border-2 transition-colors ${
                selectedChip === opt.value
                  ? "bg-[#D4FF3D] text-[#000000] border-[#000000]"
                  : "bg-[#F5F0E8] text-[#000000] border-[#000000] hover:bg-[#D4FF3D]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4 mb-6">
        {tool.inputs.map((inp) => (
          <div key={inp.id}>
            <label className="block font-oswald text-xs font-bold uppercase tracking-wider mb-1.5 text-[#000000]">
              {inp.label}
              {inp.required && <span className="text-[#FF0000] ml-1">*</span>}
            </label>
            {inp.type === "select" && inp.options ? (
              <select
                value={inputs[inp.id] || inp.options[0]?.value || ""}
                onChange={(e) => handleInputChange(inp.id, e.target.value)}
                className="w-full border-2 border-[#000000] px-3 py-2 font-inter text-sm bg-[#F5F0E8] focus:border-[#D4FF3D] outline-none"
              >
                {inp.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : inp.rows && inp.rows > 1 ? (
              <textarea
                value={inputs[inp.id] || ""}
                onChange={(e) => handleInputChange(inp.id, e.target.value)}
                placeholder={inp.placeholder}
                rows={inp.rows}
                className="w-full border-2 border-[#000000] px-3 py-2 font-inter text-sm resize-vertical focus:border-[#D4FF3D] outline-none"
              />
            ) : (
              <input
                type="text"
                value={inputs[inp.id] || ""}
                onChange={(e) => handleInputChange(inp.id, e.target.value)}
                placeholder={inp.placeholder}
                className="w-full border-2 border-[#000000] px-3 py-2 font-inter text-sm focus:border-[#D4FF3D] outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleRun}
          disabled={loading}
          className="flex items-center gap-2 bg-[#D4FF3D] text-[#000000] px-6 py-2.5 font-oswald font-bold uppercase text-sm border-2 border-[#000000] hover:bg-[#BFFF00] transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Running...
            </>
          ) : (
            "▸ Run"
          )}
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2.5 font-oswald text-xs font-bold uppercase border-2 border-[#000000] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-colors"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="bg-[#F5F0E8] border-2 border-[#FF0000] p-4 mb-6">
          <pre className="font-inter text-xs text-[#FF0000] whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      {output && (
        <div className="bg-[#F5F0E8] border-2 border-[#000000]">
          <div className="flex items-center justify-between px-4 py-2 border-b-2 border-[#000000] bg-[#D4FF3D]">
            <span className="font-oswald text-xs font-bold uppercase tracking-wider text-[#000000]">Output</span>
            <div className="flex items-center gap-2">
              {provider && (
                <span className="text-[9px] font-inter text-[#000000]/60">via {provider}</span>
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 text-[10px] font-oswald font-bold uppercase border-2 border-[#000000] bg-[#F5F0E8] hover:bg-[#000000] hover:text-white transition-colors"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          {tool.portfolioOutput ? (
            <iframe
              srcDoc={output}
              title="Portfolio Preview"
              className="w-full h-[600px] border-0"
              sandbox="allow-scripts"
            />
          ) : (
            <div
              className="p-4 font-inter text-sm leading-relaxed prose prose-sm max-w-none
                [&_h1]:font-oswald [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2
                [&_h2]:font-oswald [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1.5
                [&_h3]:font-oswald [&_h3]:text-sm [&_h3]:font-bold [&_h3]:mt-2 [&_h3]:mb-1
                [&_strong]:text-[#000000] [&_code]:bg-[#D4FF3D]/20 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_code]:border [&_code]:border-[#000000]/20
                [&_li]:ml-4 [&_hr]:border-[#000000] [&_hr]:my-3"
              dangerouslySetInnerHTML={{ __html: mdToHtml(output) }}
            />
          )}
        </div>
      )}
    </div>
  );
}
