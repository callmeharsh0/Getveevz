"use client";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Home from "@/app/page";
import UnifiedNav from "@/components/layout/UnifiedNav";
import Footer from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}

const ServicesPage = lazy(() => import("@/app/services/page"));
const ServiceDetailPage = lazy(() => import("@/app/services/[slug]/page"));
const PrivacyPolicyPage = lazy(() => import("@/app/privacy/page"));
const TermsConditionsPage = lazy(() => import("@/app/terms/page"));
const CookiePolicyPage = lazy(() => import("@/app/cookies/page"));
const DeveloperPage = lazy(() => import("@/app/developer/page"));
const NotFoundPage = lazy(() => import("@/app/not-found"));

const SCROLL_STORAGE_KEY = "getveevz_home_scroll_y";

function ScrollHandler() {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);
  const isRestoringRef = useRef(false);

  // Continuously record scroll position while user is scrolling on the home page
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/" && !isRestoringRef.current) {
        try {
          sessionStorage.setItem(SCROLL_STORAGE_KEY, String(window.scrollY));
        } catch {}
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle route transitions and scroll restoration
  useEffect(() => {
    const wasOutsideHome = prevPathnameRef.current !== "/";
    const isNowHome = pathname === "/";
    const isLeavingHome = prevPathnameRef.current === "/" && pathname !== "/";

    prevPathnameRef.current = pathname;

    // Case 1: Specific section hash provided (e.g. /#pricing, /#results)
    if (hash) {
      const id = hash.replace("#", "");
      const targetId = id === "about" ? "agencies" : id;
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // Case 2: Returning back to Home from Services / other subpages
    if (isNowHome && wasOutsideHome) {
      isRestoringRef.current = true;
      let targetY = 0;
      try {
        const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY);
        if (raw) targetY = Math.max(0, parseFloat(raw));
      } catch {}

      if (targetY > 0) {
        const applyScroll = () => {
          window.scrollTo({ top: targetY, behavior: "instant" });
          if (typeof window !== "undefined") {
            ScrollTrigger.refresh();
          }
        };

        // Execute across multiple frames to guarantee layout has fully painted
        applyScroll();
        requestAnimationFrame(applyScroll);
        setTimeout(applyScroll, 40);
        setTimeout(applyScroll, 100);
        setTimeout(() => {
          applyScroll();
          isRestoringRef.current = false;
        }, 220);
      } else {
        isRestoringRef.current = false;
      }
      return;
    }

    // Case 3: Navigating from Home to Services / subpage -> start at top
    if (isLeavingHome || pathname !== "/") {
      isRestoringRef.current = true;
      window.scrollTo(0, 0);
      setTimeout(() => {
        isRestoringRef.current = false;
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

export default function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [hasVisitedHome, setHasVisitedHome] = useState(isHome);

  useEffect(() => {
    if (isHome && !hasVisitedHome) {
      setHasVisitedHome(true);
    }
  }, [isHome, hasVisitedHome]);

  const isDeveloper =
    location.pathname === "/developerid" ||
    location.pathname === "/developerid/";

  return (
    <>
      <ScrollHandler />
      {!isDeveloper && <UnifiedNav />}
      {/* 
        Keep Home mounted in DOM once visited so that navigating back from 
        the services page resumes instantly without unmounting or reloading.
      */}
      {hasVisitedHome && (
        <div
          id="home-view-container"
          style={{ display: isHome ? "block" : "none" }}
          aria-hidden={!isHome}
        >
          <Home />
        </div>
      )}
      {!isHome && (
        <Suspense fallback={<div className="min-h-screen bg-[#090e14]" />}>
          <Routes>
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="/terms" element={<TermsConditionsPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/developerid" element={<DeveloperPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      )}
      {!isDeveloper && <Footer />}
    </>
  );
}

