import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PropertySearch from "@/components/property-search";
import { useQuery } from "@tanstack/react-query";
import type { Property, Testimonial } from "@shared/schema";
import PropertyCard from "@/components/property-card";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, HomeIcon, Tag, Key, Calculator, Handshake, ClipboardList, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Instagram } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const featuredProperties = properties.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PropertySearch />
      
      {/* Featured Properties */}
      <section id="propriedades" className="bg-section-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Propriedades em Destaque</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Selecionamos cuidadosamente os melhores imóveis para você</p>
          </div>
          
          {propertiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/propriedades">
              <Button className="bg-zuhause-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
                Ver Todos os Imóveis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zuhause-blue/5 via-transparent to-transparent"></div>
        
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-zuhause-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">Sobre Nós</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              16 anos de experiência transformando sonhos em realidade no mercado imobiliário brasileiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Content Column */}
            <div className="xl:col-span-7 space-y-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
                  <p className="text-xl leading-relaxed">
                    Há <strong className="text-zuhause-blue font-bold">16 anos no mercado imobiliário</strong>, atuando em grandes empresas, decidimos dar um passo maior. Agora, estamos prontos para oferecer uma experiência única e humana na compra e venda de imóveis.
                  </p>
                  
                  <p className="leading-relaxed">
                    Nossa trajetória começou com muita determinação e aprendizado. Após anos de dedicação no setor, resolvemos empreender e abrir nossa própria imobiliária, trazendo toda a experiência e paixão pelo que fazemos.
                  </p>
                  
                  <p className="leading-relaxed">
                    Valorizamos nossos colaboradores, entendendo seus sonhos e objetivos. Juntos, trabalhamos para que cada venda seja uma realização, tanto para o cliente quanto para quem está do nosso lado.
                  </p>
                </div>
              </div>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-white/50">
                  <div className="text-5xl font-bold text-zuhause-blue mb-3 group-hover:scale-110 transition-transform duration-300">16+</div>
                  <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Anos de Experiência</div>
                </div>
                <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-white/50">
                  <div className="text-5xl font-bold text-zuhause-blue mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Imóveis Vendidos</div>
                </div>
                <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-white/50">
                  <div className="text-5xl font-bold text-zuhause-blue mb-3 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Clientes Satisfeitos</div>
                </div>
              </div>
            </div>
            
            {/* Video Column */}
            <div className="xl:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full">
                {/* Video Container - Ready for video integration with vertical aspect ratio */}
                <div className="relative bg-gradient-to-br from-zuhause-blue/10 to-purple-600/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/50">
                  <div className="aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                    <video 
                      className="w-full h-full object-cover"
                      controls
                      poster="/attached_assets/DSC05718-HDR-20_1750156747504.jpg"
                    >
                      <source src="/attached_assets/Frame01_1750177625956.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-section-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Atendimento personalizado para cada etapa da sua jornada imobiliária</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: HomeIcon, title: "Compra de Imóveis", desc: "Encontramos o imóvel perfeito para você, com todo suporte jurídico e financeiro necessário.", color: "from-blue-500 to-purple-600" },
              { icon: Tag, title: "Venda de Imóveis", desc: "Vendemos seu imóvel pelo melhor preço, com estratégias de marketing personalizadas.", color: "from-green-500 to-blue-500" },
              { icon: Key, title: "Locação", desc: "Administramos aluguéis com transparência e eficiência para proprietários e inquilinos.", color: "from-purple-500 to-pink-500" },
              { icon: Calculator, title: "Avaliação", desc: "Avaliamos seu imóvel com precisão, baseado em análise de mercado atualizada.", color: "from-orange-500 to-red-500" },
              { icon: Handshake, title: "Consultoria", desc: "Orientamos sobre investimentos imobiliários e oportunidades de mercado.", color: "from-teal-500 to-cyan-500" },
              { icon: ClipboardList, title: "Documentação", desc: "Cuidamos de toda documentação necessária com agilidade e segurança jurídica.", color: "from-indigo-500 to-purple-500" },
            ].map((service, index) => (
              <Card 
                key={index} 
                className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 group cursor-pointer overflow-hidden relative"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "slideInUp 0.8s ease-out forwards"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                     style={{background: `linear-gradient(135deg, var(--tw-gradient-stops))`}}></div>
                <CardContent className="p-0 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <service.icon className="text-white transform group-hover:scale-110 transition-transform duration-300" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-zuhause-blue transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{service.desc}</p>
                </CardContent>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-zuhause-blue/20 to-purple-500/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Para Nossos Colaboradores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Valorizamos nossos colaboradores, entendendo seus sonhos e objetivos. Juntos, trabalhamos para que cada venda seja uma realização, tanto para o cliente quanto para quem está do nosso lado.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { name: "Júnior Martins", role: "Corretor", experience: "12 anos de experiência", image: "/attached_assets/Junior Martins_1750110494934.png" },
              { name: "Pedro Lemos", role: "Diretor de AI", experience: "5 anos de experiência", image: "/attached_assets/kk_1750110195335.png" },
              { name: "Camila Souza", role: "Corretora", experience: "6 anos de experiência", image: "/attached_assets/Leonardo_Kino_XL_A_candid_shot_of_the_real_estate_agent_holdin_0_1750111077584.jpg" },
              { name: "Bruno Almeida", role: "Analista de Precificação de Imóveis", experience: "4 anos de experiência", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
              { name: "Ricardo Santos", role: "Especialista em Crédito Imobiliário", experience: "7 anos de experiência", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
              { name: "Fernanda Silva", role: "Gestora de Relacionamento com o Cliente", experience: "5 anos de experiência", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
              { name: "Marcelo Oliveira", role: "Coordenador de Parcerias Estratégicas", experience: "9 anos de experiência", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
              { name: "Juliana Ribeiro", role: "Curadora de Portfólio Residencial", experience: "6 anos de experiência", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
              { name: "Ana Costa", role: "Coordenadora de Marketing Digital Imobiliário", experience: "5 anos de experiência", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
              { name: "Thiago Pereira", role: "Fotógrafo Imobiliário e Criador de Conteúdo", experience: "8 anos de experiência", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
              { name: "Carlos Mendes", role: "Consultor de Investimentos Imobiliários", experience: "8 anos de experiência", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`} 
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow" 
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-t from-zuhause-blue/20 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-zuhause-blue font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-zuhause-gradient rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-6">Faça Parte da Nossa Equipe</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Buscamos profissionais apaixonados pelo mercado imobiliário que compartilhem nossos valores de excelência e humanização.</p>
            <Button 
              className="bg-white text-zuhause-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
              onClick={() => {
                const element = document.getElementById('contato');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Trabalhe Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-section-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">O Que Nossos Clientes Dizem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Depoimentos de quem já realizou o sonho da casa própria conosco</p>
          </div>
          
          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse p-8">
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="h-20 bg-gray-200 rounded mb-6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-white p-8 shadow-lg h-full">
                      <CardContent className="p-0">
                        <div className="flex items-center mb-6">
                          <div className="flex text-yellow-400 mr-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm">{testimonial.rating}.0</span>
                        </div>
                        <p className="text-gray-600 mb-6 italic">"{testimonial.message}"</p>
                        <div className="flex items-center">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-12 h-12 rounded-full object-cover mr-4" 
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                            <div className="text-gray-600 text-sm">{testimonial.location}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Entre em Contato</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Estamos prontos para ajudar você a encontrar ou vender seu imóvel</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="space-y-8">
                {[
                  { icon: MapPin, title: "Endereço", content: "Av. das Américas, 3434 - Sala 201\nBarra da Tijuca, Rio de Janeiro - RJ\n22640-102" },
                  { icon: Phone, title: "Telefone", content: "(21) 3333-4444\n(21) 99999-8888" },
                  { icon: Mail, title: "E-mail", content: "contato@zuhause.com.br\nvendas@zuhause.com.br" },
                  { icon: Clock, title: "Horário de Funcionamento", content: "Segunda a Sexta: 9h às 18h\nSábado: 9h às 14h\nDomingo: Plantão" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-zuhause-gradient rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <contact.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{contact.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Siga-nos nas Redes Sociais</h3>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://www.instagram.com/zuhauseimoveisrj?igsh=a2RxanhkNWs0NDJh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-zuhause-gradient rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="text-white" size={20} />
                  </a>

                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
