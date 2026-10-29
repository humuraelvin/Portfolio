import { timeConverter } from "@/utils/time-converter";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiHeart, FiMessageSquare } from "react-icons/fi";

function BlogCard({ blog }) {
  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden">
      <Link href={blog.url} target="_blank" className="relative block h-48 overflow-hidden">
        <Image
          src={blog?.cover_image}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={blog.title}
          className="mono-img object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{timeConverter(blog.published_at)}</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FiHeart size={12} /> {blog.public_reactions_count}
            </span>
            {blog.comments_count > 0 && (
              <span className="flex items-center gap-1">
                <FiMessageSquare size={12} /> {blog.comments_count}
              </span>
            )}
          </span>
        </div>
        <Link href={blog.url} target="_blank" className="mt-3 font-display text-lg font-semibold tracking-tight hover:underline">
          {blog.title}
        </Link>
        <p className="mt-1 text-xs text-muted">{blog.reading_time_minutes} min read</p>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-fg/80">{blog.description}</p>
        <Link href={blog.url} target="_blank" className="link-underline mt-4 inline-flex items-center gap-1 text-sm font-medium">
          Read article <FiArrowUpRight />
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
