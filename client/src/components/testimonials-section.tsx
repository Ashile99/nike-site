import { useQuery } from "@tanstack/react-query";
import { StarRating } from "@/components/ui/star-rating";
import { Review } from "@/lib/types";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/testimonials']
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 w-full mb-2"></div>
                <div className="h-4 bg-gray-200 w-full mb-2"></div>
                <div className="h-4 bg-gray-200 w-2/3 mb-6"></div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-200 h-12 w-12 mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-12 text-center">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-amber-400 mb-4">
                <StarRating rating={testimonial.rating} size="base" />
              </div>
              <p className="text-slate mb-6">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.userAvatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.userName)}&background=random`} 
                  alt={testimonial.userName} 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.userName}</h4>
                  {testimonial.userTitle && (
                    <p className="text-sm text-slate">{testimonial.userTitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
