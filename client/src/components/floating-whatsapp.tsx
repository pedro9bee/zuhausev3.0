import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

export default function FloatingWhatsapp() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsappClick = () => {
    window.open('https://wa.me/5521975155741', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
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

      {/* Floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
}