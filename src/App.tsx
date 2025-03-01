
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComplaintsPage from "./pages/ComplaintsPage";
import StaffPage from "./pages/StaffPage";
import SLAMonitoringPage from "./pages/SLAMonitoringPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CommunicationPage from "./pages/CommunicationPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/sla" element={<SLAMonitoringPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
