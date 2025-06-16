import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PropertySearch from "@/components/property-search";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
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
  Filter,
  Grid3X3,
  List
} from "lucide-react";

export default function Properties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<{ [key: number]: boolean }>({});
  const [filter, setFilter] = useState<"all" | "sale" | "rent">("all");
  const [sortBy, setSortBy] = useState<"price" | "size" | "date">("price");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = properties.filter(property => {
    if (filter === "sale") return property.isForSale;
    if (filter === "rent") return !property.isForSale;
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "size") return Number(a.area) - Number(b.area);
    return 0;
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const toggleAudio = (propertyId: number) => {
    setIsAudioPlaying(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
    
    // Simulate audio feedback
    setTimeout(() => {
      setIsAudioPlaying(prev => ({
        ...prev,
        [propertyId]: false
      }));
    }, 3000);
  };

  const PropertyDetailModal = ({ property }: { property: Property }) => (
    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-zuhause-blue to-purple-600 bg-clip-text text-transparent">
          {property.title}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-8">
        {/* Property Images Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images && property.images.length > 0 ? (
                property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-72 md:h-96">
                      <img 
                        src={image} 
                        alt={`${property.title} - ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="relative h-72 md:h-96">
                    <img 
                      src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
                      alt={property.title}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          
          <div className="absolute top-6 left-6">
            <Badge className={`${property.isForSale ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 text-sm font-semibold shadow-lg`}>
              {property.isForSale ? "À Venda" : "Para Alugar"}
            </Badge>
          </div>
          
          <div className="absolute top-6 right-6 flex gap-2">
            <Button size="sm" className="bg-white/90 text-gray-700 hover:bg-white backdrop-blur-sm shadow-lg">
              <Heart size={16} />
            </Button>
            <Button size="sm" className="bg-white/90 text-gray-700 hover:bg-white backdrop-blur-sm shadow-lg">
              <Share2 size={16} />
            </Button>
          </div>
        </div>

        {/* Property Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informações Principais</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <Bed className="mx-auto mb-2 text-zuhause-blue" size={24} />
                  <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                  <div className="text-xs text-gray-600">Quartos</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <Bath className="mx-auto mb-2 text-zuhause-blue" size={24} />
                  <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                  <div className="text-xs text-gray-600">Banheiros</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <Square className="mx-auto mb-2 text-zuhause-blue" size={24} />
                  <div className="font-semibold text-gray-900">{property.area}</div>
                  <div className="text-xs text-gray-600">m²</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <MapPin className="mx-auto mb-2 text-zuhause-blue" size={24} />
                  <div className="font-semibold text-gray-900 text-xs">{property.location}</div>
                  <div className="text-xs text-gray-600">Localização</div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border-2 border-zuhause-blue/20">
                <div className="text-3xl font-bold text-zuhause-blue mb-1">
                  {formatPrice(property.price)}
                </div>
                {!property.isForSale && <div className="text-sm text-gray-600">por mês</div>}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Descrição Completa</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {property.description}
              </p>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Características do Imóvel</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 py-1">
                      <div className="w-2 h-2 bg-zuhause-blue rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Volume2 className="mr-2 text-zuhause-blue" size={24} />
                Narração da Descrição
              </h3>
              <p className="text-gray-600 mb-4">
                Ouça uma descrição detalhada deste imóvel com nossa tecnologia de áudio imersivo.
              </p>
              <Button
                onClick={() => toggleAudio(property.id)}
                disabled={isAudioPlaying[property.id]}
                className={`w-full ${isAudioPlaying[property.id] 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-zuhause-gradient hover:opacity-90'
                } transition-all duration-300 py-3`}
              >
                {isAudioPlaying[property.id] ? (
                  <>
                    <div className="animate-pulse flex items-center">
                      <div className="flex space-x-1 mr-3">
                        <div className="w-1 h-4 bg-white rounded animate-bounce"></div>
                        <div className="w-1 h-4 bg-white rounded animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-4 bg-white rounded animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      Reproduzindo...
                    </div>
                  </>
                ) : (
                  <>
                    <Play size={18} className="mr-2" />
                    Ouvir Descrição do Imóvel
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Funcionalidade de áudio personalizada em desenvolvimento
              </p>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-zuhause-blue to-purple-600 p-6 rounded-xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-4">Entre em Contato</h3>
              <p className="text-white/90 mb-6 text-sm">
                Interessado neste imóvel? Nossa equipe está pronta para ajudar!
              </p>
              
              <div className="space-y-3">
                <Button className="w-full bg-white text-zuhause-blue hover:bg-gray-50 transition-colors">
                  <Phone size={16} className="mr-2" />
                  (21) 99999-9999
                </Button>
                <Button className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
                  <MessageCircle size={16} className="mr-2" />
                  WhatsApp
                </Button>
                <Button className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
                  <Mail size={16} className="mr-2" />
                  Enviar Email
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agendar Visita</h3>
              <p className="text-gray-600 text-sm mb-4">
                Schedule uma visita personalizada para conhecer este imóvel.
              </p>
              <Button className="w-full bg-zuhause-gradient hover:opacity-90 transition-opacity">
                <Calendar size={16} className="mr-2" />
                Agendar Visita
              </Button>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Award size={16} className="text-amber-600 mr-2" />
                <span className="font-semibold text-amber-800">Destaque</span>
              </div>
              <p className="text-amber-700 text-sm">
                Este imóvel faz parte da nossa seleção premium com localização privilegiada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-zuhause-blue/5 to-purple-600/5 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
              <div className="inline-block animate-bounce mb-4">
                <Award className="text-zuhause-blue" size={48} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-zuhause-blue via-purple-600 to-zuhause-blue bg-clip-text text-transparent mb-6">
                Todas as Propriedades
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Descubra o imóvel dos seus sonhos em nossa coleção exclusiva de propriedades premium
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  <span>Mais de 500 imóveis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  <span>Seleção Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="mb-8 space-y-4">
            <PropertySearch />
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="text-gray-600" size={18} />
                    <span className="font-medium text-gray-700">Filtrar:</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("all")}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      Todos ({properties.length})
                    </Button>
                    <Button
                      variant={filter === "sale" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("sale")}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      À Venda ({properties.filter(p => p.isForSale).length})
                    </Button>
                    <Button
                      variant={filter === "rent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("rent")}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      Para Alugar ({properties.filter(p => !p.isForSale).length})
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Ordenar:</span>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-zuhause-blue focus:border-transparent"
                    >
                      <option value="price">Preço</option>
                      <option value="size">Tamanho (m²)</option>
                      <option value="date">Mais Recentes</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid3X3 size={14} />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50">
              <TrendingUp size={16} className="text-zuhause-blue" />
              <span className="text-gray-700 font-medium">
                Mostrando {sortedProperties.length} {sortedProperties.length === 1 ? 'imóvel' : 'imóveis'}
              </span>
            </div>
          </div>

          {/* Properties Grid/List */}
          {isLoading ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {sortedProperties.map((property, index) => (
                <Card 
                  key={property.id} 
                  className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-zuhause-blue/20 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInUp 0.8s ease-out forwards"
                  }}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}>
                    <img 
                      src={property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                      alt={property.title}
                      className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-56"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 left-4">
                      <Badge className={`${property.isForSale ? "bg-green-500 animate-pulse" : "bg-blue-500 animate-pulse"} text-white px-3 py-1 text-xs font-semibold shadow-lg`}>
                        {property.isForSale ? "À Venda" : "Para Alugar"}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <Button size="sm" className="bg-white/90 text-gray-700 hover:bg-white backdrop-blur-sm shadow-lg">
                        <Heart size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => toggleAudio(property.id)}
                        className={`backdrop-blur-sm shadow-lg transition-all duration-200 ${
                          isAudioPlaying[property.id] 
                            ? 'bg-zuhause-blue text-white animate-pulse' 
                            : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                      >
                        {isAudioPlaying[property.id] ? <Pause size={14} /> : <Play size={14} />}
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-zuhause-gradient hover:opacity-90 transition-all duration-300 shadow-lg"
                            onClick={() => setSelectedProperty(property)}
                          >
                            <Eye size={16} className="mr-2" />
                            Ver Todos os Detalhes
                          </Button>
                        </DialogTrigger>
                        {selectedProperty && <PropertyDetailModal property={selectedProperty} />}
                      </Dialog>
                    </div>
                  </div>
                  
                  <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-zuhause-blue transition-colors duration-300">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin size={14} className="mr-2 flex-shrink-0" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <Bed size={14} className="mr-1" />
                        {property.bedrooms}
                      </div>
                      <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <Bath size={14} className="mr-1" />
                        {property.bathrooms}
                      </div>
                      <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <Square size={14} className="mr-1" />
                        {property.area}m²
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-zuhause-blue">
                          {formatPrice(property.price)}
                        </div>
                        {!property.isForSale && <div className="text-sm text-gray-600">por mês</div>}
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProperty(property)}
                            className="hover:bg-zuhause-blue hover:text-white transition-all duration-300 hover:scale-105"
                          >
                            <Eye size={14} className="mr-1" />
                            Detalhes
                          </Button>
                        </DialogTrigger>
                        {selectedProperty && <PropertyDetailModal property={selectedProperty} />}
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {!isLoading && sortedProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <MapPin size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum imóvel encontrado</h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros para encontrar mais opções.
                </p>
                <Button 
                  onClick={() => setFilter("all")}
                  className="bg-zuhause-gradient hover:opacity-90"
                >
                  Ver Todos os Imóveis
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}