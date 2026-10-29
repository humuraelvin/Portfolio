"use client";

import { personalData } from "@/utils/data/personal-data";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiDownload, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./theme-toggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const HEADER_OFFSET = 72;

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const linkRefs = useRef({});
  const lockUntil = useRef(0);

  // Scroll-driven active section (rAF-throttled, no IntersectionObserver churn)
  useEffect(() => {
    let ticking = false;
    const sections = navLinks.map((l) => ({ href: l.href, el: document.querySelector(l.href) })).filter((s) => s.el);

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Date.now() < lockUntil.current) return;
      const probe = y + window.innerHeight * 0.35;
      let current = "";
      for (const s of sections) {
        if (s.el.offsetTop - HEADER_OFFSET <= probe) current = s.href;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Measure the active link and slide the pill to it
  const measure = useCallback(() => {
    const el = linkRefs.current[active];
    if (!el) {
      setPill((p) => ({ ...p, w: 0 }));
      return;
    }
    setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = useCallback((href) => (e) => {
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    setActive(href);
    lockUntil.current = Date.now() + 900;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 1;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", href);
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color] duration-300 ${
            scrolled ? "border-b border-line bg-bg/90 backdrop-blur-sm" : "border-b border-transparent"
          }`}
        >
          <nav className="container-x flex h-16 sm:h-[72px] items-center justify-between">
            {/* Wordmark */}
            <a href="#home" onClick={goTo("#home")} className="group relative z-50 flex items-center gap-2" aria-label="Home">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fg font-display text-sm font-bold text-bg transition-transform duration-300 group-hover:rotate-[-6deg]">
                E
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                {personalData.firstName}
                <span className="text-muted">.</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="relative hidden lg:flex items-center rounded-full border border-line bg-card p-1">
              <span
                aria-hidden
                className="absolute top-1 bottom-1 left-0 rounded-full bg-fg will-change-transform"
                style={{
                  transform: `translateX(${pill.x}px)`,
                  width: pill.w,
                  opacity: pill.w ? 1 : 0,
                  transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
                }}
              />
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={goTo(link.href)}
                    ref={(el) => (linkRefs.current[link.href] = el)}
                    className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-bg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <a
                href={personalData.resume}
                download={personalData.resumeFileName}
                className="btn btn-solid hidden sm:inline-flex h-10 px-4 text-[13px]"
              >
                <FiDownload size={15} />
                Resume
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="icon-btn relative z-50 lg:hidden"
              >
                {open ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg lg:hidden"
          >
            <div className="container-x flex h-full flex-col pt-24 pb-10">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={goTo(link.href)}
                      className={`group flex items-center justify-between border-b border-line py-4 font-display text-3xl font-semibold tracking-tight ${
                        active === link.href ? "text-fg" : "text-fg/80"
                      }`}
                    >
                      {link.name}
                      <FiArrowUpRight className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="mt-auto flex flex-col gap-3"
              >
                <a
                  href={personalData.resume}
                  download={personalData.resumeFileName}
                  onClick={() => setOpen(false)}
                  className="btn btn-solid w-full"
                >
                  <FiDownload size={16} />
                  Download Resume
                </a>
                <p className="text-center text-xs text-muted">
                  &copy; {new Date().getFullYear()} {personalData.name}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
