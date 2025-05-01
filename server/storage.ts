import { db } from "@db";
import { 
  categories, 
  products, 
  reviews, 
  testimonials, 
  subscribers,
  categoryInsertSchema,
  productInsertSchema,
  reviewInsertSchema,
  testimonialInsertSchema,
  subscriberInsertSchema
} from "@shared/schema";
import { eq, desc, asc, and, or, like, ilike } from "drizzle-orm";
import type { 
  CategoryInsert, 
  ProductInsert, 
  ReviewInsert, 
  TestimonialInsert, 
  SubscriberInsert 
} from "@shared/schema";

// Helper functions for data access
export const storage = {
  // Categories
  async getAllCategories() {
    return await db.query.categories.findMany({
      orderBy: asc(categories.name)
    });
  },

  async getCategoryById(id: number) {
    return await db.query.categories.findFirst({
      where: eq(categories.id, id)
    });
  },

  async getCategoryBySlug(slug: string) {
    return await db.query.categories.findFirst({
      where: eq(categories.slug, slug)
    });
  },

  async createCategory(data: CategoryInsert) {
    const validatedData = categoryInsertSchema.parse(data);
    const [newCategory] = await db.insert(categories).values(validatedData).returning();
    return newCategory;
  },

  // Products
  async getAllProducts(sort: string = "newest", gender?: string) {
    let query = db.select().from(products);
    
    // Apply gender filter if provided
    if (gender) {
      query = query.where(eq(products.gender, gender));
    }
    
    // Apply sorting
    switch (sort) {
      case "price_low":
        query = query.orderBy(asc(products.price));
        break;
      case "price_high":
        query = query.orderBy(desc(products.price));
        break;
      case "popular":
        // This would ideally be based on sales or ratings
        query = query.orderBy(desc(products.featured));
        break;
      case "newest":
      default:
        query = query.orderBy(desc(products.createdAt));
        break;
    }
    
    return await query;
  },

  async getProductsByCategory(categoryId: number, sort: string = "newest", gender?: string) {
    let query = db.select().from(products).where(eq(products.categoryId, categoryId));
    
    // Apply gender filter if provided
    if (gender) {
      query = query.where(eq(products.gender, gender));
    }
    
    // Apply sorting
    switch (sort) {
      case "price_low":
        query = query.orderBy(asc(products.price));
        break;
      case "price_high":
        query = query.orderBy(desc(products.price));
        break;
      case "popular":
        // This would ideally be based on sales or ratings
        query = query.orderBy(desc(products.featured));
        break;
      case "newest":
      default:
        query = query.orderBy(desc(products.createdAt));
        break;
    }
    
    return await query;
  },

  async getProductById(id: number) {
    return await db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        category: true
      }
    });
  },

  async getFeaturedProducts() {
    return await db.query.products.findMany({
      where: eq(products.featured, true),
      limit: 8
    });
  },

  async getNewArrivals() {
    return await db.query.products.findMany({
      where: eq(products.newArrival, true),
      orderBy: desc(products.createdAt),
      limit: 8
    });
  },

  async createProduct(data: ProductInsert) {
    const validatedData = productInsertSchema.parse(data);
    const [newProduct] = await db.insert(products).values(validatedData).returning();
    return newProduct;
  },

  // Reviews
  async getProductReviews(productId: number) {
    return await db.query.reviews.findMany({
      where: eq(reviews.productId, productId),
      orderBy: desc(reviews.createdAt)
    });
  },

  async createReview(data: ReviewInsert) {
    const validatedData = reviewInsertSchema.parse(data);
    const [newReview] = await db.insert(reviews).values(validatedData).returning();
    return newReview;
  },

  // Testimonials
  async getTestimonials() {
    return await db.query.testimonials.findMany({
      orderBy: desc(testimonials.createdAt)
    });
  },

  async createTestimonial(data: TestimonialInsert) {
    const validatedData = testimonialInsertSchema.parse(data);
    const [newTestimonial] = await db.insert(testimonials).values(validatedData).returning();
    return newTestimonial;
  },

  // Newsletter subscribers
  async addSubscriber(data: SubscriberInsert) {
    try {
      const validatedData = subscriberInsertSchema.parse(data);
      const [newSubscriber] = await db.insert(subscribers).values(validatedData).returning();
      return newSubscriber;
    } catch (error: any) {
      // Handle duplicate email
      if (error.message.includes('duplicate key')) {
        throw new Error('Email already subscribed');
      }
      throw error;
    }
  }
};
