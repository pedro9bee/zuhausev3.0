import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

async function debugTestimonials() {
  console.log("🔍 Verificando estrutura da tabela Testimonials...");
  
  try {
    const records = await base('Testimonials').select({ maxRecords: 3 }).firstPage();
    console.log(`💬 Encontrados ${records.length} depoimentos`);
    
    if (records.length > 0) {
      const record = records[0];
      console.log("\n📋 Campos encontrados:", Object.keys(record.fields));
      console.log("\n🔍 Dados do primeiro registro:");
      console.log("ID:", record.id);
      
      Object.keys(record.fields).forEach(field => {
        console.log(`${field}:`, record.get(field));
      });
    } else {
      console.log("⚠️  Nenhum depoimento encontrado na tabela");
    }
    
  } catch (error) {
    console.error("❌ Erro ao acessar Testimonials:", error);
  }
}

debugTestimonials();