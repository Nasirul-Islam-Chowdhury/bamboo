"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-bamboo-800">Contact Us</h1>
        <p className="mt-2 text-bamboo-600">
          Have a question? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-bamboo-700">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bamboo-700">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bamboo-700">Subject</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="What is this about?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bamboo-700">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
          >
            Send Message
          </button>
        </form>

        {/* Contact info */}
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-bamboo-800">
              Get in Touch
            </h2>
            <p className="mt-2 text-bamboo-600">
              We typically respond within 24 hours on business days.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                ),
                label: "Email",
                value: "hello@bambooparts.com",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                ),
                label: "Location",
                value: "Portland, Oregon",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                ),
                label: "Hours",
                value: "Mon-Fri, 9am-5pm EST",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-bamboo-100">
                  <svg
                    className="h-5 w-5 text-bamboo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-bamboo-800">{item.label}</p>
                  <p className="text-sm text-bamboo-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ teaser */}
          <div className="rounded-lg bg-bamboo-100 p-6">
            <h3 className="font-semibold text-bamboo-800">Frequently Asked</h3>
            <ul className="mt-3 space-y-2 text-sm text-bamboo-600">
              <li>- Do you ship internationally? <span className="italic">Yes, worldwide.</span></li>
              <li>- Can I return parts? <span className="italic">Within 30 days, unused.</span></li>
              <li>- Do you offer custom cuts? <span className="italic">Contact us for details.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
