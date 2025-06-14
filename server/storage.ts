import { 
  users, 
  properties, 
  contacts, 
  testimonials,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type Contact,
  type InsertContact,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private contacts: Map<number, Contact>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentContactId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.contacts = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentContactId = 1;
    this.currentTestimonialId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Apartamento de Luxo na Barra",
        description: "Vista mar deslumbrante, varanda gourmet, piscina, academia e área de lazer completa.",
        price: "1250000",
        location: "Barra da Tijuca, Rio de Janeiro",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        type: "Apartamento",
        status: "available",
        features: ["Vista para o mar", "Varanda gourmet", "Piscina", "Academia", "Área de lazer"],
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Cobertura Duplex no Recreio",
        description: "Cobertura duplex com terraço privativo, churrasqueira, jacuzzi e vista panorâmica da cidade.",
        price: "2800000",
        location: "Recreio dos Bandeirantes, Rio de Janeiro",
        bedrooms: 4,
        bathrooms: 4,
        area: 280,
        type: "Cobertura",
        status: "available",
        features: ["Terraço privativo", "Churrasqueira", "Jacuzzi", "Vista panorâmica"],
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Casa Moderna com Piscina",
        description: "Casa de alto padrão com piscina, área gourmet, jardim paisagístico e sistema de segurança.",
        price: "3500000",
        location: "Barra da Tijuca, Rio de Janeiro",
        bedrooms: 5,
        bathrooms: 6,
        area: 450,
        type: "Casa",
        status: "available",
        features: ["Piscina", "Área gourmet", "Jardim paisagístico", "Sistema de segurança"],
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Loft Industrial no Centro",
        description: "Loft moderno com pé-direito duplo, decoração industrial e localização privilegiada.",
        price: "650000",
        location: "Centro, Rio de Janeiro",
        bedrooms: 1,
        bathrooms: 1,
        area: 85,
        type: "Loft",
        status: "available",
        features: ["Pé-direito duplo", "Decoração industrial", "Localização privilegiada"],
        images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isForSale: false,
        isForRent: true,
        rentPrice: "8500",
      },
      {
        title: "Vista Mar em Ipanema",
        description: "Apartamento exclusivo com vista frontal para o mar de Ipanema, totalmente reformado.",
        price: "4200000",
        location: "Ipanema, Rio de Janeiro",
        bedrooms: 3,
        bathrooms: 3,
        area: 180,
        type: "Apartamento",
        status: "available",
        features: ["Vista frontal para o mar", "Totalmente reformado", "Localização exclusiva"],
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Apartamento Reformado na Tijuca",
        description: "Apartamento completamente reformado com acabamentos de primeira linha e varanda.",
        price: "890000",
        location: "Tijuca, Rio de Janeiro",
        bedrooms: 2,
        bathrooms: 2,
        area: 95,
        type: "Apartamento",
        status: "available",
        features: ["Completamente reformado", "Acabamentos de primeira", "Varanda"],
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isForSale: true,
        isForRent: false,
      },
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
    });

    // Seed testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Roberto e Carla",
        location: "Barra da Tijuca",
        rating: 5,
        message: "Atendimento excepcional! A equipe da ZuHause foi fundamental para encontrarmos nosso apartamento dos sonhos na Barra. Profissionais competentes e humanos.",
        avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Marcos Silva",
        location: "Recreio",
        rating: 5,
        message: "Vendemos nossa casa em tempo recorde! A estratégia de marketing foi perfeita e o preço alcançado superou nossas expectativas. Recomendo demais!",
        avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Juliana Oliveira",
        location: "Ipanema",
        rating: 5,
        message: "Atendimento personalizado desde o primeiro contato. Eles realmente se importam com o cliente e fazem tudo para encontrar o imóvel ideal.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...insertProperty, 
      id,
      status: insertProperty.status || "available",
      images: insertProperty.images || [],
      features: insertProperty.features || [],
      isForSale: insertProperty.isForSale ?? true,
      isForRent: insertProperty.isForRent ?? false,
      rentPrice: insertProperty.rentPrice || null
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...property };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
