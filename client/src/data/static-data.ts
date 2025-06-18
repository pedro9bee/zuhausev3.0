// Static data for the website
export const properties = [
  {
    id: 1,
    title: "Golden Green",
    description: "Golden Green é um empreendimento de alto padrão localizado em uma das regiões mais valorizadas da cidade. Com arquitetura moderna e acabamentos de luxo, oferece o melhor em conforto e sofisticação para toda a família.",
    price: "R$ 2.800.000",
    location: "Barra da Tijuca, Rio de Janeiro",
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    type: "Apartamento",
    status: "Disponível",
    features: ["Sacada com vista", "Área gourmet", "3 vagas de garagem", "Piscina", "Academia"],
    isForSale: true,
    isForRent: false,
    rentPrice: null,
    isFeatured: true,
    images: [
      "assets/GoldenGreen_1750105349165.jpg",
      "assets/DSC03004_1750194498785.jpg",
      "assets/DSC03066_1750194498785.jpg",
      "assets/DSC03282_1750194498786.jpg"
    ]
  },
  {
    id: 2,
    title: "Alphaville 2",
    description: "Localizado no prestigioso condomínio Alphaville 2, esta residência oferece privacidade, segurança e qualidade de vida incomparáveis. Com amplos espaços e área de lazer completa.",
    price: "R$ 4.200.000",
    location: "Alphaville, São Paulo",
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    type: "Casa",
    status: "Disponível",
    features: ["Jardim privativo", "Churrasqueira", "4 vagas de garagem", "Piscina", "Área de lazer"],
    isForSale: true,
    isForRent: false,
    rentPrice: null,
    isFeatured: true,
    images: [
      "assets/Alphaville 2_1750107264406.jpg",
      "assets/DSC03470_1750194498784.jpg",
      "assets/DSC03569_1750194275120.jpg"
    ]
  },
  {
    id: 3,
    title: "Del Lago",
    description: "Apartamento de luxo com vista panorâmica para o lago. Projeto arquitetônico exclusivo com materiais nobres e tecnologia de ponta para máximo conforto e praticidade.",
    price: "R$ 3.500.000",
    location: "Recreio dos Bandeirantes, Rio de Janeiro",
    bedrooms: 3,
    bathrooms: 4,
    area: 280,
    type: "Apartamento",
    status: "Disponível",
    features: ["Vista para o lago", "Varanda gourmet", "2 vagas de garagem", "Portaria 24h", "Quadra poliesportiva"],
    isForSale: true,
    isForRent: false,
    rentPrice: null,
    isFeatured: false,
    images: [
      "assets/Del Lago_1750107985029.jpg",
      "assets/DSC03629_1750194275121.jpg",
      "assets/DSC03637_1750194275120.jpg"
    ]
  },
  {
    id: 4,
    title: "Arouca",
    description: "Imóvel de alto padrão em localização privilegiada. Design contemporâneo com espaços integrados e vista deslumbrante. Perfeito para quem busca exclusividade e elegância.",
    price: "R$ 5.200.000",
    location: "Leblon, Rio de Janeiro",
    bedrooms: 4,
    bathrooms: 5,
    area: 380,
    type: "Cobertura",
    status: "Disponível",
    features: ["Terraço privativo", "Vista para o mar", "3 vagas de garagem", "Elevador privativo", "Piscina privativa"],
    isForSale: true,
    isForRent: false,
    rentPrice: null,
    isFeatured: true,
    images: [
      "assets/Arouca_1750105633487.jpg",
      "assets/DSC03642_1750194275122.jpg",
      "assets/DSC04028_1750193852672.jpg"
    ]
  },
  {
    id: 5,
    title: "Jardim Itanhangá",
    description: "Casa em condomínio fechado com total privacidade e contato com a natureza. Arquitetura moderna integrada à paisagem natural, proporcionando bem-estar e tranquilidade.",
    price: "R$ 3.800.000",
    location: "Itanhangá, Rio de Janeiro",
    bedrooms: 4,
    bathrooms: 4,
    area: 350,
    type: "Casa",
    status: "Disponível",
    features: ["Jardim com vista", "Área de lazer", "3 vagas de garagem", "Segurança 24h", "Trilha ecológica"],
    isForSale: true,
    isForRent: false,
    rentPrice: null,
    isFeatured: false,
    images: [
      "assets/Jardim Itanhangá_1750105882168.jpg",
      "assets/DSC04231_1750193852672.jpg",
      "assets/DSC04248_1750193852671.jpg"
    ]
  },
  {
    id: 6,
    title: "Jardim Pindorama",
    description: "Residência exclusiva em condomínio de alto padrão. Projeto arquitetônico único com jardins paisagísticos e área de lazer completa para toda a família.",
    price: "R$ 4.800.000",
    location: "Jardim Pindorama, São Paulo",
    bedrooms: 5,
    bathrooms: 6,
    area: 420,
    type: "Casa",
    status: "Disponível",
    features: ["Jardim paisagístico", "Piscina aquecida", "4 vagas de garagem", "Espaço gourmet", "Quadra de tênis"],
    isForSale: true,
    isForRent: false,
    rentPrice: null,
    isFeatured: false,
    images: [
      "assets/Jardim Pindorama_1750105356165.jpg",
      "assets/DSC04427_1750194879004.jpg",
      "assets/DSC04595_1750194879000.jpg"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Roberto e Carla",
    location: "Barra da Tijuca",
    message: "A ZuHause nos ajudou a encontrar a casa dos nossos sonhos. O atendimento foi excepcional e a equipe sempre muito profissional. Recomendamos para todos que buscam qualidade e confiança.",
    text: "A ZuHause nos ajudou a encontrar a casa dos nossos sonhos. O atendimento foi excepcional e a equipe sempre muito profissional. Recomendamos para todos que buscam qualidade e confiança.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Marina Silva",
    location: "Leblon",
    message: "Experiência incrível! A equipe da ZuHause entendeu exatamente o que eu procurava e me apresentou opções perfeitas. O processo foi rápido e transparente do início ao fim.",
    text: "Experiência incrível! A equipe da ZuHause entendeu exatamente o que eu procurava e me apresentou opções perfeitas. O processo foi rápido e transparente do início ao fim.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c88c?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Eduardo Santos",
    location: "Alphaville",
    message: "Profissionalismo e dedicação impressionantes. A ZuHause superou todas as minhas expectativas. Encontrei meu apartamento ideal em poucos dias. Muito satisfeito com o resultado!",
    text: "Profissionalismo e dedicação impressionantes. A ZuHause superou todas as minhas expectativas. Encontrei meu apartamento ideal em poucos dias. Muito satisfeito com o resultado!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Ana e Carlos",
    location: "Recreio",
    message: "Atendimento personalizado e expertise incomparável. A equipe da ZuHause nos guiou em cada etapa da compra. Sentimos total confiança durante todo o processo.",
    text: "Atendimento personalizado e expertise incomparável. A equipe da ZuHause nos guiou em cada etapa da compra. Sentimos total confiança durante todo o processo.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face"
  }
];

export const contacts = [];