import { 
  propertiesTable, 
  contactsTable, 
  testimonialsTable, 
  usersTable,
  type AirtableProperty,
  type AirtableContact,
  type AirtableTestimonial,
  type AirtableUser
} from './airtable';
import type { InsertContact } from '@shared/schema';

// Storage adapter for Airtable
export const airtableStorage = {
  // Properties
  async getProperties(): Promise<AirtableProperty[]> {
    return await propertiesTable.findAll();
  },

  async getProperty(id: string): Promise<AirtableProperty | null> {
    return await propertiesTable.findById(id);
  },

  async createProperty(property: Omit<AirtableProperty, 'id'>): Promise<AirtableProperty> {
    return await propertiesTable.create(property);
  },

  // Contacts
  async getContacts(): Promise<AirtableContact[]> {
    return await contactsTable.findAll();
  },

  async createContact(contact: InsertContact): Promise<AirtableContact> {
    const contactData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      interest: contact.interest,
      message: contact.message,
    };
    return await contactsTable.create(contactData);
  },

  // Testimonials
  async getTestimonials(): Promise<AirtableTestimonial[]> {
    return await testimonialsTable.findAll();
  },

  async createTestimonial(testimonial: Omit<AirtableTestimonial, 'id'>): Promise<AirtableTestimonial> {
    return await testimonialsTable.create(testimonial);
  },

  // Users (for authentication)
  async getUserByUsername(username: string): Promise<AirtableUser | null> {
    return await usersTable.findByUsername(username);
  },

  async createUser(user: Omit<AirtableUser, 'id'>): Promise<AirtableUser> {
    return await usersTable.create(user);
  }
};