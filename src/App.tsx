import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLanding from "./pages/MainLanding";
import HumanizeLanding from "./pages/HumanizeLanding";
import ParaphraseLanding from "./pages/ParaphraseLanding";
import ToneLanding from "./pages/ToneLanding";
import SimplifyLanding from "./pages/SimplifyLanding";
import SummarizeLanding from "./pages/SummarizeLanding";
import GrammarLanding from "./pages/GrammarLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLanding />} />
          <Route path="/humanize" element={<HumanizeLanding />} />
          <Route path="/paraphrase" element={<ParaphraseLanding />} />
          <Route path="/tone" element={<ToneLanding />} />
          <Route path="/simplify" element={<SimplifyLanding />} />
          <Route path="/summarize" element={<SummarizeLanding />} />
          <Route path="/grammar" element={<GrammarLanding />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
