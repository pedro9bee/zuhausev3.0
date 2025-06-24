import { z } from "zod";

// Zod schemas for Airtable data validation
export const insertPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  location: z.string().min(1, "Location is required"),
  bedrooms: z.number().int().positive("Bedrooms must be a positive number"),
  bathrooms: z.number().int().positive("Bathrooms must be a positive number"),
  area: z.number().int().positive("Area must be a positive number"),
  type: z.string().min(1, "Type is required"),
  status: z.string().default("available"),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  isForSale: z.boolean().default(true),
  isForRent: z.boolean().default(false),
  rentPrice: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  interest: z.string().min(1, "Interest is required"),
  message: z.string().min(1, "Message is required"),
});

export const insertTestimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  message: z.string().min(1, "Message is required"),
  avatar: z.string().min(1, "Avatar is required"),
});

export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript types for Airtable data
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = InsertProperty & { id: string };

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = InsertContact & { id: string; createdAt: string };

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = InsertTestimonial & { id: string };

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: string };