import { ChatAssistant } from "@/components/ChatAssistant";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <div className="bg-ambient flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}
