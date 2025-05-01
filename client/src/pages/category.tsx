import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Category } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const categorySlug = params?.category || "";
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${categorySlug}`]
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: [`/api/products?category=${categorySlug}&sort=${sortBy}`]
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const isLoading = categoryLoading || productsLoading;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-lg overflow-hidden">
        <div className="h-64 bg-gradient-to-r from-secondary to-primary">
          {category && !categoryLoading && (
            <img 
              src={category.imageUrl} 
              alt={category.name} 
              className="w-full h-full object-cover mix-blend-overlay opacity-40"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">
                {isLoading ? "Loading..." : category?.name}
              </h1>
              <p className="text-lg max-w-2xl mx-auto">
                {isLoading ? "" : category?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {isLoading ? "Loading products..." : `${products?.length || 0} Products`}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
          <Select defaultValue={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md p-4 h-96 animate-pulse">
              <div className="w-full h-64 bg-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={handleQuickView} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-slate">Try adjusting your filters or check back later for new arrivals.</p>
        </div>
      )}

      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
