import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

async function discoverTestimonialFields() {
  console.log("🔍 Tentando descobrir os campos reais da tabela Testimonials...");
  
  try {
    // Tentar diferentes variações de nomes de campos
    const possibleFieldNames = [
      'name', 'nome', 'Name', 'Nome',
      'location', 'localizacao', 'localização', 'Location', 'Localização',
      'rating', 'avaliacao', 'avaliação', 'Rating', 'Avaliação',
      'message', 'mensagem', 'depoimento', 'Message', 'Mensagem', 'Depoimento',
      'avatar', 'foto', 'imagem', 'Avatar', 'Foto', 'Imagem'
    ];
    
    // Primeiro, criar um registro de teste para descobrir como os campos são aceitos
    console.log("🧪 Tentando criar um depoimento de teste...");
    
    for (const nameField of ['name', 'nome', 'Name', 'Nome']) {
      try {
        const testRecord = await base('Testimonials').create({
          [nameField]: "Teste Descoberta",
          [`${nameField === 'name' ? 'location' : nameField === 'nome' ? 'localizacao' : nameField === 'Name' ? 'Location' : 'Localização'}`]: "São Paulo",
          [`${nameField === 'name' ? 'rating' : nameField === 'nome' ? 'avaliacao' : nameField === 'Name' ? 'Rating' : 'Avaliação'}`]: 5,
          [`${nameField === 'name' ? 'message' : nameField === 'nome' ? 'mensagem' : nameField === 'Name' ? 'Message' : 'Mensagem'}`]: "Teste de descoberta",
          [`${nameField === 'name' ? 'avatar' : nameField === 'nome' ? 'foto' : nameField === 'Name' ? 'Avatar' : 'Foto'}`]: "https://example.com/avatar.jpg"
        });
        
        console.log(`✅ Sucesso com campos em ${nameField === 'name' ? 'inglês' : nameField === 'nome' ? 'português minúsculo' : nameField === 'Name' ? 'inglês capitalizado' : 'português capitalizado'}:`);
        console.log(`✅ Registro criado: ${testRecord.id}`);
        
        // Deletar o registro de teste
        await base('Testimonials').destroy(testRecord.id);
        console.log("🗑️  Registro de teste removido");
        break;
        
      } catch (error) {
        console.log(`❌ Falhou com ${nameField}:`, error.message);
      }
    }
    
    // Agora listar todos os registros para ver os campos
    console.log("\n📋 Listando registros existentes...");
    console.log("\n📋 ALTERADO");
    console.log("\n📋 ALTERADO");
    console.log("\n📋 ALTERADO");
    const records = await base('Testimonials').select().all();
    
    if (records.length > 0) {
      records.forEach((record, index) => {
        console.log(`\n💬 Depoimento ${index + 1}:`);
        console.log("ID:", record.id);
        console.log("Campos:", Object.keys(record.fields));
        
        Object.keys(record.fields).forEach(field => {
          const value = record.get(field);
          console.log(`  ${field}: ${value} (${typeof value})`);
        });
      });
    }
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

discoverTestimonialFields();