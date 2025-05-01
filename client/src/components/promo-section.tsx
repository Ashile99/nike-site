import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PromoSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Summer Collection 2023</h2>
            <p className="text-lg mb-8">
              Discover our lightweight and breathable summer shoes designed for comfort in hot weather.
            </p>
            <Button asChild className="bg-white text-primary font-medium hover:bg-gray-100 transition-colors">
              <Link href="/category/summer">View Collection</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=400&q=80" 
                alt="Summer shoes 1" 
                className="rounded-lg object-cover h-64 w-full" 
              />
            </div>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=400&q=80" 
                alt="Summer shoes 2" 
                className="rounded-lg object-cover h-64 w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
