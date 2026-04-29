import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShowroomProvider } from "@/contexts/ShowroomProvider";
import { LoadingGrid } from "@/components/showroom/LoadingGrid";
import { SiteLayout } from "@/components/showroom/SiteLayout";
import { ProtectedRoute } from "@/components/showroom/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const CarsPage = lazy(() => import("./pages/CarsPage"));
const CarDetailsPage = lazy(() => import("./pages/CarDetailsPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const UserDashboardPage = lazy(() => import("./pages/UserDashboardPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShowroomProvider>
        <Toaster />
        <Sonner richColors />
        <BrowserRouter>
          <Suspense fallback={<LoadingGrid count={6} label="Loading Volt showroom" />}> 
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/cars/:slug" element={<CarDetailsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route
                  path="/user"
                  element={
                    <ProtectedRoute allow={["user", "admin"]} title="Customer dashboard">
                      <UserDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allow={["admin"]} title="Admin dashboard">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ShowroomProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
