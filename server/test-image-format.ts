import "dotenv/config";
import { propertiesTable } from "./airtable";

async function testImageFormat() {
  console.log("🔍 Testando formato final das imagens...");
  
  try {
    const properties = await propertiesTable.findAll();
    
    properties.slice(0, 2).forEach((property, index) => {
      console.log(`\n🏠 Propriedade ${index + 1}: ${property.title}`);
      console.log(`📸 Tipo das imagens: ${typeof property.images}`);
      console.log(`📸 É array? ${Array.isArray(property.images)}`);
      console.log(`📸 Quantidade: ${property.images?.length || 0}`);
      
      if (property.images && property.images.length > 0) {
        console.log(`📸 Primeira imagem:`);
        console.log(`   - Tipo: ${typeof property.images[0]}`);
        console.log(`   - Valor: ${property.images[0]}`);
        console.log(`   - É string? ${typeof property.images[0] === 'string'}`);
      }
    });
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

testImageFormat();