"use client";

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

// Harmonized with actual page scroll flow: Home -> Results -> Distribution -> Services -> About -> Pricing
const HOME_NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "results", label: "Results" },
  { id: "distribution", label: "Distribution" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "pricing", label: "Pricing" },
];

export default function UnifiedNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isServices = location.pathname.startsWith("/services");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const lastScrollYRef = useRef<number>(0);
  const isAutoScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset visibility on route change
  useEffect(() => {
    setIsVisible(true);
    lastScrollYRef.current = window.scrollY;
  }, [location.pathname]);

  // Track scroll direction & active section in natural DOM offset order
  useEffect(() => {
    const navSections = [
      { id: "home", target: "hero" },
      { id: "results", target: "results" },
      { id: "distribution", target: "distribution" },
      { id: "about", target: "agencies" },
      { id: "pricing", target: "pricing" },
    ];

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // ── 1. Smart Hide / Show based on scroll direction ──
          if (!isAutoScrollingRef.current) {
            if (currentScrollY <= 80) {
              setIsVisible(true);
            } else {
              const delta = currentScrollY - lastScrollYRef.current;

              if (delta > 8) {
                // Scrolling DOWN -> Hide
                setIsVisible(false);
              } else if (delta < -8) {
                // Scrolling UP -> Show
                setIsVisible(true);
              }
            }
          }

          // Gentle re-appearance when user pauses scrolling
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            setIsVisible(true);
          }, 450);

          lastScrollYRef.current = currentScrollY;

          // ── 2. Track Active Section on Home ──
          if (!isServices) {
            const scrollPos = currentScrollY + 260;
            let matched = false;

            // Iterate backwards from lowest to highest offsetTop
            for (let i = navSections.length - 1; i >= 0; i--) {
              const el = document.getElementById(navSections[i].target);
              if (el && el.offsetTop <= scrollPos) {
                setActiveSection(navSections[i].id);
                matched = true;
                break;
              }
            }

            if (!matched && currentScrollY < 400) {
              setActiveSection("home");
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isServices]);

  const handleHomeNavClick = (id: string) => {
    if (id === "services") {
      navigate("/services");
      return;
    }

    if (location.pathname !== "/") {
      const hash = id === "home" ? "#hero" : id === "about" ? "#agencies" : `#${id}`;
      navigate(`/${hash}`);
      return;
    }

    setActiveSection(id);
    setIsVisible(true);
    isAutoScrollingRef.current = true;
    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 850);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = id === "about" ? "agencies" : id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : -85,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.32,
          ease: [0.32, 0.72, 0, 1],
        }}
        className={cn(
          "hidden lg:block",
          "fixed top-4 sm:top-5 left-0 right-0 mx-auto w-max max-w-[calc(100vw-32px)] px-2 sm:px-4 z-[100] pointer-events-none transition-all duration-300",
          !isVisible && "pointer-events-none select-none"
        )}
      >
        <motion.nav
          layout
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
            mass: 0.8,
          }}
          aria-label="Primary Navigation"
          className={cn(
            "pointer-events-auto items-center justify-center flex",
            "px-2 sm:px-2.5 py-1.5 rounded-full",
            "bg-[#111111]/95 text-[#F3EFEA] border border-black/25",
            "backdrop-blur-2xl shadow-[0_10px_32px_rgba(0,0,0,0.28)]",
            "hover:shadow-[0_14px_42px_rgba(0,0,0,0.38)] transition-shadow duration-300"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isServices ? (
              /* ── SERVICES STATE: Compact Island with Brandmark & Navigation ── */
              <motion.div
                key="nav-services"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                className="flex items-center gap-1 sm:gap-1.5"
              >
                {/* Logo / Brandmark Link */}
                <Link
                  to="/"
                  className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-full mr-2 sm:mr-3 pl-1 group cursor-pointer"
                  aria-label="GetVeevz Home"
                >
                  <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-white/10 border border-white/15 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/assets/Logo.png"
                      alt="GetVeevz logo"
                      className="w-full h-full object-cover scale-[1.15]"
                    />
                  </div>
                  <span className="hidden xs:inline-block font-display font-medium text-xs sm:text-sm tracking-tight text-[#F3EFEA] group-hover:text-white transition-colors">
                    GetVeevz
                  </span>
                </Link>

                {/* Services Link (Active) */}
                <Link
                  to="/services"
                  className="relative px-3.5 py-1 sm:py-1.5 text-xs font-semibold rounded-full cursor-pointer text-[#111111] bg-white shadow-sm inline-block"
                >
                  <span className="relative z-10">Services</span>
                </Link>

                {/* Home Link */}
                <Link
                  to="/"
                  className="relative px-3.5 py-1 sm:py-1.5 text-xs font-medium rounded-full cursor-pointer text-[#F3EFEA]/80 hover:text-white hover:bg-white/10 transition-colors duration-200 inline-block"
                >
                  <span className="relative z-10">Home</span>
                </Link>
              </motion.div>
            ) : (
              /* ── HOME STATE ── */
              <motion.div
                key="nav-home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                className="flex items-center"
              >
                {/* Desktop Menu (Visible on lg+) */}
                <div className="hidden lg:flex items-center gap-1">
                  {HOME_NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    const href =
                      item.id === "services"
                        ? "/services"
                        : item.id === "home"
                        ? "/#hero"
                        : `/#${item.id === "about" ? "agencies" : item.id}`;
                    return (
                      <a
                        key={item.id}
                        href={href}
                        onClick={(e) => {
                          if (item.id === "services") {
                            e.preventDefault();
                            navigate("/services");
                          } else {
                            e.preventDefault();
                            handleHomeNavClick(item.id);
                          }
                        }}
                        className={cn(
                          "relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer flex items-center select-none",
                          isActive
                            ? "text-[#111111] font-semibold"
                            : "text-[#F3EFEA]/80 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-nav-indicator"
                            className="pointer-events-none absolute inset-0 rounded-full bg-white shadow-sm"
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>
    </>
  );
}
