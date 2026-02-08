import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: "video" | "square" | "wide";
}

/**
 * BlogImage component for hero and inline images in blog posts
 * Features:
 * - Lazy loading by default (eager for hero images with priority prop)
 * - Responsive sizing
 * - SEO-optimized alt text
 * - Optional captions
 * - Aspect ratio control
 * - Blur placeholder for smooth loading
 * - WebP/AVIF optimization via Next.js
 */
export function BlogImage({
  src,
  alt,
  caption,
  priority = false,
  className,
  aspectRatio = "video",
}: BlogImageProps) {
  const aspectRatioClasses = {
    video: "aspect-video", // 16:9
    square: "aspect-square", // 1:1
    wide: "aspect-[21/9]", // Ultra wide
  };

  return (
    <figure className={cn("my-8", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg bg-muted",
          aspectRatioClasses[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 768px"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * BlogHeroImage component specifically for blog post hero images
 * Always uses priority loading and optimized for above-the-fold
 * Includes blur placeholder and quality optimization
 */
export function BlogHeroImage({
  src,
  alt,
  className,
}: Omit<BlogImageProps, "priority" | "aspectRatio">) {
  return (
    <div className={cn("relative w-full aspect-[2/1] overflow-hidden rounded-lg bg-muted shadow-lg", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 900px, 1200px"
        quality={90}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
  );
}
