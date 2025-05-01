import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroBanner from "@/components/hero-banner";
import CategoryNav from "@/components/category-nav";
import FeaturedProducts from "@/components/featured-products";
import PromoSection from "@/components/promo-section";
import TestimonialsSection from "@/components/testimonials-section";
import NewsletterSection from "@/components/newsletter-section";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: newArrivals, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/new-arrivals']
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <HeroBanner />
      <CategoryNav />
      <FeaturedProducts />
      
      {/* New Arrivals Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">New Arrivals</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-light rounded-lg overflow-hidden shadow-sm p-4 h-96 animate-pulse">
                  <div className="w-full h-64 bg-gray-200 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newArrivals?.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={handleQuickView} 
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <PromoSection />
      <TestimonialsSection />
      <NewsletterSection />
      
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
