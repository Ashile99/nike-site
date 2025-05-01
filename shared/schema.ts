import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Users (inherited from default)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  gender: text("gender").notNull(),
  badge: text("badge"),
  discount: decimal("discount", { precision: 5, scale: 2 }),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
  featured: boolean("featured").default(false),
  newArrival: boolean("new_arrival").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  userName: text("user_name").notNull(),
  userTitle: text("user_title"),
  userAvatarUrl: text("user_avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Testimonials table (featured reviews for homepage)
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  userName: text("user_name").notNull(),
  userTitle: text("user_title"),
  userAvatarUrl: text("user_avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Newsletter subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Define relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products)
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  reviews: many(reviews)
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, { fields: [reviews.productId], references: [products.id] })
}));

// Define schemas for validation
export const categoryInsertSchema = createInsertSchema(categories, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters").optional()
});
export type CategoryInsert = z.infer<typeof categoryInsertSchema>;
export const categorySelectSchema = createSelectSchema(categories);
export type Category = z.infer<typeof categorySelectSchema>;

export const productInsertSchema = createInsertSchema(products, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  gender: (schema) => z.enum(["men", "women", "unisex"])
});
export type ProductInsert = z.infer<typeof productInsertSchema>;
export const productSelectSchema = createSelectSchema(products);
export type Product = z.infer<typeof productSelectSchema>;

export const reviewInsertSchema = createInsertSchema(reviews, {
  rating: (schema) => schema.min(1).max(5)
});
export type ReviewInsert = z.infer<typeof reviewInsertSchema>;
export const reviewSelectSchema = createSelectSchema(reviews);
export type Review = z.infer<typeof reviewSelectSchema>;

export const testimonialInsertSchema = createInsertSchema(testimonials, {
  rating: (schema) => schema.min(1).max(5)
});
export type TestimonialInsert = z.infer<typeof testimonialInsertSchema>;
export const testimonialSelectSchema = createSelectSchema(testimonials);
export type Testimonial = z.infer<typeof testimonialSelectSchema>;

export const subscriberInsertSchema = createInsertSchema(subscribers, {
  email: (schema) => schema.email("Must provide a valid email")
});
export type SubscriberInsert = z.infer<typeof subscriberInsertSchema>;
export const subscriberSelectSchema = createSelectSchema(subscribers);
export type Subscriber = z.infer<typeof subscriberSelectSchema>;

export type User = typeof users.$inferSelect;
