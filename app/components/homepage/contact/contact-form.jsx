"use client";

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "react-toastify";

const fieldCls =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm text-fg placeholder:text-muted/70 outline-none transition-colors duration-300 focus:border-fg";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({ name: "", email: "", message: "" });

  const update = (key) => (e) => setUserInput((s) => ({ ...s, [key]: e.target.value }));

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    }
    if (!isValidEmail(userInput.email)) {
      setError({ required: false, email: true });
      return;
    }
    setError({ email: false, required: false });

    try {
      setIsLoading(true);
      await axios.post("/api/contact", userInput);
      toast.success("Message sent. I'll get back to you soon.");
      setUserInput({ name: "", email: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Failed to send. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSendMail} className="card-surface p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block">
            Name
          </label>
          <input id="name" className={fieldCls} type="text" maxLength={100} value={userInput.name} onChange={update("name")} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">
            Email
          </label>
          <input
            id="email"
            className={fieldCls}
            type="email"
            maxLength={100}
            value={userInput.email}
            onChange={update("email")}
            onBlur={() => setError((s) => ({ ...s, email: userInput.email ? !isValidEmail(userInput.email) : false }))}
            placeholder="you@example.com"
          />
          {error.email && <p className="mt-2 text-xs text-fg/70">Please provide a valid email.</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="eyebrow mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          className={`${fieldCls} resize-none`}
          maxLength={500}
          rows={6}
          value={userInput.message}
          onChange={update("message")}
          placeholder="Tell me about your project, role or idea..."
        />
      </div>

      {error.required && (
        <p className="mt-4 rounded-2xl border border-line bg-bg px-4 py-3 text-xs text-fg/80">All fields are required.</p>
      )}

      <button type="submit" disabled={isLoading} className="btn btn-solid group mt-6 w-full disabled:opacity-60">
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-fg/40 border-t-accent-fg" />
            Sending
          </>
        ) : (
          <>
            Send message
            <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  );
}

export default ContactForm;
