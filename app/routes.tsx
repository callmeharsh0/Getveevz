"use client";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Home from "@/app/page";
import UnifiedNav from "@/components/layout/UnifiedNav";
import Footer from "@/components/layout/Footer";

const ServicesPage = lazy(() => import("@/app/services/page"));
const ServiceDetailPage = lazy(() => import("@/app/services/[slug]/page"));
const NotFoundPage = lazy(() => import("@/app/not-found"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const targetId = id === "about" ? "agencies" : id;
        const el = document.getElementById(targetId);
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
      <Suspense fallback={<div className="min-h-screen bg-[#090e14]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
