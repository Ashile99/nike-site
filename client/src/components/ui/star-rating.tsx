import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "xs" | "sm" | "base";
  className?: string;
}

export function StarRating({ rating, reviewCount, size = "xs", className }: StarRatingProps) {
  // Create an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) {
      return "fas fa-star"; // Full star
    } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
      return "fas fa-star-half-alt"; // Half star
    } else {
      return "far fa-star"; // Empty star
    }
  });

  const sizeClass = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex text-amber-400">
        {stars.map((star, index) => (
          <i key={index} className={cn(star, sizeClass[size])}></i>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className={cn("text-slate ml-1", sizeClass[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
