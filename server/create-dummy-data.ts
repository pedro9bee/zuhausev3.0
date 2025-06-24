import "dotenv/config";
import { propertiesTable, testimonialsTable } from "./airtable";

const dummyProperties = [
  {
    title: "Casa Moderna no Alphaville",
    description: "Belíssima casa moderna com 4 quartos, piscina e área gourmet completa. Localizada em condomínio fechado de alto padrão.",
    price: "R$ 850.000",
    location: "Alphaville, Barueri",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    type: "Casa",
    status: "available",
    images: ["/attached_assets/webp/Alphaville 2_1750107264406.webp"],
    features: ["Piscina", "Área Gourmet", "Garagem", "Jardim"],
    isForSale: true,
    isForRent: false,
    isFeatured: true,
  },
  {
    title: "Apartamento Cobertura Duplex",
    description: "Cobertura duplex com vista panorâmica, 3 suítes e terraço com churrasqueira. Acabamento de primeira linha.",
    price: "R$ 1.200.000",
    location: "Vila Madalena, São Paulo",
    bedrooms: 3,
    bathrooms: 4,
    area: 200,
    type: "Apartamento",
    status: "available",
    images: ["/attached_assets/webp/DSC03004_1750194498785.webp"],
    features: ["Terraço", "Churrasqueira", "Vista Panorâmica", "Suítes"],
    isForSale: true,
    isForRent: true,
    rentPrice: "R$ 6.500",
    isFeatured: true,
  },
  {
    title: "Casa de Campo em Arouca",
    description: "Casa rústica com muito charme, ideal para quem busca tranquilidade. Amplo terreno com árvores frutíferas.",
    price: "R$ 450.000",
    location: "Arouca, Interior SP",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: "Casa",
    status: "available",
    images: ["/attached_assets/webp/Arouca_1750105633487.webp"],
    features: ["Terreno Grande", "Árvores Frutíferas", "Varanda", "Lareira"],
    isForSale: true,
    isForRent: false,
    isFeatured: false,
  },
  {
    title: "Sobrado Moderno Golden Green",
    description: "Sobrado novo com arquitetura contemporânea, 4 suítes e área de lazer completa. Pronto para morar.",
    price: "R$ 950.000",
    location: "Golden Green, Atibaia",
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    type: "Sobrado",
    status: "available",
    images: ["/attached_assets/webp/GoldenGreen_1750105349165.webp"],
    features: ["Área de Lazer", "Suítes", "Garagem", "Jardim Paisagístico"],
    isForSale: true,
    isForRent: false,
    isFeatured: true,
  },
  {
    title: "Casa Jardim Itanhangá",
    description: "Casa familiar em bairro residencial, com quintal amplo e 3 dormitórios. Ótima localização para famílias.",
    price: "R$ 650.000",
    location: "Jardim Itanhangá, Ribeirão Preto",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "Casa",
    status: "available",
    images: ["/attached_assets/webp/Jardim Itanhangá_1750105882168.webp"],
    features: ["Quintal", "Garagem", "Área de Serviço", "Localização"],
    isForSale: true,
    isForRent: true,
    rentPrice: "R$ 3.200",
    isFeatured: false,
  }
];

const dummyTestimonials = [
  {
    name: "Maria Silva",
    location: "Alphaville, SP",
    rating: 5,
    message: "Excelente atendimento! Encontrei a casa dos meus sonhos rapidamente. Equipe muito profissional e atenciosa.",
    avatar: "/attached_assets/webp/Junior Martins_1750110494934.webp"
  },
  {
    name: "João Santos",
    location: "Vila Madalena, SP",
    rating: 5,
    message: "Processo de compra muito tranquilo. Recomendo a todos que buscam um imóvel de qualidade.",
    avatar: "/attached_assets/webp/Leonardo_Kino_XL_A_candid_shot_of_the_real_estate_agent_holdin_0_1750111077584.webp"
  },
  {
    name: "Ana Costa",
    location: "Atibaia, SP",
    rating: 4,
    message: "Ótima experiência! Venderam minha casa rapidamente e com um preço justo. Muito satisfeita.",
    avatar: "/attached_assets/webp/Junior Martins_1750110494934.webp"
  },
  {
    name: "Carlos Oliveira",
    location: "Barueri, SP",
    rating: 5,
    message: "Profissionais competentes e honestos. Me ajudaram a encontrar o investimento perfeito.",
    avatar: "/attached_assets/webp/Leonardo_Kino_XL_A_candid_shot_of_the_real_estate_agent_holdin_0_1750111077584.webp"
  }
];

async function createDummyData() {
  console.log("🏠 Criando dados de exemplo...");
  
  try {
    // Criar propriedades
    console.log("📋 Criando propriedades...");
    for (const property of dummyProperties) {
      await propertiesTable.create(property);
      console.log(`✅ Propriedade criada: ${property.title}`);
    }
    
    // Criar testimonials
    console.log("💬 Criando depoimentos...");
    for (const testimonial of dummyTestimonials) {
      await testimonialsTable.create(testimonial);
      console.log(`✅ Depoimento criado: ${testimonial.name}`);
    }
    
    console.log("🎉 Dados de exemplo criados com sucesso!");
    console.log("🌐 Acesse http://localhost:3000 para ver o resultado");
    
  } catch (error) {
    console.error("❌ Erro ao criar dados:", error);
  }
}

createDummyData();