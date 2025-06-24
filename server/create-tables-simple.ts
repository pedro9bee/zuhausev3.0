import "dotenv/config";
import axios from 'axios';

const token = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

async function createSimpleTables() {
  console.log("🔧 Criando tabelas simples no Airtable...");
  
  if (!token || !baseId) {
    console.error("❌ AIRTABLE_API_KEY ou AIRTABLE_BASE_ID não configurados");
    return;
  }

  try {
    // Primeiro, testar se conseguimos acessar a API
    console.log("🔍 Testando acesso à Web API...");
    const baseInfo = await axios.get(
      `https://api.airtable.com/v0/meta/bases/${baseId}`,
      { 
        headers: { 
          'Authorization': `Bearer ${token}`
        } 
      }
    );
    console.log(`✅ Base encontrada: ${baseInfo.data.name}`);

    // Criar tabela Properties com campos básicos primeiro
    console.log("📋 Criando tabela Properties...");
    const propertiesPayload = {
      name: 'Properties',
      fields: [
        { name: 'title', type: 'singleLineText' },
        { name: 'description', type: 'longText' },
        { name: 'price', type: 'singleLineText' },
        { name: 'location', type: 'singleLineText' },
        { name: 'bedrooms', type: 'number' },
        { name: 'bathrooms', type: 'number' },
        { name: 'area', type: 'number' },
        { name: 'type', type: 'singleLineText' },
        { name: 'status', type: 'singleLineText' },
        { name: 'isForSale', type: 'checkbox' },
        { name: 'isForRent', type: 'checkbox' },
        { name: 'isFeatured', type: 'checkbox' }
      ]
    };

    console.log("📤 Enviando payload:", JSON.stringify(propertiesPayload, null, 2));
    
    const propertiesResponse = await axios.post(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      propertiesPayload,
      { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    console.log(`✅ Tabela Properties criada (ID: ${propertiesResponse.data.id})`);

    // Criar tabela Testimonials
    console.log("💬 Criando tabela Testimonials...");
    const testimonialsResponse = await axios.post(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        name: 'Testimonials',
        fields: [
          { name: 'name', type: 'singleLineText' },
          { name: 'location', type: 'singleLineText' },
          { name: 'rating', type: 'number' },
          { name: 'message', type: 'longText' },
          { name: 'avatar', type: 'singleLineText' }
        ]
      },
      { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    console.log(`✅ Tabela Testimonials criada (ID: ${testimonialsResponse.data.id})`);

    console.log("🎉 Tabelas básicas criadas! Agora vamos popular com dados...");
    
  } catch (error) {
    console.error("❌ Erro:", error.response?.data || error.message);
    console.error("Status:", error.response?.status);
    
    if (error.response?.status === 403) {
      console.log("\n🔑 Problema de permissão:");
      console.log("1. Verifique se o token é um Personal Access Token");
      console.log("2. Verifique se tem permissão 'schema:write'");
      console.log("3. Verifique se a Web API está habilitada");
    }
  }
}

createSimpleTables();