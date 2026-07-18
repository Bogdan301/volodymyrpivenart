/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * Main app with routes: Home (Gallery), About, Blog, Contact
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import { ScrollToTop } from "./components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gallery/:id" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
