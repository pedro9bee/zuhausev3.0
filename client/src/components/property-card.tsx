import { useState, memo, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = useCallback((price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  }, []);

  const toggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  }, [isFavorited]);

  const onImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const formattedPrice = useMemo(() => {
    return property.isForSale 
      ? formatPrice(property.price) 
      : property.rentPrice 
        ? `${formatPrice(property.rentPrice)}/mês`
        : formatPrice(property.price);
  }, [property.price, property.rentPrice, property.isForSale, formatPrice]);

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group will-change-transform">
      <div className="relative overflow-hidden">
        <div className="relative w-full h-64 bg-gray-200">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className={`w-full h-full object-cover transition-all duration-500 will-change-transform ${
              imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
            }`}
            loading="eager"
            decoding="async"
            onLoad={onImageLoad}
            style={{
              contentVisibility: 'auto',
              containIntrinsicSize: '100% 256px'
            }}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}
        </div>
        {property.isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              Destaque
            </Badge>
          </div>
        )}
        <div className="absolute top-4 right-4 z-10">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 will-change-transform hover:scale-110"
            onClick={toggleFavorite}
          >
            <Heart 
              size={16} 
              className={`transition-colors duration-200 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} 
            />
          </Button>
        </div>
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{property.title}</h3>
          <span className="text-xl sm:text-2xl font-bold text-zuhause-blue whitespace-nowrap">
            {formattedPrice}
          </span>
        </div>
        <p className="text-gray-600 mb-4 flex items-center text-sm sm:text-base">
          <MapPin size={14} className="mr-2 flex-shrink-0 sm:w-4 sm:h-4" />
          <span className="truncate">{property.location}</span>
        </p>
        <div className="flex flex-wrap items-center justify-between text-gray-500 mb-4 gap-2 sm:gap-0">
          <span className="flex items-center text-sm sm:text-base">
            <Bed size={14} className="mr-1 sm:w-4 sm:h-4" /> 
            {property.bedrooms} Quartos
          </span>
          <span className="flex items-center text-sm sm:text-base">
            <Bath size={14} className="mr-1 sm:w-4 sm:h-4" /> 
            {property.bathrooms} Banheiros
          </span>
          <span className="flex items-center text-sm sm:text-base">
            <Square size={14} className="mr-1 sm:w-4 sm:h-4" /> 
            {property.area}m²
          </span>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{property.description}</p>
        <Link href={`/propriedade/${property.id}`}>
          <Button className="w-full bg-zuhause-blue text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-zuhause-blue-dark transition-all duration-200 will-change-transform hover:scale-[1.02] text-sm sm:text-base">
            Ver Detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default memo(PropertyCard);
