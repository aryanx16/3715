import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet /> {/* 👈 This will render the child routes */}
      </main>
    </div>
  );
}
