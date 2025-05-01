import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Search, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { 
      label: "Men", 
      href: "#", 
      children: [
        { label: "Running", href: "/category/men-running" },
        { label: "Basketball", href: "/category/men-basketball" },
        { label: "Casual", href: "/category/men-casual" },
        { label: "Formal", href: "/category/men-formal" }
      ]
    },
    { 
      label: "Women", 
      href: "#", 
      children: [
        { label: "Running", href: "/category/women-running" },
        { label: "Lifestyle", href: "/category/women-lifestyle" },
        { label: "Heels", href: "/category/women-heels" },
        { label: "Boots", href: "/category/women-boots" }
      ]
    },
    { label: "New Arrivals", href: "/category/new-arrivals" },
    { label: "Sale", href: "/category/sale" },
    { label: "About", href: "/about" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-secondary">
            Sole<span className="text-primary">Style</span>
          </Link>

          {/* Navigation - Desktop */}
          {!isMobile && (
            <nav>
              <ul className="flex space-x-8">
                {navItems.map((item, index) => (
                  <li key={index} className={item.children ? "relative group" : ""}>
                    <Link 
                      href={item.href}
                      className={`font-medium hover:text-primary transition-colors flex items-center ${
                        location === item.href ? "text-primary" : ""
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown className="h-4 w-4 ml-1" />}
                    </Link>
                    {item.children && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
                        {item.children.map((child, childIndex) => (
                          <Link 
                            key={childIndex} 
                            href={child.href}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 text-slate hover:text-primary transition-colors" />
              </Button>
            )}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-slate hover:text-primary transition-colors" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5 text-slate hover:text-primary transition-colors" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <Menu className="h-5 w-5 text-slate hover:text-primary transition-colors" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="relative mb-3">
              <Input 
                type="text" 
                placeholder="Search for shoes..." 
                className="w-full pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.children ? (
                    <div className="flex justify-between items-center">
                      <span className="block font-medium">{item.label}</span>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Plus className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  ) : (
                    <Link 
                      href={item.href} 
                      className={`block font-medium ${
                        location === item.href ? "text-primary" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

// Needed for the mobile menu, not imported above to avoid circular import
function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
