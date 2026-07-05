import { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Youtube, Github, Shield, Lock, Zap } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Resume Builder", href: "#portfolio" },
    { label: "ATS Intelligence", href: "#portfolio" },
    { label: "Resume Roast", href: "#portfolio" },
    { label: "Job Tailoring", href: "#portfolio" },
    { label: "Cover Letter", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Career Guides", href: "#" },
    { label: "Resume Templates", href: "#" },
    { label: "Interview Questions", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Support", href: "#inquiry" },
    { label: "FAQs", href: "#" },
    { label: "Report a Bug", href: "#" },
    { label: "Feature Request", href: "#" },
    { label: "System Status", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "X (Twitter)", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

function AccordionSection({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-0"
      >
        <span className="font-oswald text-sm font-bold uppercase tracking-wider text-white">{title}</span>
        <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-4 space-y-2">
          {items.map((item) => (
            <a key={item.label} href={item.href} className="block font-inter text-sm text-white/60 hover:text-[#F9FF00] transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Typical Timeline */}
      <div className="border-t border-white/10 px-6 md:px-12 lg:px-20 py-10">
        <h3 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-8">
          Typical Timeline
        </h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9FF00] text-black font-oswald text-xs font-bold shrink-0">24h</span>
            <div>
              <p className="font-oswald text-base font-bold text-white">Instant Response</p>
              <p className="font-inter text-sm text-white/60">We review your brief and get back fast</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF0004] text-white font-oswald text-xs font-bold shrink-0">48h</span>
            <div>
              <p className="font-oswald text-base font-bold text-white">AI + Expert Matching</p>
              <p className="font-inter text-sm text-white/60">Matched with the perfect expert</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/30 text-white font-oswald text-xs font-bold shrink-0">7d</span>
            <div>
              <p className="font-oswald text-base font-bold text-white">First Drafts</p>
              <p className="font-inter text-sm text-white/60">Initial concepts delivered for your review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="border-t border-white/10 px-6 md:px-12 lg:px-20 py-10">
        <h3 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-6">
          Contact
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-white/60 shrink-0" />
            <span className="font-inter text-sm text-white/80">hello@forgeyahavi.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-white/60 shrink-0" />
            <span className="font-inter text-sm text-white/80">+91 98765 43210</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
            <span className="font-inter text-sm text-white/80">
              B-23, First Floor, Sector 63<br />
              Noida, Uttar Pradesh 201301, India
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer - Desktop */}
      <div className="hidden md:block border-t border-white/10 px-12 lg:px-20 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#F9FF00] flex items-center justify-center">
                <span className="font-oswald text-black text-lg font-bold italic">F</span>
              </div>
              <span className="font-oswald text-xl font-bold uppercase tracking-tight">FORGE YAHAVI</span>
            </div>
            <p className="font-inter text-xs text-white/60 leading-relaxed mb-6 max-w-[240px]">
              AI-powered career platform to build, analyze, tailor and grow your career. Your career. Forged to perfection.
            </p>
            <div className="flex items-center gap-3 text-xs text-white/50 font-inter">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#F9FF00]" /> Secure</span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#F9FF00]" /> Privacy First</span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#F9FF00]" /> BYOK Ready</span>
            </div>
          </div>

          {/* Product */}
          <div className="col-span-2">
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-4">Product</h4>
            <div className="space-y-2">
              {footerLinks.product.map((item) => (
                <a key={item.label} href={item.href} className="block font-inter text-sm text-white/60 hover:text-[#F9FF00] transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="col-span-2">
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-4">Resources</h4>
            <div className="space-y-2">
              {footerLinks.resources.map((item) => (
                <a key={item.label} href={item.href} className="block font-inter text-sm text-white/60 hover:text-[#F9FF00] transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="col-span-2">
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-4">Support</h4>
            <div className="space-y-2">
              {footerLinks.support.map((item) => (
                <a key={item.label} href={item.href} className="block font-inter text-sm text-white/60 hover:text-[#F9FF00] transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="col-span-2">
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-4">Company</h4>
            <div className="space-y-2">
              {footerLinks.company.map((item) => (
                <a key={item.label} href={item.href} className="block font-inter text-sm text-white/60 hover:text-[#F9FF00] transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-4">Connect</h4>
            <div className="space-y-2">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-2 font-inter text-sm text-white/60 hover:text-[#F9FF00] transition-colors">
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Mobile */}
      <div className="md:hidden border-t border-white/10 px-6 py-8">
        {/* Logo + Tagline + Social */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-[#F9FF00] flex items-center justify-center">
              <span className="font-oswald text-black text-base font-bold italic">F</span>
            </div>
            <span className="font-oswald text-lg font-bold uppercase tracking-tight">FORGE YAHAVI</span>
          </div>
          <p className="font-inter text-xs text-white/60 leading-relaxed mb-4">
            AI-powered career platform to grow your career.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-white/60 hover:text-[#F9FF00] transition-colors">
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Accordion Menus */}
        <div className="mb-6">
          <AccordionSection title="Product" items={footerLinks.product} />
          <AccordionSection title="Resources" items={footerLinks.resources} />
          <AccordionSection title="Support" items={footerLinks.support} />
          <AccordionSection title="Company" items={footerLinks.company} />
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#F9FF00] mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#F9FF00] shrink-0" />
              <span className="font-inter text-sm text-white/80">hello@forgeyahavi.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#F9FF00] shrink-0" />
              <span className="font-inter text-sm text-white/80">+91 98765 43210</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#F9FF00] shrink-0 mt-0.5" />
              <span className="font-inter text-sm text-white/80">
                B-23, First Floor, Sector 63<br />
                Noida, UP 201301, India
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-3 text-xs text-white/50 font-inter mb-6">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#F9FF00]" /> Secure</span>
          <span className="text-white/30">·</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#F9FF00]" /> Privacy First</span>
          <span className="text-white/30">·</span>
          <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#F9FF00]" /> BYOK Ready</span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 px-6 md:px-12 lg:px-20 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="font-inter text-xs text-white/40">
          &copy; 2026 Forge Yahavi. All rights reserved.
        </span>
        <span className="font-inter text-xs text-white/40">
          Made with <span className="text-red-500">&#10084;</span> in India
        </span>
      </div>
    </footer>
  );
}
