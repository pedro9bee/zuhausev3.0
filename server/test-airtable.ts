import "dotenv/config";
import { propertiesTable, testimonialsTable } from "./airtable";

async function testAirtable() {
  console.log("🔍 Testando conexão com Airtable...");
  
  try {
    console.log("📋 Buscando propriedades...");
    const properties = await propertiesTable.findAll();
    console.log(`✅ Encontradas ${properties.length} propriedades`);
    
    console.log("💬 Buscando depoimentos...");
    const testimonials = await testimonialsTable.findAll();
    console.log(`✅ Encontrados ${testimonials.length} depoimentos`);
    
    if (properties.length === 0) {
      console.log("⚠️  Nenhuma propriedade encontrada. Você precisa:");
      console.log("1. Criar a tabela 'Properties' no Airtable");
      console.log("2. Adicionar os campos necessários");
      console.log("3. Dar permissões de escrita para a API key");
    }
    
    if (testimonials.length === 0) {
      console.log("⚠️  Nenhum depoimento encontrado. Você precisa:");
      console.log("1. Criar a tabela 'Testimonials' no Airtable");
      console.log("2. Adicionar os campos necessários");
    }
    
  } catch (error) {
    console.error("❌ Erro ao conectar com Airtable:", error);
    console.log("\n🔧 Possíveis soluções:");
    console.log("1. Verificar se AIRTABLE_API_KEY está correto");
    console.log("2. Verificar se AIRTABLE_BASE_ID está correto");
    console.log("3. Verificar se as tabelas existem no Airtable");
    console.log("4. Verificar permissões da API key");
  }
}

testAirtable();