"use client";

import React, { useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { useSiteContent } from "@/lib/site-content-context";

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
          className="bg-background/40 border border-white/10 rounded-xl px-4 py-2 text-[14px] outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-background/40 border border-white/10 rounded-xl px-4 py-2 text-[14px] outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
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
          className="bg-background/40 border border-white/10 rounded-xl px-4 py-2 text-[14px] outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
        />
        <input
          required
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="bg-background/40 border border-white/10 rounded-xl px-4 py-2 text-[14px] outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
        />
      </div>
      <input
        required
        type="text"
        name="company"
        placeholder="Company/Institution"
        value={formData.company}
        onChange={handleChange}
        className="bg-background/40 border border-white/10 rounded-xl px-4 py-2 text-[14px] outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
      />
      <textarea
        required
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        rows={9}
        className="bg-background/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-primary/50 transition-colors resize-none backdrop-blur-sm"
      />

      <div className="mt-1 flex justify-center">
        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground transition-transform active:scale-95 hover:bg-primary/90"
        >
          Send Message
        </a>
      </div>
    </div>
  );
}
