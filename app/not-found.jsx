import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-y opacity-70" />
      <div className="container-x text-center">
        <p className="eyebrow justify-center">Error</p>
        <h1 className="mt-4 font-display text-[28vw] font-bold leading-none tracking-tightest text-outline sm:text-[14rem]">404</h1>
        <p className="mt-2 font-display text-2xl font-semibold tracking-tight">Page not found.</p>
        <p className="mt-3 text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn btn-solid mt-8">
          <FiArrowLeft /> Back home
        </Link>
      </div>
    </section>
  );
}
