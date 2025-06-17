import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useRoute } from "wouter";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  Play, 
  Pause, 
  Volume2,
  Eye,
  Calendar,
  TrendingUp,
  Award,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  Wand2,
  Sparkles,
  X
} from "lucide-react";

export default function PropertyDetailFull() {
  const [, params] = useRoute("/propriedade/:id");
  const propertyId = params?.id ? parseInt(params.id) : null;
  const [isAudioPlaying, setIsAudioPlaying] = useState<{ [key: number]: boolean }>({});
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const property = properties.find(p => p.id === propertyId);

  const toggleAudio = (propertyId: number) => {
    setIsAudioPlaying(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-gray-200 rounded-xl"></div>
                  <div className="h-48 bg-gray-200 rounded-xl"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-48 bg-gray-200 rounded-xl"></div>
                  <div className="h-32 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-white/50">
              <div className="text-gray-400 mb-6">
                <Eye size={64} className="mx-auto" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Imóvel não encontrado</h1>
              <p className="text-gray-600 mb-8">
                O imóvel que você está procurando não foi encontrado ou pode ter sido removido.
              </p>
              <Button 
                onClick={() => window.location.href = '/propriedades'}
                className="bg-zuhause-blue hover:bg-blue-700 text-white px-8 py-3"
              >
                <ArrowLeft size={16} className="mr-2" />
                Voltar às Propriedades
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Image Gallery Modal */}
      {isImageGalleryOpen && property && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center relative">
            {/* Close Button */}
            <Button
              size="sm"
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white border-0 z-10"
              onClick={() => setIsImageGalleryOpen(false)}
            >
              <X size={20} />
            </Button>
            
            {/* Image Counter */}
            <div className="absolute top-6 left-6 text-white text-lg bg-black/50 px-4 py-2 rounded-full z-10">
              {currentImageIndex + 1} / {property.images.length}
            </div>
            
            {/* Carousel */}
            <Carousel className="w-full h-full max-w-6xl">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-center h-[90vh] p-4">
                      <img 
                        src={image} 
                        alt={`${property.title} - ${index + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-6 bg-white/20 hover:bg-white/30 text-white border-0" />
              <CarouselNext className="right-6 bg-white/20 hover:bg-white/30 text-white border-0" />
            </Carousel>
            
            {/* Instructions */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              Use as setas para navegar • ESC para fechar
            </div>
          </div>
        </div>
      )}

      <Navigation />
      
      {/* Hero Section with Property Images */}
      <div className="pt-16">
        <div className="relative h-[70vh] overflow-hidden">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {property.images && property.images.length > 0 ? (
                property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div 
                      className="relative h-[70vh] cursor-pointer group" 
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsImageGalleryOpen(true);
                      }}
                    >
                      <img 
                        src={image} 
                        alt={`${property.title} - ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-full">
                          Clique para ampliar
                        </div>
                      </div>
                      
                      {/* Property Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="max-w-7xl mx-auto">
                          <div className="flex flex-wrap items-center gap-4 mb-4">

                            {property.isFeatured && (
                              <Badge className="bg-amber-500 text-white px-4 py-2 text-lg font-semibold shadow-lg animate-pulse">
                                ✨ Destaque
                              </Badge>
                            )}
                          </div>
                          
                          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{property.title}</h1>
                          
                          <div className="flex items-center text-xl mb-6 drop-shadow-lg">
                            <MapPin size={24} className="mr-3 flex-shrink-0" />
                            <span>{property.location}</span>
                          </div>
                          
                          <div className="text-4xl font-bold drop-shadow-lg">
                            {formatPrice(property.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="relative h-[70vh] cursor-pointer group" onClick={() => {
                    setCurrentImageIndex(0);
                    setIsImageGalleryOpen(true);
                  }}>
                    <img 
                      src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="left-8 w-12 h-12 bg-white/20 hover:bg-white/30 border-0 text-white" />
            <CarouselNext className="right-8 w-12 h-12 bg-white/20 hover:bg-white/30 border-0 text-white" />
          </Carousel>
          
          {/* Back Button */}
          <div className="absolute top-8 left-8 z-10">
            <Button 
              onClick={() => window.location.href = '/propriedades'}
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm px-4 py-2"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-8 right-8 z-10 flex gap-4">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm w-12 h-12 p-0">
              <Heart size={20} />
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm w-12 h-12 p-0">
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Property Stats */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Características do Imóvel</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <Bed size={32} className="mx-auto mb-3 text-zuhause-blue" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Quartos</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <Bath size={32} className="mx-auto mb-3 text-zuhause-blue" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Banheiros</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <Square size={32} className="mx-auto mb-3 text-zuhause-blue" />
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <TrendingUp size={32} className="mx-auto mb-3 text-zuhause-blue" />
                    <div className="text-lg font-bold text-gray-900">{property.type}</div>
                    <div className="text-sm text-gray-600">Tipo</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Descrição Completa</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {property.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>



              {/* AI Decoration Section */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-200 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Wand2 className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Casa Decorada com IA</h2>
                    <p className="text-gray-600">Visualize como ficaria mobiliada</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Veja como este imóvel ficaria totalmente decorado e mobiliado usando nossa tecnologia de Inteligência Artificial. 
                  Simulação completa de uma casa pronta para morar com decoração moderna e funcional.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center mb-3">
                      <Sparkles size={16} className="text-purple-500 mr-2" />
                      <span className="font-medium text-gray-900">Sala de Estar</span>
                    </div>
                    <div className="text-sm text-gray-600">Mobília completa</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center mb-3">
                      <Sparkles size={16} className="text-purple-500 mr-2" />
                      <span className="font-medium text-gray-900">Quartos</span>
                    </div>
                    <div className="text-sm text-gray-600">Camas e decoração</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center mb-3">
                      <Sparkles size={16} className="text-purple-500 mr-2" />
                      <span className="font-medium text-gray-900">Cozinha</span>
                    </div>
                    <div className="text-sm text-gray-600">Eletrodomésticos</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center mb-3">
                      <Sparkles size={16} className="text-purple-500 mr-2" />
                      <span className="font-medium text-gray-900">Banheiros</span>
                    </div>
                    <div className="text-sm text-gray-600">Acabamentos</div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300 shadow-lg py-4 text-lg">
                  <Wand2 size={20} className="mr-3" />
                  Ver Casa Decorada com IA (Em breve)
                </Button>
              </div>
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="space-y-8">
              
              {/* Contact Section - Fixed Position */}
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-zuhause-blue via-blue-600 to-blue-700 p-8 rounded-2xl text-white shadow-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Phone size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Entre em Contato</h3>
                    <p className="text-white/90 leading-relaxed">
                      Interessado neste imóvel? Nossa equipe especializada está pronta para ajudar você a realizar o sonho da casa própria!
                    </p>
                  </div>
                
                <div className="space-y-6">
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-0 py-6 text-lg font-semibold rounded-xl"
                    onClick={() => window.open('https://wa.me/5521975155741', '_blank')}
                  >
                    <FaWhatsapp size={24} className="mr-4" />
                    <div className="text-left">
                      <div>Chamar no WhatsApp</div>
                      <div className="text-sm opacity-90">Resposta rápida garantida</div>
                    </div>
                  </Button>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold">(21) 97515-5741</div>
                        <div className="text-sm text-white/80">Ligue agora mesmo</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm py-4 rounded-xl"
                    onClick={() => window.open('mailto:contato@zuhause.com.br', '_blank')}
                  >
                    <Mail size={20} className="mr-3" />
                    Enviar Email
                  </Button>
                  </div>
                </div>
                
                {/* Schedule Visit Section */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-zuhause-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Agendar Visita</h3>
                    <p className="text-gray-600">
                      Conheça pessoalmente este imóvel excepcional
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-zuhause-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-0 py-6 text-lg font-semibold rounded-xl"
                      onClick={() => window.open('tel:+5521975155741', '_self')}
                    >
                      <Phone size={24} className="mr-4" />
                      <div className="text-left">
                        <div>Ligar Agora</div>
                        <div className="text-sm opacity-90">(21) 97515-5741</div>
                      </div>
                    </Button>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-0 py-6 text-lg font-semibold rounded-xl"
                      onClick={() => window.open('mailto:contato@zuhause.com.br', '_blank')}
                    >
                      <Mail size={24} className="mr-4" />
                      <div className="text-left">
                        <div>Enviar E-mail</div>
                        <div className="text-sm opacity-90">contato@zuhause.com.br</div>
                      </div>
                    </Button>
                  </div>
                </div>
                
                {/* Audio Narration Section */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-xl border border-gray-200 mt-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Volume2 className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Narração do Imóvel</h3>
                      <p className="text-sm text-gray-600">Ouça a descrição completa</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Ouça nossa narração exclusiva com todos os detalhes e características especiais deste imóvel premium.
                  </p>
                  
                  <Button 
                    onClick={() => toggleAudio(property.id)}
                    className={`w-full transition-all duration-200 py-4 ${
                      isAudioPlaying[property.id] 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                    }`}
                  >
                    {isAudioPlaying[property.id] ? (
                      <>
                        <Pause size={20} className="mr-3" />
                        Pausar Narração
                      </>
                    ) : (
                      <>
                        <Play size={20} className="mr-3" />
                        Reproduzir Narração (Em breve)
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Features Section - Moved here */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Características Especiais</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="w-3 h-3 bg-zuhause-blue rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}