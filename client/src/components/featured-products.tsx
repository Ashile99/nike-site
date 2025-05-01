import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";
import { QuickViewModal } from "@/components/quick-view-modal";

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured']
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md p-4 h-96 animate-pulse">
                <div className="w-full h-64 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white hover:border-primary transition-colors"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-4 w-4 text-slate" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white hover:border-primary transition-colors"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4 text-slate" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
          <div className="flex space-x-4 pb-4">
            {products?.map(product => (
              <div key={product.id} className="flex-shrink-0 w-64 md:w-72">
                <ProductCard 
                  product={product} 
                  onQuickView={handleQuickView} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
