import { Link } from "wouter";

export default function Footer() {
  const shopLinks = [
    { label: "Men's Shoes", href: "/category/men" },
    { label: "Women's Shoes", href: "/category/women" },
    { label: "New Arrivals", href: "/category/new-arrivals" },
    { label: "Sale", href: "/category/sale" },
    { label: "Accessories", href: "/category/accessories" }
  ];

  const aboutLinks = [
    { label: "Our Story", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Corporate Responsibility", href: "/responsibility" },
    { label: "Contact Us", href: "/contact" }
  ];

  const serviceLinks = [
    { label: "Help & FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Track Order", href: "/track-order" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookies Settings", href: "/cookies" }
  ];

  return (
    <footer className="bg-darkSlate text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">SoleStyle</h3>
            <p className="mb-4">Premium footwear for every occasion. Quality, comfort, and style in every step.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              {shopLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">About</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} SoleStyle. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link, index) => (
              <Link key={index} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
