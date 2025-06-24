import { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { X } from "lucide-react";

export default function FloatingWhatsapp() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleWhatsappClick = () => {
    window.open('https://wa.me/5521975155741', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/zuhauseimoveisrj?igsh=a2RxanhkNWs0NDJh', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/company/zuhause', '_blank');
  };

  const handleTiktokClick = () => {
    window.open('https://tiktok.com/@zuhause', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
    }`}>
      {/* Expanded message */}
      {isExpanded && (
        <div className="mb-4 mr-2 bg-white p-4 rounded-lg shadow-lg border max-w-xs relative animate-in slide-in-from-bottom-2">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
          <p className="text-sm text-gray-700 mb-3">
            Quer ajuda para encontrar a casa ideal de acordo com suas preferências? Clique aqui.
          </p>
          <button
            onClick={handleWhatsappClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            Conversar no WhatsApp
          </button>
        </div>
      )}

      {/* Social Media Buttons */}
      <div className="flex flex-col items-center space-y-3">
        {/* WhatsApp Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <FaWhatsapp size={20} />
        </button>

        {/* Instagram Button */}
        <button
          onClick={handleInstagramClick}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <FaInstagram size={20} />
        </button>

        {/* LinkedIn Button */}
        <button
          onClick={handleLinkedinClick}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <FaLinkedin size={20} />
        </button>

        {/* TikTok Button */}
        <button
          onClick={handleTiktokClick}
          className="bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <FaTiktok size={20} />
        </button>
      </div>
    </div>
  );
}