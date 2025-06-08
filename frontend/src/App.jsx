import { Toaster as AppToaster } from "./Components/ui/toaster";
import { Toaster as SonnerToaster } from "./Components/ui/sonner";
import { TooltipProvider } from "./Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import OAuthCallback from "./components/auth/OAuthCallback";
import OAuthError from "./Pages/OAuthError";
import { ThemeProvider } from "./context/ThemeContext";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOTP from "./Pages/VerifyOTP";
import PurchasePage from "./Pages/PurchasePage";
import AdminDashboard from "./Pages/AdminDashboard";

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AppToaster />
        <SonnerToaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/google/callback" element={<OAuthCallback />} />
          <Route path="/github/callback" element={<OAuthCallback />} />
          <Route path="/oauth-error" element={<OAuthError />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
