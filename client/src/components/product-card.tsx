import { Link } from "wouter";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md relative group">
      <div className="relative">
        {product.badge && (
          <span 
            className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded ${
              product.badge === 'NEW' ? 'bg-success' : 
              product.badge === 'SALE' ? 'bg-error' : ''
            }`}
          >
            {product.badge === 'SALE' && product.discount ? `-${product.discount}%` : product.badge}
          </span>
        )}
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        <button 
          onClick={() => onQuickView(product)}
          className="quick-view absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-secondary text-sm font-medium py-2 px-4 rounded-full shadow-md opacity-0 transition-opacity duration-300 hover:bg-primary hover:text-white"
        >
          Quick View
        </button>
      </div>
      <div className="p-4">
        {/* Using the rating data from a future API endpoint */}
        <StarRating 
          rating={4.5} 
          reviewCount={24} 
          className="mb-1"
        />
        <h3 className="font-medium mb-1">{product.name}</h3>
        <p className="text-sm text-slate mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="font-bold text-lg">${Number(product.price).toFixed(2)}</p>
            {product.discount && (
              <p className="text-sm text-slate line-through ml-2">
                ${(Number(product.price) * (100 / (100 - Number(product.discount)))).toFixed(2)}
              </p>
            )}
          </div>
          <Button 
            size="icon" 
            className="h-10 w-10 rounded-full bg-primary text-white hover:bg-blue-600"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
