import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function PropertySearch() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Encontre Seu Imóvel Ideal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</label>
              <Select>
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
              <Select>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço Máximo</label>
              <Select>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quartos</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Nº de quartos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-zuhause-gradient text-white px-12 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
              <Search className="mr-2" size={20} />
              Buscar Imóveis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
