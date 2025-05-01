import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@/lib/types";

export default function CategoryNav() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories?.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={category.imageUrl}
                  alt={category.name} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
