import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="relative bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Step Into <span className="text-accent">Style</span>
            </h1>
            <p className="text-lg mb-8">
              Discover our new collection of premium footwear designed for comfort and performance.
            </p>
            <div className="flex space-x-4">
              <Button asChild className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                <Link href="/category/men">Shop Men</Link>
              </Button>
              <Button asChild variant="outline" className="bg-white hover:bg-gray-100 text-secondary font-medium py-3 px-6 rounded-lg transition-colors">
                <Link href="/category/women">Shop Women</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Featured running shoes" 
              className="rounded-lg w-full object-cover"
              width="800" 
              height="600"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-white text-center py-4 px-6 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Limited Edition</p>
              <p className="text-2xl font-bold">30% OFF</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
