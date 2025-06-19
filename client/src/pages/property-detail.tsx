import { useParams } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, Heart, Share2, Phone, Mail } from "lucide-react";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", id],
  });

  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Propriedade não encontrada</h1>
            <p className="text-gray-600">A propriedade que você está procurando não existe ou foi removida.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading || !property) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-6"></div>
                </div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Property Images */}
          <div className="relative mb-8">
            <img 
              src={property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"} 
              alt={property.title}
              className="w-full h-96 object-cover rounded-2xl"
              loading="eager"
              decoding="async"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                contentVisibility: 'auto',
                containIntrinsicSize: '100% 384px'
              }}
            />
            <div className="absolute top-4 left-4">
              <Badge className={property.isForSale ? "bg-green-500" : "bg-blue-500"}>
                {property.isForSale ? "À Venda" : "Para Alugar"}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                <Heart size={16} />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                <Share2 size={16} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-2" />
                  {property.location}
                </div>
                <div className="text-3xl font-bold text-zuhause-blue">
                  {property.isForSale ? formatPrice(property.price) : `${formatPrice(property.rentPrice || "0")}/mês`}
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8 text-gray-600">
                <div className="flex items-center">
                  <Bed size={20} className="mr-2" />
                  {property.bedrooms} Quartos
                </div>
                <div className="flex items-center">
                  <Bath size={20} className="mr-2" />
                  {property.bathrooms} Banheiros
                </div>
                <div className="flex items-center">
                  <Square size={20} className="mr-2" />
                  {property.area}m²
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="justify-start">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Interessado neste imóvel?</h3>
                  <p className="text-gray-600 mb-6">Entre em contato conosco para mais informações ou agendar uma visita.</p>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-zuhause-gradient text-white">
                      <Phone size={16} className="mr-2" />
                      Ligar Agora
                    </Button>
                    <Button variant="outline" className="w-full border-zuhause-blue text-zuhause-blue">
                      <Mail size={16} className="mr-2" />
                      Enviar E-mail
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600 space-y-2">
                      <div><strong>Telefone:</strong> (21) 3333-4444</div>
                      <div><strong>WhatsApp:</strong> (21) 99999-8888</div>
                      <div><strong>E-mail:</strong> contato@zuhause.com.br</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
