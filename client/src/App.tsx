import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Methodology from "@/pages/Methodology";
import Pricing from "@/pages/Pricing";
import Technology from "@/pages/Technology";
import POC from "@/pages/POC";
import Company from "@/pages/Company";
import Perspective from "@/pages/Perspective";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/perspective" component={Perspective} />
        <Route path="/methodology" component={Methodology} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/technology" component={Technology} />
        <Route path="/poc" component={POC} />
        <Route path="/company" component={Company} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
