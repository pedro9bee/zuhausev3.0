import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

// Primeiro, vamos verificar se as tabelas existem e criar dados
async function setupAirtable() {
  console.log("🔧 Configurando Airtable...");
  
  try {
    // Testar se conseguimos acessar as tabelas
    console.log("📋 Verificando tabela Properties...");
    try {
      const propertiesTest = await base('Properties').select({ maxRecords: 1 }).firstPage();
      console.log("✅ Tabela Properties existe");
    } catch (error) {
      console.log("❌ Tabela Properties não encontrada ou sem permissão");
      throw error;
    }

    console.log("💬 Verificando tabela Testimonials...");
    try {
      const testimonialsTest = await base('Testimonials').select({ maxRecords: 1 }).firstPage();
      console.log("✅ Tabela Testimonials existe");
    } catch (error) {
      console.log("❌ Tabela Testimonials não encontrada ou sem permissão");
      throw error;
    }

    // Criar dados dummy
    console.log("🏠 Criando propriedades de exemplo...");
    
    const properties = [
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
        images: ["https://example.com/casa1.jpg"],
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
        images: ["https://example.com/apto1.jpg"],
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
        images: ["https://example.com/casa2.jpg"],
        features: ["Terreno Grande", "Árvores Frutíferas", "Varanda", "Lareira"],
        isForSale: true,
        isForRent: false,
        isFeatured: false,
      }
    ];

    // Criar propriedades uma por uma
    for (const property of properties) {
      try {
        const record = await base('Properties').create(property);
        console.log(`✅ Propriedade criada: ${property.title} (ID: ${record.id})`);
      } catch (error) {
        console.log(`❌ Erro ao criar propriedade ${property.title}:`, error);
      }
    }

    // Criar testimonials
    console.log("💬 Criando depoimentos de exemplo...");
    
    const testimonials = [
      {
        name: "Maria Silva",
        location: "Alphaville, SP",
        rating: 5,
        message: "Excelente atendimento! Encontrei a casa dos meus sonhos rapidamente. Equipe muito profissional e atenciosa.",
        avatar: "https://example.com/avatar1.jpg"
      },
      {
        name: "João Santos",
        location: "Vila Madalena, SP",
        rating: 5,
        message: "Processo de compra muito tranquilo. Recomendo a todos que buscam um imóvel de qualidade.",
        avatar: "https://example.com/avatar2.jpg"
      },
      {
        name: "Ana Costa",
        location: "Atibaia, SP",
        rating: 4,
        message: "Ótima experiência! Venderam minha casa rapidamente e com um preço justo. Muito satisfeita.",
        avatar: "https://example.com/avatar3.jpg"
      }
    ];

    // Criar testimonials um por um
    for (const testimonial of testimonials) {
      try {
        const record = await base('Testimonials').create(testimonial);
        console.log(`✅ Depoimento criado: ${testimonial.name} (ID: ${record.id})`);
      } catch (error) {
        console.log(`❌ Erro ao criar depoimento ${testimonial.name}:`, error);
      }
    }

    console.log("🎉 Setup do Airtable concluído!");
    console.log("🌐 Agora você pode acessar http://localhost:3000");
    
  } catch (error) {
    console.error("❌ Erro no setup:", error);
    
    if (error.error === 'NOT_AUTHORIZED') {
      console.log("\n🔑 Problema de autorização. Verifique:");
      console.log("1. Se a API key está correta");
      console.log("2. Se a base ID está correta");
      console.log("3. Se o token tem permissões de read/write");
      console.log("4. Se as tabelas 'Properties' e 'Testimonials' existem");
    }
    
    if (error.error === 'TABLE_NOT_FOUND') {
      console.log("\n📋 Tabelas não encontradas. Você precisa criar:");
      console.log("- Tabela 'Properties'");
      console.log("- Tabela 'Testimonials'");
      console.log("- Tabela 'Contacts' (opcional)");
      console.log("- Tabela 'Users' (opcional)");
    }
  }
}

setupAirtable();