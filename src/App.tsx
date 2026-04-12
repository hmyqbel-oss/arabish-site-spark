import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Gallery from "./pages/Gallery.tsx";
import NotFound from "./pages/NotFound.tsx";
import DesignService from "./pages/services/DesignService.tsx";
import SupervisionService from "./pages/services/SupervisionService.tsx";
import SafetyService from "./pages/services/SafetyService.tsx";
import TechnicalService from "./pages/services/TechnicalService.tsx";
import TrafficService from "./pages/services/TrafficService.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services/design" element={<DesignService />} />
          <Route path="/services/supervision" element={<SupervisionService />} />
          <Route path="/services/safety" element={<SafetyService />} />
          <Route path="/services/technical" element={<TechnicalService />} />
          <Route path="/services/traffic" element={<TrafficService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
