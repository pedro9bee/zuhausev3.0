import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function PropertySearch() {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [, setNavigationLocation] = useLocation();

  const handleSearch = () => {
    // Create URL with search parameters
    const params = new URLSearchParams();
    if (propertyType) params.set('tipo', propertyType);
    if (location) params.set('local', location);
    if (maxPrice) params.set('preco', maxPrice);
    if (transactionType) params.set('transacao', transactionType);

    // Navigate to properties page with filters
    const url = params.toString() ? `/propriedades?${params.toString()}` : '/propriedades';
    setNavigationLocation(url);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Encontre Seu Imóvel Ideal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="cobertura">Cobertura</SelectItem>
                  <SelectItem value="loft">Loft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="barra">Barra da Tijuca</SelectItem>
                  <SelectItem value="recreio">Recreio</SelectItem>
                  <SelectItem value="ipanema">Ipanema</SelectItem>
                  <SelectItem value="copacabana">Copacabana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transação</label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Venda ou Aluguel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venda">À Venda</SelectItem>
                  <SelectItem value="aluguel">Para Alugar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço Máximo</label>
              <Select value={maxPrice} onValueChange={setMaxPrice}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Preço máximo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500000">R$ 500.000</SelectItem>
                  <SelectItem value="1000000">R$ 1.000.000</SelectItem>
                  <SelectItem value="2000000">R$ 2.000.000</SelectItem>
                  <SelectItem value="5000000">R$ 5.000.000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="bg-zuhause-gradient text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full"
              >
                <Search className="mr-2" size={18} />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
