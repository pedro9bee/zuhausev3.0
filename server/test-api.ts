import "dotenv/config";
import { propertiesTable } from "./airtable";

async function testAPI() {
  console.log("🧪 Testando nossa API de propriedades...");
  
  try {
    const properties = await propertiesTable.findAll();
    console.log(`📋 Encontradas ${properties.length} propriedades`);
    
    properties.forEach((property, index) => {
      console.log(`\n🏠 Propriedade ${index + 1}:`);
      console.log(`Título: ${property.title}`);
      console.log(`Imagens: ${property.images.length} encontrada(s)`);
      if (property.images.length > 0) {
        console.log(`Primeira imagem: ${property.images[0]}`);
      }
    });
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

testAPI();