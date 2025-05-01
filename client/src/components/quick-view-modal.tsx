import { useState } from "react";
import { Link } from "wouter";
import { X, Heart, Share2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { Product } from "@/lib/types";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("9");
  const [selectedColor, setSelectedColor] = useState("blue");

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  // Sample size and color options, in a real app these would come from the product data
  const sizeOptions = ["7", "8", "9", "10", "11"];
  const colorOptions = [
    { name: "blue", hex: "#3B82F6" },
    { name: "red", hex: "#EF4444" },
    { name: "black", hex: "#000000" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Quick View</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5 text-slate hover:text-primary" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full rounded-lg" 
              />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">{product.name}</h4>
              <p className="text-slate mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <StarRating 
                  rating={4.5} 
                  reviewCount={24} 
                  size="sm" 
                />
                <span className="text-sm text-slate ml-2">(24 reviews)</span>
              </div>
              <p className="text-2xl font-bold mb-4">${Number(product.price).toFixed(2)}</p>
              <div className="mb-6">
                <h5 className="font-medium mb-2">Size</h5>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button 
                      key={size}
                      className={`h-10 w-10 rounded-md border ${
                        selectedSize === size 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-300 hover:border-primary'
                      } flex items-center justify-center transition-colors`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h5 className="font-medium mb-2">Color</h5>
                <div className="flex space-x-2">
                  {colorOptions.map(color => (
                    <button 
                      key={color.name}
                      className={`h-8 w-8 rounded-full`}
                      style={{ 
                        backgroundColor: color.hex,
                        boxShadow: selectedColor === color.name ? '0 0 0 2px white, 0 0 0 4px ' + color.hex : 'none'
                      }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <div className="flex border border-gray-300 rounded-md">
                  <Button variant="ghost" size="icon" onClick={decrementQuantity} className="border-r border-gray-300">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <input 
                    type="number" 
                    value={quantity}
                    readOnly
                    className="w-12 text-center focus:outline-none"
                  />
                  <Button variant="ghost" size="icon" onClick={incrementQuantity} className="border-l border-gray-300">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="flex-grow bg-primary hover:bg-blue-600 text-white font-medium">
                  Add to Cart
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <Button variant="ghost" size="sm" className="text-slate hover:text-primary transition-colors p-0">
                  <Heart className="h-4 w-4 mr-2" /> Add to Wishlist
                </Button>
                <Button variant="ghost" size="sm" className="text-slate hover:text-primary transition-colors p-0">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </div>
              <div className="mt-4">
                <Button asChild variant="link" className="px-0">
                  <Link href={`/product/${product.id}`}>View Full Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
