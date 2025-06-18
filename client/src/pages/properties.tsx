import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PropertySearch from "@/components/property-search";
import { properties } from "@/data/static-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Play, 
  Pause, 
  Eye,
  TrendingUp,
  Award,
  Filter,
  Grid3X3,
  List,
  X,
  Star
} from "lucide-react";

export default function Properties() {
  const [isAudioPlaying, setIsAudioPlaying] = useState<{ [key: number]: boolean }>({});
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [sortBy, setSortBy] = useState<"price" | "size" | "date">("price");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [location] = useLocation();
  const [, setNavigationLocation] = useLocation();

  // Parse URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transacao = urlParams.get('transacao');
    
    // All properties are for sale only
  }, [location]);

  const handleNavigation = (path: string) => {
    setNavigationLocation(path);
  };

  const isLoading = false;

  const toggleAudio = (propertyId: number) => {
    setIsAudioPlaying(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));

    setTimeout(() => {
      setIsAudioPlaying(prev => ({
        ...prev,
        [propertyId]: false
      }));
    }, 3000);
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

  const filteredProperties = properties.filter(property => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    const local = urlParams.get('local');
    const preco = urlParams.get('preco');
    
    // Filter by featured properties
    if (filter === "featured" && !property.isFeatured) return false;
    
    // Filter by property type (if specified in URL)
    if (tipo && !property.title.toLowerCase().includes(tipo.toLowerCase())) return false;
    
    // Filter by location (if specified in URL) 
    if (local && !property.location.toLowerCase().includes(local.toLowerCase())) return false;
    
    // Filter by price (if specified in URL)
    if (preco) {
      const maxPrice = parseInt(preco);
      const propertyPrice = parseFloat(property.price);
      if (propertyPrice > maxPrice) return false;
    }
    
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    if (sortBy === "size") {
      return b.area - a.area;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <img 
              src={zoomedImage} 
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <Button
              size="sm"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
            >
              <X size={16} />
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              Clique para fechar
            </div>
          </div>
        </div>
      )}

      <Navigation />
      
      {/* Hero Section with Video */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/attached_assets/f1da91e5-ccce-41a1-a7ae-eecb9064992b_1750174683947.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-zuhause-blue/20 via-transparent to-blue-700/20"></div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Propriedades Premium
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-lg">
              Descubra o imóvel dos seus sonhos em nossa coleção exclusiva de propriedades premium
            </p>
            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} />
                <span className="text-lg">Imóveis Exclusivos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span className="text-lg">Localização Privilegiada</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={20} />
                <span className="text-lg">Alto Padrão</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search and Filters */}
          <div className="mb-12">
            <PropertySearch />
            
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg border border-white/50 shadow-lg">
                  <Button
                    variant={filter === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "bg-zuhause-blue text-white" : ""}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filter === "featured" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("featured")}
                    className={filter === "featured" ? "bg-zuhause-blue text-white" : ""}
                  >
                    Destaques
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "price" | "size" | "date")}
                  className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-lg px-4 py-2 text-sm shadow-lg"
                >
                  <option value="price">Ordenar por preço</option>
                  <option value="size">Ordenar por tamanho</option>
                  <option value="date">Mais recentes</option>
                </select>
                
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg border border-white/50 shadow-lg">
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
                  className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-zuhause-blue/20 ${viewMode === "list" ? "flex flex-row" : ""}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInUp 0.8s ease-out forwards"
                  }}
                >
                  <div 
                    className={`relative overflow-hidden cursor-pointer ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}
                    onClick={() => setZoomedImage(property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600")}
                  >
                    <img 
                      src={property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                      alt={property.title}
                      className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-56"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    
                    {property.isFeatured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-semibold shadow-lg animate-pulse">
                          Destaque
                        </Badge>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <Button size="sm" className="bg-white/90 text-gray-700 hover:bg-white backdrop-blur-sm shadow-lg">
                        <Heart size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAudio(property.id);
                        }}
                        className={`backdrop-blur-sm shadow-lg transition-all duration-200 ${
                          isAudioPlaying[property.id] 
                            ? 'bg-zuhause-blue text-white animate-pulse' 
                            : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                      >
                        {isAudioPlaying[property.id] ? <Pause size={14} /> : <Play size={14} />}
                      </Button>
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
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Bed size={14} className="mr-1" />
                          {property.bedrooms}
                        </div>
                        <div className="flex items-center">
                          <Bath size={14} className="mr-1" />
                          {property.bathrooms}
                        </div>
                        <div className="flex items-center">
                          <Square size={14} className="mr-1" />
                          {property.area}m²
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-zuhause-blue">
                          {formatPrice(property.price)}
                        </div>
                        {!property.isForSale && <div className="text-sm text-gray-600">por mês</div>}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNavigation(`/propriedade/${property.id}`)}
                        className="bg-zuhause-blue hover:bg-blue-700 text-white border-0 hover:scale-105 hover:shadow-lg transition-all duration-200"
                      >
                        <Eye size={14} className="mr-1" />
                        Detalhes
                      </Button>
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
    </div>
  );
}