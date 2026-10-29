"use client";

/**
 * Generated monochrome cover: subtle grid, oversized initials and an index.
 * Pure SVG + CSS variables so it adapts to light/dark automatically.
 */
const ProjectCover = ({ name, index, className = "" }) => {
  const initials = name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div className={`relative overflow-hidden bg-card ${className}`}>
      <div className="absolute inset-0 bg-grid opacity-80" />
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-fg/[0.06] blur-2xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[6rem] font-bold leading-none tracking-tightest text-fg/[0.08] transition-all duration-700 group-hover:scale-110 group-hover:text-fg/[0.14] sm:text-[8rem]">
          {initials}
        </span>
      </div>
      <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.2em] text-muted">
        {String(index).padStart(2, "0")}
      </span>
      <span className="absolute bottom-5 left-5 h-px w-10 bg-fg/40 transition-all duration-500 group-hover:w-20" />
    </div>
  );
};

export default ProjectCover;
