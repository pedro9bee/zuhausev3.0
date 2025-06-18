import { Route, Router } from "wouter";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import PropertyDetail from "@/pages/property-detail";
import PropertyDetailFull from "@/pages/property-detail-full";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import FloatingWhatsapp from "@/components/floating-whatsapp";

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/propriedades" component={Properties} />
        <Route path="/propriedade/:id" component={PropertyDetail} />
        <Route path="/propriedade/:id/detalhes" component={PropertyDetailFull} />
        <Route component={NotFound} />
      </Router>
      <FloatingWhatsapp />
      <Toaster />
    </div>
  );
}

export default App;