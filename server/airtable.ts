import Airtable from 'airtable';

// Configure Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

// Table names
const TABLES = {
  PROPERTIES: 'Properties',
  CONTACTS: 'Contacts',
  TESTIMONIALS: 'Testimonials',
  USERS: 'Users'
} as const;

// Type definitions matching the schema
export interface AirtableProperty {
  id?: string;
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  status: string;
  images: string[];
  features: string[];
  isForSale: boolean;
  isForRent: boolean;
  rentPrice?: string;
  isFeatured: boolean;
}

export interface AirtableContact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  createdAt: string;
}

export interface AirtableTestimonial {
  id?: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  avatar: string;
}

export interface AirtableUser {
  id?: string;
  username: string;
  password: string;
}

// Property operations
export const propertiesTable = {
  async findAll(): Promise<AirtableProperty[]> {
    const records = await base(TABLES.PROPERTIES).select().all();
    return records.map(record => ({
      id: record.id,
      title: record.get('title') as string,
      description: record.get('description') as string,
      price: record.get('price') as string,
      location: record.get('location') as string,
      bedrooms: record.get('bedrooms') as number,
      bathrooms: record.get('bathrooms') as number,
      area: record.get('area') as number,
      type: record.get('type') as string,
      status: record.get('status') as string || 'available',
      images: (record.get('images') as string[]) || [],
      features: (record.get('features') as string[]) || [],
      isForSale: record.get('isForSale') as boolean ?? true,
      isForRent: record.get('isForRent') as boolean ?? false,
      rentPrice: record.get('rentPrice') as string,
      isFeatured: record.get('isFeatured') as boolean ?? false,
    }));
  },

  async findById(id: string): Promise<AirtableProperty | null> {
    try {
      const record = await base(TABLES.PROPERTIES).find(id);
      return {
        id: record.id,
        title: record.get('title') as string,
        description: record.get('description') as string,
        price: record.get('price') as string,
        location: record.get('location') as string,
        bedrooms: record.get('bedrooms') as number,
        bathrooms: record.get('bathrooms') as number,
        area: record.get('area') as number,
        type: record.get('type') as string,
        status: record.get('status') as string || 'available',
        images: (record.get('images') as string[]) || [],
        features: (record.get('features') as string[]) || [],
        isForSale: record.get('isForSale') as boolean ?? true,
        isForRent: record.get('isForRent') as boolean ?? false,
        rentPrice: record.get('rentPrice') as string,
        isFeatured: record.get('isFeatured') as boolean ?? false,
      };
    } catch (error) {
      return null;
    }
  },

  async create(property: Omit<AirtableProperty, 'id'>): Promise<AirtableProperty> {
    const record = await base(TABLES.PROPERTIES).create({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      type: property.type,
      status: property.status,
      images: property.images,
      features: property.features,
      isForSale: property.isForSale,
      isForRent: property.isForRent,
      rentPrice: property.rentPrice,
      isFeatured: property.isFeatured,
    });

    return {
      id: record.id,
      ...property
    };
  }
};

// Contact operations
export const contactsTable = {
  async findAll(): Promise<AirtableContact[]> {
    const records = await base(TABLES.CONTACTS).select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('name') as string,
      email: record.get('email') as string,
      phone: record.get('phone') as string,
      interest: record.get('interest') as string,
      message: record.get('message') as string,
      createdAt: record.get('createdAt') as string,
    }));
  },

  async create(contact: Omit<AirtableContact, 'id' | 'createdAt'>): Promise<AirtableContact> {
    const createdAt = new Date().toISOString();
    const record = await base(TABLES.CONTACTS).create({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      interest: contact.interest,
      message: contact.message,
      createdAt,
    });

    return {
      id: record.id,
      ...contact,
      createdAt
    };
  }
};

// Testimonial operations
export const testimonialsTable = {
  async findAll(): Promise<AirtableTestimonial[]> {
    const records = await base(TABLES.TESTIMONIALS).select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('name') as string,
      location: record.get('location') as string,
      rating: record.get('rating') as number,
      message: record.get('message') as string,
      avatar: record.get('avatar') as string,
    }));
  },

  async create(testimonial: Omit<AirtableTestimonial, 'id'>): Promise<AirtableTestimonial> {
    const record = await base(TABLES.TESTIMONIALS).create({
      name: testimonial.name,
      location: testimonial.location,
      rating: testimonial.rating,
      message: testimonial.message,
      avatar: testimonial.avatar,
    });

    return {
      id: record.id,
      ...testimonial
    };
  }
};

// User operations
export const usersTable = {
  async findByUsername(username: string): Promise<AirtableUser | null> {
    try {
      const records = await base(TABLES.USERS).select({
        filterByFormula: `{username} = '${username}'`
      }).firstPage();
      
      if (records.length === 0) return null;
      
      const record = records[0];
      return {
        id: record.id,
        username: record.get('username') as string,
        password: record.get('password') as string,
      };
    } catch (error) {
      return null;
    }
  },

  async create(user: Omit<AirtableUser, 'id'>): Promise<AirtableUser> {
    const record = await base(TABLES.USERS).create({
      username: user.username,
      password: user.password,
    });

    return {
      id: record.id,
      ...user
    };
  }
};