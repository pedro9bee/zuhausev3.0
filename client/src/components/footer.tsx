import { Link } from "wouter";
import whiteLogo from "@assets/white_logo_transparent_background_1749928120484.png";
import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src={whiteLogo} 
                alt="ZuHause Imóveis" 
                className="h-24 w-auto"
              />
            </div>
            <p className="text-gray-300 text-lg mb-6 max-w-md">16 anos oferecendo uma experiência única e humana na compra e venda de imóveis no Rio de Janeiro.</p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/zuhauseimoveisrj?igsh=a2RxanhkNWs0NDJh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-zuhause-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/5521975155741"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Serviços</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Compra de Imóveis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Venda de Imóveis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Locação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Avaliação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Consultoria</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <ul className="space-y-3 text-gray-300">
              <li>(21) 3333-4444</li>
              <li>contato@zuhause.com.br</li>
              <li>Av. das Américas, 3434<br />Barra da Tijuca - RJ</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 ZuHause Imóveis. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">CRECI: 12345-J</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
