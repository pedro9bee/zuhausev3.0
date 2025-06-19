import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingWhatsapp from "@/components/floating-whatsapp";
import { lazy, Suspense } from "react";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const Properties = lazy(() => import("@/pages/properties"));
const PropertyDetailFull = lazy(() => import("@/pages/property-detail-full"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zuhause-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/propriedades" component={Properties} />
        <Route path="/propriedade/:id" component={PropertyDetailFull} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <FloatingWhatsapp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
