"use client";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/app/page";
import ServicesPage from "@/app/services/page";
import ServiceDetailPage from "@/app/services/[slug]/page";
import UnifiedNav from "@/components/layout/UnifiedNav";

// Scroll to top or anchor on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <UnifiedNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
