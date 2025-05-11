
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Theory from "./pages/Theory";
import Calculators from "./pages/Calculators";
import GraphCalculator from "./pages/calculators/GraphCalculator";
import MatrixCalculator from "./pages/calculators/MatrixCalculator";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/graph" element={<GraphCalculator />} />
          <Route path="/calculators/matrix" element={<MatrixCalculator />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
