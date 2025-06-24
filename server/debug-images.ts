import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

async function debugImages() {
  console.log("🔍 Verificando como as imagens estão sendo retornadas...");
  
  try {
    const records = await base('Properties').select({ maxRecords: 1 }).firstPage();
    
    if (records.length > 0) {
      const record = records[0];
      console.log("\n📋 Dados completos do registro:");
      console.log("ID:", record.id);
      console.log("Campos:", Object.keys(record.fields));
      
      const images = record.get('images');
      console.log("\n🖼️ Campo images:");
      console.log("Tipo:", typeof images);
      console.log("Valor:", images);
      console.log("Array?", Array.isArray(images));
      
      if (Array.isArray(images) && images.length > 0) {
        console.log("\n🔍 Primeiro item do array:");
        console.log("Tipo:", typeof images[0]);
        console.log("Valor:", images[0]);
        console.log("Keys:", Object.keys(images[0] || {}));
      }
    }
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

debugImages();