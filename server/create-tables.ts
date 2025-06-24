import "dotenv/config";
import axios from 'axios';

const token = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

async function createTables() {
  console.log("🔧 Criando tabelas no Airtable via Web API...");
  
  if (!token || !baseId) {
    console.error("❌ AIRTABLE_API_KEY ou AIRTABLE_BASE_ID não configurados");
    return;
  }

  try {
    // Criar tabela Properties
    console.log("📋 Criando tabela Properties...");
    const propertiesResponse = await axios.post(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
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
          { name: 'images', type: 'multipleAttachments' },
          { 
            name: 'features', 
            type: 'multipleSelect',
            options: {
              choices: [
                { name: 'Piscina' },
                { name: 'Área Gourmet' },
                { name: 'Garagem' },
                { name: 'Jardim' },
                { name: 'Terraço' },
                { name: 'Churrasqueira' },
                { name: 'Vista Panorâmica' },
                { name: 'Suítes' },
                { name: 'Terreno Grande' },
                { name: 'Árvores Frutíferas' },
                { name: 'Varanda' },
                { name: 'Lareira' },
                { name: 'Área de Lazer' },
                { name: 'Jardim Paisagístico' },
                { name: 'Quintal' },
                { name: 'Área de Serviço' },
                { name: 'Localização' }
              ]
            }
          },
          { name: 'isForSale', type: 'checkbox' },
          { name: 'isForRent', type: 'checkbox' },
          { name: 'rentPrice', type: 'singleLineText' },
          { name: 'isFeatured', type: 'checkbox' }
        ],
        description: 'Tabela de propriedades imobiliárias - Zuhause'
      },
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
        ],
        description: 'Depoimentos de clientes - Zuhause'
      },
      { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    console.log(`✅ Tabela Testimonials criada (ID: ${testimonialsResponse.data.id})`);

    // Criar tabela Contacts
    console.log("📞 Criando tabela Contacts...");
    const contactsResponse = await axios.post(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        name: 'Contacts',
        fields: [
          { name: 'name', type: 'singleLineText' },
          { name: 'email', type: 'email' },
          { name: 'phone', type: 'phoneNumber' },
          { name: 'interest', type: 'singleLineText' },
          { name: 'message', type: 'longText' },
          { name: 'createdAt', type: 'dateTime' }
        ],
        description: 'Contatos de interessados - Zuhause'
      },
      { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    console.log(`✅ Tabela Contacts criada (ID: ${contactsResponse.data.id})`);

    // Criar tabela Users
    console.log("👤 Criando tabela Users...");
    const usersResponse = await axios.post(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        name: 'Users',
        fields: [
          { name: 'username', type: 'singleLineText' },
          { name: 'password', type: 'singleLineText' }
        ],
        description: 'Usuários administrativos - Zuhause'
      },
      { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    console.log(`✅ Tabela Users criada (ID: ${usersResponse.data.id})`);

    console.log("🎉 Todas as tabelas foram criadas com sucesso!");
    console.log("▶️  Agora você pode rodar: npx tsx server/setup-airtable.ts");
    
  } catch (error) {
    console.error("❌ Erro ao criar tabelas:", error.response?.data || error.message);
    
    if (error.response?.status === 403) {
      console.log("\n🔑 Erro de permissão. Verifique:");
      console.log("1. Se o token tem permissão 'schema:write'");
      console.log("2. Se a Web API está habilitada na base");
      console.log("3. Se você é Owner/Creator da base");
    }
    
    if (error.response?.status === 422) {
      console.log("\n📋 Possíveis problemas:");
      console.log("1. Tabela já existe");
      console.log("2. Erro na estrutura dos campos");
    }
  }
}

createTables();