import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

async function checkFields() {
  console.log("🔍 Verificando estrutura das tabelas...");
  
  try {
    // Verificar Properties
    console.log("\n📋 Tabela Properties:");
    const propertiesRecords = await base('Properties').select({ maxRecords: 1 }).firstPage();
    if (propertiesRecords.length > 0) {
      const record = propertiesRecords[0];
      console.log("Campos encontrados:", Object.keys(record.fields));
    } else {
      console.log("Nenhum registro encontrado");
    }

    // Verificar Testimonials
    console.log("\n💬 Tabela Testimonials:");
    const testimonialsRecords = await base('Testimonials').select({ maxRecords: 1 }).firstPage();
    if (testimonialsRecords.length > 0) {
      const record = testimonialsRecords[0];
      console.log("Campos encontrados:", Object.keys(record.fields));
    } else {
      console.log("Nenhum registro encontrado");
    }

    // Tentar criar um registro simples para testar
    console.log("\n🧪 Testando criação simples...");
    try {
      const testProperty = await base('Properties').create({
        title: "Teste de Propriedade",
        description: "Descrição de teste",
        price: "R$ 100.000",
        location: "Teste, SP",
        bedrooms: 2,
        bathrooms: 1,
        area: 100,
        type: "Casa",
        status: "available",
        isForSale: true,
        isForRent: false,
        isFeatured: false
      });
      console.log(`✅ Propriedade teste criada: ${testProperty.id}`);
    } catch (error) {
      console.log("❌ Erro ao criar propriedade teste:", error.message);
    }

    try {
      const testTestimonial = await base('Testimonials').create({
        Nome: "Teste Silva", // Tentando com "Nome" em português
        Localização: "Teste, SP",
        Avaliação: 5,
        Mensagem: "Mensagem de teste",
        Avatar: "https://example.com/avatar.jpg"
      });
      console.log(`✅ Depoimento teste criado: ${testTestimonial.id}`);
    } catch (error) {
      console.log("❌ Erro ao criar depoimento teste:", error.message);
      
      // Tentar com nomes em inglês
      try {
        const testTestimonial2 = await base('Testimonials').create({
          name: "Teste Silva",
          location: "Teste, SP", 
          rating: 5,
          message: "Mensagem de teste",
          avatar: "https://example.com/avatar.jpg"
        });
        console.log(`✅ Depoimento teste criado (inglês): ${testTestimonial2.id}`);
      } catch (error2) {
        console.log("❌ Erro com nomes em inglês:", error2.message);
      }
    }

  } catch (error) {
    console.error("❌ Erro geral:", error);
  }
}

checkFields();