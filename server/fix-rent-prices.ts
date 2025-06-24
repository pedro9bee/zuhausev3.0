import "dotenv/config";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

async function fixRentPrices() {
  console.log("💰 Corrigindo preços de aluguel...");
  
  try {
    const records = await base('Properties').select().all();
    
    // Dados para apartamentos/casas com aluguel
    const rentUpdates = [
      { index: 1, rentPrice: 3500 }, // Golden Green
      { index: 3, rentPrice: 2800 }  // Jardim Itanhangá
    ];

    for (const update of rentUpdates) {
      if (records[update.index]) {
        try {
          await base('Properties').update(records[update.index].id, {
            rentPrice: update.rentPrice,
            isForRent: true
          });
          console.log(`✅ Preço de aluguel atualizado: R$ ${update.rentPrice}`);
        } catch (error) {
          console.log(`❌ Erro ao atualizar aluguel:`, error.message);
        }
      }
    }

    // Também vou atualizar as imagens corretamente
    const imageUpdates = [
      { index: 0, images: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" }, // Casa moderna
      { index: 1, images: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" }, // Apartamento
      { index: 2, images: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800" }, // Casa campo
      { index: 3, images: "https://images.unsplash.com/photo-1600573472591-ee911a04cf3a?w=800" }  // Casa família
    ];

    for (const update of imageUpdates) {
      if (records[update.index]) {
        try {
          await base('Properties').update(records[update.index].id, {
            images: update.images
          });
          console.log(`✅ Imagem atualizada para propriedade ${update.index + 1}`);
        } catch (error) {
          console.log(`❌ Erro ao atualizar imagem:`, error.message);
        }
      }
    }

    console.log("🎉 Correções aplicadas!");
    console.log("🔄 Recarregue http://localhost:3000/propriedades");
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

fixRentPrices();