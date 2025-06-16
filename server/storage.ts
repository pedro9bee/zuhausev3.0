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
        title: "Arouca",
        description: "Uma obra-prima contemporânea na Barra da Tijuca. Para quem busca imponência, conforto e sofisticação em cada detalhe. ✨\n\nMansão Triplex com Subsolo e Elevador\n📍 Localizada em condomínio exclusivo, com portaria 24h e infraestrutura completa.✨\n\nTerreno: 1.235 m² | Área construída: 1.280 m² | 5 suítes | 10 vagas de garagem.\n\nTérreo:\nLiving com pé-direito de 4 metros | Espaço para adega | Cozinha com ilha e despensa | Suíte térrea + 2 lavabos | Piscina com hidromassagem | Deck seco + sauna integrada | Lounge gourmet de tirar o fôlego\n\nSegundo pavimento:\n4 suítes com closet | Suíte master com: Closet duplo, terraço privativo, varanda com vista, Banheiro com bancada dupla e banheira.\n\nTerceiro pavimento: Espaço multiuso com copa e banheiro\nIdeal para home office, cinema ou academia\n\nSubsolo:\nLavanderia | Depósito, maleiro e bicicletário | Dois quartos de serviço + banheiro | Terraço descoberto e área de descanso para funcionários | 10 vagas de garagem com acesso fácil.\n\n💰 R$ 24.000.000\n\nUma mansão para quem exige o mais alto padrão de vida, com conforto, espaço e segurança total!\n\nGostou? Agende uma visita e venha sentir pessoalmente o que é morar em uma casa pensada para os seus melhores dias. ✨",
        price: "24000000",
        location: "Barra da Tijuca, Rio de Janeiro",
        bedrooms: 5,
        bathrooms: 6,
        area: 1280,
        type: "Mansão",
        status: "available",
        features: ["Piscina com hidromassagem", "Sauna", "Elevador", "Adega", "Home office", "Cinema", "Academia", "10 vagas", "Terraço privativo", "Lounge gourmet"],
        images: ["/attached_assets/Arouca_1750105633487.jpg"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Jardim Itanhangá",
        description: "Casa Itanhangá – Luxo e Natureza em Harmonia\n\nTerreno 1.000 m² | 850 m² de área construída | 5 suítes | Vista Pedra da Gávea\n\nProjetada pela Orse Arquitetura, esta residência é um verdadeiro refúgio em meio à natureza, com ambientes amplos, sofisticados e conectados ao exterior.\n\n✨ Destaques: No térreo, a sala de estar com pé direito duplo integra-se perfeitamente à área gourmet, sauna, spa e piscina de 70 m², oferecendo um espaço ideal para viver e receber. A cozinha planejada e a suíte de serviço garantem praticidade no dia a dia.\n\nNo 1º pavimento, a suíte master é um espetáculo à parte, com sala privativa, amplo closet e banheiro luxuoso com spa. Três suítes adicionais oferecem conforto, privacidade e vistas para os jardins.\n\nNo 2º pavimento, uma suíte espaçosa é complementada por um escritório multifuncional, sala íntima e um terraço panorâmico que proporciona uma vista deslumbrante da Pedra da Gávea.\n\n📍 Localizada próxima ao Itanhangá Golf Club, Marina Barra Clube e Praia do Pepê, esta casa oferece o equilíbrio perfeito entre sofisticação e conveniência.\n\n📲 Agende sua visita e encante-se!\n\n💰 R$ 14.900.000",
        price: "14900000",
        location: "Jardim Itanhangá, Rio de Janeiro",
        bedrooms: 5,
        bathrooms: 5,
        area: 850,
        type: "Casa",
        status: "available",
        features: ["Vista Pedra da Gávea", "Piscina 70m²", "Sauna", "Spa", "Arquitetura Orse", "Área gourmet", "Terraço panorâmico", "Escritório", "Closet amplo", "Jardins"],
        images: ["/attached_assets/Jardim Itanhangá_1750105882168.jpg"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Alphaville 2",
        description: "📍 Alphaville – Barra da Tijuca\n\n📐 637m² de terreno | 1.230m² de área útil\n🛏 5 suítes espaçosas\n🚗 Subsolo para até 6 carros + elevador\n\n🌿 Destaques:\n✔️ Jardim de Inverno para conexão com a natureza 🌱\n✔️ Suíte master com 2 closets, hidro e chuveiro duplo 🛁\n✔️ Área de lazer completa: Piscina, sauna, hidromassagem e cascata 🌊\n✔️ Área gourmet com churrasqueira Chauffage 🍽🔥\n✔️ Ambientes envidraçados e uma vista deslumbrante 🌅\n\nUma residência única para quem busca luxo, privacidade e qualidade de vida!\n\n💰 Valor de venda: R$ 12.960.000,00",
        price: "12960000",
        location: "Alphaville, Barra da Tijuca",
        bedrooms: 5,
        bathrooms: 5,
        area: 1230,
        type: "Casa",
        status: "available",
        features: ["Jardim de Inverno", "2 closets na suíte master", "Piscina", "Sauna", "Hidromassagem", "Cascata", "Churrasqueira Chauffage", "Subsolo 6 carros", "Elevador", "Ambientes envidraçados"],
        images: ["/attached_assets/Alphaville 2_1750107264406.jpg"],
        isForSale: true,
        isForRent: false,
      },
      {
        title: "Del Lago",
        description: "Essa casa triplex contemporânea na Barra da Tijuca conta com 850m² de construção em um terreno de 600m², oferecendo espaços amplos, design moderno e acabamentos de alto padrão.\n\n🏡 1º pavimento: Sala ampla com pé-direito alto, suíte/escritório, lavabo, cozinha, área de serviço com lavanderia e dependências. A área de lazer é um verdadeiro refúgio, com espaço gourmet, sauna e uma bela piscina.\n\n🏡 2º pavimento: 4 suítes espaçosas, todas com varanda e closet. A suíte master é um espetáculo à parte, com um banho relaxante em sua banheira imersa.\n\n🏡 3º pavimento: Uma sala multifuncional que pode ser usada como academia, home cinema ou sala de jogos, ideal para atender às suas necessidades.\n\n📍 Condomínio Del Lago – Barra da Tijuca\n💰 R$ 11.900.000\n📜 IPTU: R$ 30.000 anual | Condomínio: R$ 3.000",
        price: "11900000",
        location: "Condomínio Del Lago, Barra da Tijuca",
        bedrooms: 5,
        bathrooms: 5,
        area: 850,
        type: "Casa Triplex",
        status: "available",
        features: ["Design contemporâneo", "Pé-direito alto", "Espaço gourmet", "Sauna", "Piscina", "4 suítes com varanda", "Suíte master com banheira", "Sala multifuncional", "Home cinema", "Academia"],
        images: ["/attached_assets/Del Lago_1750107985029.jpg"],
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
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Marcos Silva",
        location: "Recreio",
        rating: 5,
        message: "Vendemos nossa casa em tempo recorde! A estratégia de marketing foi perfeita e o preço alcançado superou nossas expectativas. Recomendo demais!",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      {
        name: "Juliana Oliveira",
        location: "Ipanema",
        rating: 5,
        message: "Atendimento personalizado desde o primeiro contato. Eles realmente se importam com o cliente e fazem tudo para encontrar o imóvel ideal.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        name: "Felipe Costa",
        location: "Copacabana",
        rating: 5,
        message: "Processo de compra muito transparente e sem complicações. A ZuHause cuidou de todos os detalhes burocráticos e conseguiu um excelente financiamento.",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        name: "Camila Rodrigues",
        location: "Tijuca",
        rating: 5,
        message: "Equipe super atenciosa e profissional. Me ajudaram a encontrar o apartamento perfeito dentro do meu orçamento. Recomendo muito!",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      {
        name: "André Souza",
        location: "Jacarepaguá",
        rating: 5,
        message: "Vendi meu imóvel com a ZuHause e foi uma experiência incrível. Conseguiram valorizar muito bem minha propriedade no mercado.",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
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
