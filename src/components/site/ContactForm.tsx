import React, { useState } from "react";
import { useSiteContent } from "@/lib/site-content-context";
import { THEME_WEB } from "@/lib/site-data";

export function ContactForm() {
  const { contact } = useSiteContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    designation: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mailtoHref = React.useMemo(() => {
    const subject = encodeURIComponent("Query from AVINYA-26 WEBSITE");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Contact: ${formData.contactNumber}\n` +
        `Designation: ${formData.designation}\n` +
        `Company/Institution: ${formData.company}\n\n` +
        `Message:\n${formData.message}`,
    );
    return `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }, [formData, contact.email]);

  const inputClass = THEME_WEB
    ? "bg-[#060918]/65 border border-[#2f6bff]/25 text-white placeholder:text-[#9aa4c8]/60 rounded-xl px-4 py-2 text-[14px] outline-none focus:border-[#e62429]/70 focus:shadow-[0_0_12px_rgba(230,36,41,0.25)] transition-all backdrop-blur-sm"
    : "bg-background/40 border border-white/10 rounded-xl px-4 py-2 text-[14px] outline-none focus:border-primary/50 transition-colors backdrop-blur-sm";

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          required
          type="text"
          name="contactNumber"
          placeholder="Contact"
          value={formData.contactNumber}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          required
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <input
        required
        type="text"
        name="company"
        placeholder="Company/Institution"
        value={formData.company}
        onChange={handleChange}
        className={inputClass}
      />
      <textarea
        required
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        rows={9}
        className={
          THEME_WEB
            ? "bg-[#060918]/65 border border-[#2f6bff]/25 text-white placeholder:text-[#9aa4c8]/60 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#e62429]/70 focus:shadow-[0_0_12px_rgba(230,36,41,0.25)] transition-all resize-none backdrop-blur-sm"
            : "bg-background/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-primary/50 transition-colors resize-none backdrop-blur-sm"
        }
      />

      <div className="mt-1 flex justify-center">
        <a
          href={mailtoHref}
          className={`inline-flex items-center justify-center rounded-full px-8 py-2.5 text-sm font-semibold transition-transform active:scale-95 ${
            THEME_WEB
              ? "bg-[#e62429] text-white shadow-[0_0_18px_rgba(230,36,41,0.6)] hover:bg-[#ff3344] hover:shadow-[0_0_26px_rgba(230,36,41,0.85)]"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          Send Message
        </a>
      </div>
    </div>
  );
}
