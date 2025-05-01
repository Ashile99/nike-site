import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Product, Review } from "@/lib/types";
import { Heart, Share2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : 0;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("9");
  const [selectedColor, setSelectedColor] = useState("blue");

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`]
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: [`/api/products/${productId}/reviews`]
  });

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (productLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-lg h-[500px] animate-pulse"></div>
          <div>
            <div className="h-8 bg-gray-200 w-3/4 mb-4 rounded"></div>
            <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
            <div className="h-4 bg-gray-200 w-full mb-6 rounded"></div>
            <div className="h-8 bg-gray-200 w-1/4 mb-8 rounded"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 w-1/4 rounded"></div>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  // Sample size and color options, in a real app these would come from the product data
  const sizeOptions = ["7", "8", "9", "10", "11"];
  const colorOptions = [
    { name: "blue", hex: "#3B82F6" },
    { name: "red", hex: "#EF4444" },
    { name: "black", hex: "#000000" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full rounded-lg" 
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-slate mb-4">{product.description}</p>
          <div className="flex items-center mb-6">
            <StarRating 
              rating={4.5} 
              reviewCount={reviews?.length || 0} 
              size="sm" 
            />
            <span className="text-sm text-slate ml-2">({reviews?.length || 0} reviews)</span>
          </div>
          
          <p className="text-3xl font-bold mb-8">${Number(product.price).toFixed(2)}</p>
          
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="font-medium mb-3">Size</h2>
              <div className="flex flex-wrap gap-3">
                {sizeOptions.map(size => (
                  <button 
                    key={size}
                    className={`h-12 w-12 rounded-md border ${
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
            
            <div>
              <h2 className="font-medium mb-3">Color</h2>
              <div className="flex space-x-4">
                {colorOptions.map(color => (
                  <button 
                    key={color.name}
                    className={`h-10 w-10 rounded-full`}
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
          </div>
          
          <div className="flex space-x-4 mb-8">
            <div className="flex border border-gray-300 rounded-md">
              <Button variant="ghost" size="icon" onClick={decrementQuantity} className="border-r border-gray-300">
                <Minus className="h-4 w-4" />
              </Button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                className="w-16 text-center focus:outline-none"
              />
              <Button variant="ghost" size="icon" onClick={incrementQuantity} className="border-l border-gray-300">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-grow bg-primary hover:bg-blue-600 text-white font-medium py-3">
              <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
            </Button>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Button variant="ghost" size="sm" className="text-slate hover:text-primary transition-colors p-0">
              <Heart className="h-5 w-5 mr-2" /> Add to Wishlist
            </Button>
            <Button variant="ghost" size="sm" className="text-slate hover:text-primary transition-colors p-0">
              <Share2 className="h-5 w-5 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="border-b w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews?.length || 0})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus auctor, nisl eget ultricies tincidunt, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Nulla facilisi. Phasellus auctor, nisl eget ultricies tincidunt, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.</p>
              <ul>
                <li>Breathable mesh upper for lightweight comfort</li>
                <li>Responsive cushioning for a smooth stride</li>
                <li>Durable rubber outsole for traction</li>
                <li>Padded collar and tongue for comfort</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-4">Product Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-slate">Style</span>
                    <span>Athletic</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate">Material</span>
                    <span>Synthetic, Mesh</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate">Closure</span>
                    <span>Lace-up</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate">Water Resistant</span>
                    <span>No</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Sizing Information</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-slate">Fit</span>
                    <span>True to size</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate">Available Size</span>
                    <span>7-13 US</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate">Weight</span>
                    <span>9.5 oz</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            {reviewsLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border-b pb-6 animate-pulse">
                    <div className="h-4 bg-gray-200 w-24 mb-2 rounded"></div>
                    <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                    <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                  </div>
                ))}
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <span className="text-sm text-slate">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>This product doesn't have any reviews yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
