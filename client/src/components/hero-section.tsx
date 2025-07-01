import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@assets/webp/DSC05718-HDR-20_1750156747504.webp";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImage}')`,
          willChange: 'transform'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-zuhause-blue/80 via-zuhause-blue/60 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight text-shadow-lg">
            Sua Mansão <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg">Sonhos</span><br />
            Está Aqui
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-shadow-md px-4">
            16 anos de experiência no mercado imobiliário, oferecendo uma experiência única e humana na compra e venda de imóveis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button 
              className="bg-white text-zuhause-blue px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-102"
              onClick={() => scrollToSection('propriedades')}
            >
              Ver Propriedades
            </Button>
            <Button 
              className="bg-white text-zuhause-blue px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-102"
              onClick={() => scrollToSection('sobre')}
            >
              Nossa História
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer hover:scale-110 transition-transform duration-200"
        onClick={() => scrollToSection('propriedades')}
      >
        <ChevronDown size={24} className="sm:w-8 sm:h-8" />
      </div>
    </section>
  );
}
