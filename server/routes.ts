import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { eq, desc, and, asc, like, ilike, or } from "drizzle-orm";
import { subscriberInsertSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix for all routes
  const apiPrefix = "/api";

  // Categories routes
  app.get(`${apiPrefix}/categories`, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      return res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get(`${apiPrefix}/categories/:slug`, async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      return res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      return res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Products routes
  app.get(`${apiPrefix}/products`, async (req, res) => {
    try {
      const { category, gender, sort = "newest" } = req.query;
      
      let products;
      if (category) {
        const categoryObj = await storage.getCategoryBySlug(category as string);
        if (categoryObj) {
          products = await storage.getProductsByCategory(
            categoryObj.id, 
            sort as string, 
            gender as string | undefined
          );
        } else {
          return res.status(404).json({ error: "Category not found" });
        }
      } else {
        products = await storage.getAllProducts(
          sort as string, 
          gender as string | undefined
        );
      }
      
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get(`${apiPrefix}/products/featured`, async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      return res.json(featuredProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  app.get(`${apiPrefix}/products/new-arrivals`, async (req, res) => {
    try {
      const newArrivals = await storage.getNewArrivals();
      return res.json(newArrivals);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      return res.status(500).json({ error: "Failed to fetch new arrivals" });
    }
  });

  app.get(`${apiPrefix}/products/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(parseInt(id));
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Reviews routes
  app.get(`${apiPrefix}/products/:id/reviews`, async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await storage.getProductReviews(parseInt(id));
      return res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  // Testimonials route
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Newsletter subscription
  app.post(`${apiPrefix}/newsletter/subscribe`, async (req, res) => {
    try {
      const validatedData = subscriberInsertSchema.parse(req.body);
      const subscriber = await storage.addSubscriber(validatedData);
      return res.status(201).json({ message: "Successfully subscribed", subscriber });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      return res.status(400).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
