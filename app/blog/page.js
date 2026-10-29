import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import BlogCard from "../components/homepage/blog/blog-card";

export const metadata = {
  title: `Blog | ${personalData.name}`,
};

async function getBlogs() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = (await getBlogs()).filter((b) => b?.cover_image);

  return (
    <section className="section pt-32">
      <div className="container-x">
        <Link href="/" className="link-underline inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <FiArrowLeft /> Back home
        </Link>
        <p className="eyebrow mt-8">Writing</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tightest sm:text-6xl">Blog.</h1>

        {blogs.length === 0 ? (
          <p className="mt-10 text-muted">No articles yet. Check back soon.</p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
