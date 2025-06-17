import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@assets/base_logo_transparent_background_1750168258045.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (target: string) => {
    if (target.startsWith('#')) {
      // Section navigation - go to home page first if not already there
      if (location !== '/') {
        setLocation('/');
        setTimeout(() => {
          const element = document.getElementById(target.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(target.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Page navigation
      setLocation(target);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img 
              src={logo} 
              alt="ZuHause Imóveis" 
              className="h-16 w-auto"
            />
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => handleNavigation('/')}
                className="text-gray-900 hover:text-zuhause-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => handleNavigation('/propriedades')}
                className="text-gray-600 hover:text-zuhause-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Propriedades
              </button>
              <button 
                onClick={() => handleNavigation('#sobre')}
                className="text-gray-600 hover:text-zuhause-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Sobre Nós
              </button>
              <button 
                onClick={() => handleNavigation('#equipe')}
                className="text-gray-600 hover:text-zuhause-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Equipe
              </button>
              <button 
                onClick={() => handleNavigation('#contato')}
                className="text-gray-600 hover:text-zuhause-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Contato
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button 
              className="bg-zuhause-gradient text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              onClick={() => handleNavigation('#contato')}
            >
              Quero falar com um corretor
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => handleNavigation('/')}
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-zuhause-blue w-full text-left"
            >
              Início
            </button>
            <button 
              onClick={() => handleNavigation('/propriedades')}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-zuhause-blue w-full text-left"
            >
              Propriedades
            </button>
            <button 
              onClick={() => handleNavigation('#sobre')}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-zuhause-blue w-full text-left"
            >
              Sobre Nós
            </button>
            <button 
              onClick={() => handleNavigation('#equipe')}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-zuhause-blue w-full text-left"
            >
              Equipe
            </button>
            <button 
              onClick={() => handleNavigation('#contato')}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-zuhause-blue w-full text-left"
            >
              Contato
            </button>
            <div className="px-3 py-2">
              <Button 
                className="bg-zuhause-gradient text-white w-full"
                onClick={() => handleNavigation('#contato')}
              >
                Quero falar com um corretor
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
