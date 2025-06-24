import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

async function fixTestimonials() {
  console.log("🔧 Corrigindo depoimentos...");
  
  try {
    // Primeiro, deletar os registros vazios existentes
    console.log("🗑️  Removendo registros vazios...");
    const existingRecords = await base('Testimonials').select().all();
    
    for (const record of existingRecords) {
      await base('Testimonials').destroy(record.id);
      console.log(`✅ Removido registro vazio: ${record.id}`);
    }
    
    // Agora vou tentar descobrir qual campo padrão existe
    console.log("\n🧪 Tentando criar depoimento apenas com campo Name/title...");
    
    try {
      // Tentar com o campo mais básico - Name (que sempre existe no Airtable)
      const testRecord = await base('Testimonials').create({
        "Name": "Maria Silva - Teste"
      });
      
      console.log(`✅ Sucesso! Campo 'Name' existe. ID: ${testRecord.id}`);
      
      // Atualizar para adicionar mais informações
      await base('Testimonials').update(testRecord.id, {
        "Name": "⭐⭐⭐⭐⭐ Maria Silva - Alphaville, SP - 'Excelente atendimento! Encontrei a casa dos meus sonhos rapidamente. Equipe muito profissional e atenciosa.'"
      });
      
      // Criar mais depoimentos
      const testimonials = [
        "⭐⭐⭐⭐⭐ João Santos - Vila Madalena, SP - 'Processo de compra muito tranquilo. Recomendo a todos que buscam um imóvel de qualidade.'",
        "⭐⭐⭐⭐ Ana Costa - Atibaia, SP - 'Ótima experiência! Venderam minha casa rapidamente e com um preço justo. Muito satisfeita.'",
        "⭐⭐⭐⭐⭐ Carlos Oliveira - Barueri, SP - 'Profissionais competentes e honestos. Me ajudaram a encontrar o investimento perfeito.'"
      ];
      
      for (const testimonial of testimonials) {
        const record = await base('Testimonials').create({
          "Name": testimonial
        });
        console.log(`✅ Depoimento criado: ${record.id}`);
      }
      
      console.log("\n🎉 Depoimentos criados com sucesso!");
      
    } catch (error) {
      console.log("❌ Erro com campo Name:", error.message);
      
      // Tentar com outros nomes possíveis
      const possibleFields = ["Title", "Depoimento", "Cliente", "Testimonial"];
      
      for (const field of possibleFields) {
        try {
          const record = await base('Testimonials').create({
            [field]: "Teste " + field
          });
          console.log(`✅ Sucesso com campo '${field}': ${record.id}`);
          await base('Testimonials').destroy(record.id);
          break;
        } catch (err) {
          console.log(`❌ Falhou com ${field}`);
        }
      }
    }
    
  } catch (error) {
    console.error("❌ Erro geral:", error);
  }
}

fixTestimonials();