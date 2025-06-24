import "dotenv/config";
import { testimonialsTable } from "./airtable";

async function testTestimonialsAPI() {
  console.log("🧪 Testando API de depoimentos...");
  
  try {
    const testimonials = await testimonialsTable.findAll();
    console.log(`💬 Encontrados ${testimonials.length} depoimentos`);
    
    testimonials.forEach((testimonial, index) => {
      console.log(`\n💬 Depoimento ${index + 1}:`);
      console.log(`Nome: ${testimonial.name}`);
      console.log(`Local: ${testimonial.location}`);
      console.log(`Avaliação: ${testimonial.rating} estrelas`);
      console.log(`Mensagem: ${testimonial.message}`);
      console.log(`Avatar: ${testimonial.avatar}`);
    });
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

testTestimonialsAPI();