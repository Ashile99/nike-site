import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Seeding database...");

    // First clear all existing data (be careful in production!)
    await db.delete(schema.reviews);
    await db.delete(schema.testimonials);
    await db.delete(schema.products);
    await db.delete(schema.categories);
    await db.delete(schema.subscribers);

    // Seed categories
    const categoriesData = [
      {
        name: "Running",
        slug: "running",
        description: "High-performance running shoes for all levels of runners",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
      },
      {
        name: "Basketball",
        slug: "basketball",
        description: "Court shoes designed for traction, support, and performance",
        imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
      },
      {
        name: "Casual",
        slug: "casual",
        description: "Everyday comfortable shoes with style",
        imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
      },
      {
        name: "Formal",
        slug: "formal",
        description: "Elegant dress shoes for special occasions",
        imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
      }
    ];

    const insertedCategories = await db.insert(schema.categories).values(categoriesData).returning();
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Create a category map for easier reference
    const categoryMap = insertedCategories.reduce((map, category) => {
      map[category.slug] = category;
      return map;
    }, {} as Record<string, typeof schema.categories.$inferSelect>);

    // Seed products
    const productsData = [
      {
        name: "Air Max Runners",
        description: "Men's Running Shoe",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "men",
        badge: "NEW",
        discount: null,
        categoryId: categoryMap.running.id,
        featured: true,
        newArrival: false
      },
      {
        name: "Court Classic",
        description: "Men's Basketball Shoe",
        price: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "men",
        badge: "SALE",
        discount: 20,
        categoryId: categoryMap.basketball.id,
        featured: true,
        newArrival: false
      },
      {
        name: "Ultraboost Elite",
        description: "Women's Running Shoe",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "women",
        badge: null,
        discount: null,
        categoryId: categoryMap.running.id,
        featured: true,
        newArrival: false
      },
      {
        name: "Metro Walker",
        description: "Men's Casual Shoe",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "men",
        badge: "NEW",
        discount: null,
        categoryId: categoryMap.casual.id,
        featured: true,
        newArrival: false
      },
      {
        name: "Elegance Heel",
        description: "Women's Formal Shoe",
        price: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1584735175315-9d5df23be3c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "women",
        badge: null,
        discount: null,
        categoryId: categoryMap.formal.id,
        featured: true,
        newArrival: false
      },
      {
        name: "Supreme Runner",
        description: "Men's Running Shoe",
        price: 159.99,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "men",
        badge: "NEW",
        discount: null,
        categoryId: categoryMap.running.id,
        featured: false,
        newArrival: true
      },
      {
        name: "Velocity Pro",
        description: "Women's Training Shoe",
        price: 139.99,
        imageUrl: "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "women",
        badge: "NEW",
        discount: null,
        categoryId: categoryMap.running.id,
        featured: false,
        newArrival: true
      },
      {
        name: "Urban Hiker",
        description: "Men's Outdoor Shoe",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "men",
        badge: "NEW",
        discount: null,
        categoryId: categoryMap.casual.id,
        featured: false,
        newArrival: true
      },
      {
        name: "Daily Classic",
        description: "Women's Casual Shoe",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
        gender: "women",
        badge: "NEW",
        discount: null,
        categoryId: categoryMap.casual.id,
        featured: false,
        newArrival: true
      }
    ];

    const insertedProducts = await db.insert(schema.products).values(productsData).returning();
    console.log(`Inserted ${insertedProducts.length} products`);

    // Create a product map for easier reference
    const productMap = insertedProducts.reduce((map, product) => {
      map[product.name] = product;
      return map;
    }, {} as Record<string, typeof schema.products.$inferSelect>);

    // Seed reviews
    const reviewsData = [
      {
        productId: productMap["Air Max Runners"].id,
        rating: 4,
        comment: "These shoes are comfortable and stylish. Great for daily runs!",
        userName: "John D.",
        userTitle: "Marathon Runner",
        userAvatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      {
        productId: productMap["Air Max Runners"].id,
        rating: 5,
        comment: "The best running shoes I've ever owned. Perfect cushioning and support.",
        userName: "Sarah M.",
        userTitle: "Fitness Trainer",
        userAvatarUrl: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      {
        productId: productMap["Court Classic"].id,
        rating: 5,
        comment: "Great grip on the court. These shoes have improved my game!",
        userName: "Mike T.",
        userTitle: "Basketball Coach",
        userAvatarUrl: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      {
        productId: productMap["Ultraboost Elite"].id,
        rating: 4,
        comment: "Very comfortable for long distance running. Would recommend!",
        userName: "Emma L.",
        userTitle: "Trail Runner",
        userAvatarUrl: "https://randomuser.me/api/portraits/women/4.jpg"
      }
    ];

    const insertedReviews = await db.insert(schema.reviews).values(reviewsData).returning();
    console.log(`Inserted ${insertedReviews.length} reviews`);

    // Seed testimonials
    const testimonialsData = [
      {
        rating: 5,
        comment: "These running shoes are amazing! I've tried many brands over the years, but these provide the perfect combination of support and comfort. I've already run my first marathon in them!",
        userName: "Michael Thompson",
        userTitle: "Running Enthusiast",
        userAvatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        rating: 5,
        comment: "I love the stylish design of my new trainers. They go with everything in my wardrobe and I get compliments whenever I wear them. Plus, they're super comfortable for all-day wear.",
        userName: "Sarah Williams",
        userTitle: "Fashion Blogger",
        userAvatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        rating: 4,
        comment: "As someone with foot problems, finding comfortable shoes is always a challenge. These shoes have excellent arch support and cushioning. My feet don't hurt even after a full day of standing!",
        userName: "David Rodriguez",
        userTitle: "Healthcare Professional",
        userAvatarUrl: "https://randomuser.me/api/portraits/men/67.jpg"
      }
    ];

    const insertedTestimonials = await db.insert(schema.testimonials).values(testimonialsData).returning();
    console.log(`Inserted ${insertedTestimonials.length} testimonials`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
