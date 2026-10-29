"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight custom cursor: a dot that tracks instantly and a ring that eases
 * behind it. Pure transforms on two tiny fixed elements, no blend modes, so it
 * never forces the page to repaint while scrolling. Desktop-only.
 */
export default function AnimatedCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.classList.add("has-custom-cursor");
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;
    let visible = false;
    let hovering = false;
    let idle = true;

    const interactive = "a, button, [role='button'], input, textarea, select, label, .cursor-pointer";

    const tick = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        idle = true;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      if (idle) {
        idle = false;
        raf = requestAnimationFrame(tick);
      }
    };

    const onOver = (e) => {
      const next = Boolean(e.target.closest?.(interactive));
      if (next === hovering) return;
      hovering = next;
      ring.classList.toggle("is-hover", hovering);
      dot.classList.toggle("is-hover", hovering);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden className="cursor-ring" />
      <div ref={dotRef} aria-hidden className="cursor-dot" />
    </>
  );
}
