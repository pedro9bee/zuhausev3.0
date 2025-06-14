import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
          <Badge className={property.isForSale ? "bg-green-500" : property.isForRent ? "bg-orange-500" : "bg-blue-500"}>
            {property.isForSale ? "À Venda" : property.isForRent ? "Aluguel" : "Lançamento"}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            onClick={toggleFavorite}
          >
            <Heart 
              size={16} 
              className={isFavorited ? "fill-red-500 text-red-500" : ""} 
            />
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 truncate">{property.title}</h3>
          <span className="text-2xl font-bold text-zuhause-blue whitespace-nowrap ml-2">
            {property.isForSale 
              ? formatPrice(property.price) 
              : property.rentPrice 
                ? `${formatPrice(property.rentPrice)}/mês`
                : formatPrice(property.price)}
          </span>
        </div>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </p>
        <div className="flex items-center justify-between text-gray-500 mb-4">
          <span className="flex items-center">
            <Bed size={16} className="mr-1" /> 
            {property.bedrooms} Quartos
          </span>
          <span className="flex items-center">
            <Bath size={16} className="mr-1" /> 
            {property.bathrooms} Banheiros
          </span>
          <span className="flex items-center">
            <Square size={16} className="mr-1" /> 
            {property.area}m²
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
        <Link href={`/propriedade/${property.id}`}>
          <Button className="w-full bg-zuhause-blue text-white py-3 rounded-lg font-medium hover:bg-zuhause-blue-dark transition-colors">
            Ver Detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
