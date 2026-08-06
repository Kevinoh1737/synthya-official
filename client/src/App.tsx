import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Company from "@/pages/CompanyDetail";
import { DemoRequestModal } from "@/components/DemoRequestModal";

function App() {
  const isCompanyPage = window.location.pathname === "/ko/company" || window.location.pathname === "/en/company" || window.location.pathname.endsWith("/company/");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isCompanyPage ? <Company /> : <Home />}
        <DemoRequestModal />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
