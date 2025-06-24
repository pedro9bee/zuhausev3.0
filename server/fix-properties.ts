import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

async function fixProperties() {
  console.log("🔧 Corrigindo propriedades no Airtable...");
  
  try {
    // Buscar todas as propriedades
    const records = await base('Properties').select().all();
    console.log(`📋 Encontradas ${records.length} propriedades`);

    // Dados corretos para cada propriedade
    const propertyData = [
      {
        title: "Casa Moderna no Alphaville",
        description: "Belíssima casa moderna com 4 quartos, piscina e área gourmet completa. Localizada em condomínio fechado de alto padrão com segurança 24h.",
        price: "850000",
        location: "Alphaville, Barueri - SP",
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        type: "Casa",
        status: "available",
        images: ["/attached_assets/Alphaville 2_1750107264406.jpg"],
        isForSale: true,
        isForRent: false,
        isFeatured: true,
      },
      {
        title: "Apartamento Golden Green",
        description: "Apartamento de alto padrão em condomínio fechado, com acabamento de primeira linha e vista privilegiada para área verde.",
        price: "650000",
        location: "Golden Green, Atibaia - SP",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        type: "Apartamento",
        status: "available",
        images: ["/attached_assets/GoldenGreen_1750105349165.jpg"],
        isForSale: true,
        isForRent: true,
        rentPrice: "3500",
        isFeatured: true,
      },
      {
        title: "Casa de Campo em Arouca",
        description: "Casa rústica com muito charme, ideal para quem busca tranquilidade. Amplo terreno com árvores frutíferas e área de lazer.",
        price: "450000",
        location: "Arouca, Interior - SP",
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        type: "Casa",
        status: "available",
        images: ["/attached_assets/Arouca_1750105633487.jpg"],
        isForSale: true,
        isForRent: false,
        isFeatured: false,
      },
      {
        title: "Residência Jardim Itanhangá",
        description: "Casa familiar em bairro residencial consolidado, com quintal amplo, garagem para 2 carros e ótima localização para famílias.",
        price: "520000",
        location: "Jardim Itanhangá, Ribeirão Preto - SP",
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        type: "Casa",
        status: "available",
        images: ["/attached_assets/Jardim Itanhangá_1750105882168.jpg"],
        isForSale: true,
        isForRent: true,
        rentPrice: "2800",
        isFeatured: false,
      }
    ];

    // Atualizar cada propriedade
    for (let i = 0; i < Math.min(records.length, propertyData.length); i++) {
      const record = records[i];
      const data = propertyData[i];
      
      try {
        await base('Properties').update(record.id, {
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area,
          type: data.type,
          status: data.status,
          isForSale: data.isForSale,
          isForRent: data.isForRent,
          isFeatured: data.isFeatured,
          ...(data.rentPrice && { rentPrice: data.rentPrice })
        });
        
        console.log(`✅ Propriedade atualizada: ${data.title}`);
      } catch (error) {
        console.log(`❌ Erro ao atualizar ${data.title}:`, error.message);
      }
    }

    console.log("🎉 Propriedades atualizadas com sucesso!");
    console.log("🌐 Acesse http://localhost:3000/propriedades para ver as mudanças");
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

fixProperties();