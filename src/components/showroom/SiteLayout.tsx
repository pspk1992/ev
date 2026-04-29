import { Outlet } from "react-router-dom";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { CompareTray } from "@/components/showroom/CompareTray";
import { FooterDrive } from "@/components/showroom/FooterDrive";
import { Footer } from "@/components/showroom/Footer";
import { Navbar } from "@/components/showroom/Navbar";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterDrive />
      <Footer />
      <CompareTray />
      <ChatPanel />
    </div>
  );
}
