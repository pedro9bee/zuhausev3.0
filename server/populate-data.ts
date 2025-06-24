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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "João Santos",
    location: "Vila Madalena, SP",
    rating: 5,
    message: "Processo de compra muito tranquilo. Recomendo a todos que buscam um imóvel de qualidade.",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    name: "Ana Costa",
    location: "Atibaia, SP",
    rating: 4,
    message: "Ótima experiência! Venderam minha casa rapidamente e com um preço justo. Muito satisfeita.",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    name: "Carlos Oliveira",
    location: "Barueri, SP",
    rating: 5,
    message: "Profissionais competentes e honestos. Me ajudaram a encontrar o investimento perfeito.",
    avatar: "https://i.pravatar.cc/150?img=4"
  }
];

async function populateData() {
  console.log("🏠 Populando dados de exemplo...");
  
  try {
    // Verificar se as tabelas existem primeiro
    console.log("🔍 Verificando se as tabelas existem...");
    
    try {
      const existingProperties = await propertiesTable.findAll();
      console.log(`✅ Tabela Properties existe (${existingProperties.length} registros atuais)`);
    } catch (error) {
      console.error("❌ Tabela Properties não encontrada. Você precisa criá-la primeiro no Airtable.");
      console.log("\n📋 Crie a tabela 'Properties' com estes campos:");
      console.log("- title (Single line text)");
      console.log("- description (Long text)");
      console.log("- price (Single line text)");
      console.log("- location (Single line text)");
      console.log("- bedrooms (Number)");
      console.log("- bathrooms (Number)");
      console.log("- area (Number)");
      console.log("- type (Single line text)");
      console.log("- status (Single line text)");
      console.log("- images (Multiple attachments)");
      console.log("- features (Multiple select)");
      console.log("- isForSale (Checkbox)");
      console.log("- isForRent (Checkbox)");
      console.log("- rentPrice (Single line text)");
      console.log("- isFeatured (Checkbox)");
      return;
    }

    try {
      const existingTestimonials = await testimonialsTable.findAll();
      console.log(`✅ Tabela Testimonials existe (${existingTestimonials.length} registros atuais)`);
    } catch (error) {
      console.error("❌ Tabela Testimonials não encontrada. Você precisa criá-la primeiro no Airtable.");
      console.log("\n💬 Crie a tabela 'Testimonials' com estes campos:");
      console.log("- name (Single line text)");
      console.log("- location (Single line text)");
      console.log("- rating (Number)");
      console.log("- message (Long text)");
      console.log("- avatar (Single line text)");
      return;
    }
    
    // Criar propriedades
    console.log("🏠 Criando propriedades de exemplo...");
    for (const property of dummyProperties) {
      try {
        await propertiesTable.create(property);
        console.log(`✅ Propriedade criada: ${property.title}`);
      } catch (error) {
        console.log(`⚠️  Erro ao criar ${property.title}:`, error.message);
      }
    }
    
    // Criar testimonials
    console.log("💬 Criando depoimentos de exemplo...");
    for (const testimonial of dummyTestimonials) {
      try {
        await testimonialsTable.create(testimonial);
        console.log(`✅ Depoimento criado: ${testimonial.name}`);
      } catch (error) {
        console.log(`⚠️  Erro ao criar depoimento de ${testimonial.name}:`, error.message);
      }
    }
    
    console.log("🎉 Dados de exemplo criados com sucesso!");
    console.log("🌐 Acesse http://localhost:3000 para ver o resultado");
    
  } catch (error) {
    console.error("❌ Erro geral:", error);
  }
}

populateData();