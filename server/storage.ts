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
        title: "Golden Green",
        description: "Golden Green - Cobertura Duplex Exclusiva\n\n460 m² | 4 Suítes | 4 Vagas\n\n✨ Detalhes da Cobertura:\n\nPrimeiro pavimento:\nLiving em vários ambientes com piso em travertino, integrado à varanda com cortina de vidro;\n3 suítes com marcenaria Ornare;\nMaster ampliada com closet;\nCozinha planejada Florense com monta-cargas e despensa;\nÁrea de serviço e dependência completa.\n\nSegundo Pavimento:\nGrande salão multiuso com copa, adega e banheiro com claraboia;\n1 suíte adicional;\nLavanderia;\nVaranda com vista livre para o clube;\nTerraço com vista frontal para o mar, piscina revestida em pedra hijau e deck.\n\nDiferenciais:\nProjeto de iluminação com automação na sala; Climatização em toda a cobertura.\n\nCondomínio Golden Green:\nCampo de golfe;\nHeliporto;\nRestaurante;\nSalão de festas e espaço gourmet;\nAcademia;\nSegurança 24 horas.\n\n💰 Valor de Venda: R$ 14.500.000,00\nCondomínio: R$ 9.000,00\nIPTU: R$ 2.200,00",
        price: "14500000",
        location: "Golden Green, Rio de Janeiro",
        bedrooms: 4,
        bathrooms: 4,
        area: 460,
        type: "Cobertura",
        status: "available",
        features: ["Vista para o mar", "Piscina privativa", "Campo de golfe", "Heliporto", "Automação", "Climatização", "Terraço", "Closet", "Marcenaria Ornare", "Cozinha Florense"],
        images: ["/attached_assets/GoldenGreen_1750105349165.jpg"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Jardim Pindorama",
        description: "Viva o Exclusivo: Casas no Jardim Pindorama - Gávea\n\nSegurança e Privacidade\n- Portaria 24h com segurança reforçada\n- Condomínio fechado com acesso controlado\n- Privacidade garantida em cada uma das nossas residências\n\nNovidades e Tecnologia\n- Casas com sistema de automação e ar condicionado em todos os cômodos\n- Áreas gourmet e piscina privativa para desfrutar do lazer\n- Projetos assinados pelos renomados arquitetos Sergio Conde Caldas e Erick Figueira de Mello\n\nExclusividade e Sofisticação\n- Terrenos de 412m2 a 704m2 e áreas construídas de 470m2 a 602m2\n- Paisagismo icônico do Escritório Burle Marx\n- Localização privilegiada no Jardim Pindorama, Gávea",
        price: "8500000",
        location: "Jardim Pindorama, Gávea, Rio de Janeiro",
        bedrooms: 4,
        bathrooms: 5,
        area: 470,
        type: "Casa",
        status: "available",
        features: ["Piscina privativa", "Área gourmet", "Sistema de automação", "Paisagismo Burle Marx", "Arquitetura assinada", "Segurança 24h", "Condomínio fechado", "Ar condicionado"],
        images: ["/attached_assets/Jardim Pindorama_1750105356165.jpg"],
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
      },
      {
        name: "Felipe Costa",
        location: "Copacabana",
        rating: 5,
        message: "Processo de compra muito transparente e sem complicações. A ZuHause cuidou de todos os detalhes burocráticos e conseguiu um excelente financiamento.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Camila Rodrigues",
        location: "Tijuca",
        rating: 5,
        message: "Equipe super atenciosa e profissional. Me ajudaram a encontrar o apartamento perfeito dentro do meu orçamento. Recomendo muito!",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "André Souza",
        location: "Jacarepaguá",
        rating: 5,
        message: "Vendi meu imóvel com a ZuHause e foi uma experiência incrível. Conseguiram valorizar muito bem minha propriedade no mercado.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Luciana Pereira",
        location: "Leblon",
        rating: 5,
        message: "Atendimento de primeira qualidade! A equipe foi muito paciente e me mostrou várias opções até encontrarmos a casa ideal para minha família.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Gabriel Santos",
        location: "Campo Grande",
        rating: 5,
        message: "Comprei meu primeiro apartamento com a ZuHause. Eles explicaram todo o processo e me deram total segurança na negociação.",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Patricia Lima",
        location: "Botafogo",
        rating: 5,
        message: "Profissionais excepcionais! Me ajudaram tanto na venda do meu antigo apartamento quanto na compra do novo. Processo muito bem coordenado.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Ricardo Alves",
        location: "Flamengo",
        rating: 5,
        message: "Excelente trabalho de avaliação do meu imóvel. A ZuHause conseguiu um preço justo e vendeu rapidamente. Muito satisfeito com o resultado.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Marina Fernandes",
        location: "São Conrado",
        rating: 5,
        message: "Atendimento humanizado e personalizado. A equipe realmente entende as necessidades do cliente e trabalha para encontrar a melhor solução.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Leonardo Oliveira",
        location: "Laranjeiras",
        rating: 5,
        message: "Processo de locação muito eficiente. A ZuHause cuidou de toda a documentação e conseguiu inquilinos qualificados para meu imóvel rapidamente.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        name: "Stephanie Moura",
        location: "Vila Isabel",
        rating: 5,
        message: "Equipe muito preparada e conhecedora do mercado. Me orientaram sobre o melhor momento para vender e conseguiram superar minhas expectativas.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
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
