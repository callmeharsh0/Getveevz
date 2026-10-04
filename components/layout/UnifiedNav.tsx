"use client";

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

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
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024;
      if (isMobile && location.pathname === "/" && window.scrollY <= 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = window.scrollY;
    }
  }, [location.pathname]);

  // Keep active section centered in mobile pill scroll container
  useEffect(() => {
    if (navContainerRef.current) {
      const activeEl = navContainerRef.current.querySelector<HTMLElement>("[data-active='true']");
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeSection]);

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
          const isMobile = window.innerWidth < 1024;

          if (!isAutoScrollingRef.current) {
            if (currentScrollY <= 80) {
              // At the very top:
              // On mobile home page, let the hero header take precedence to avoid visual clash.
              // On desktop or subpages, keep visible.
              if (isMobile && !isServices) {
                setIsVisible(false);
              } else {
                setIsVisible(true);
              }
            } else {
              const delta = currentScrollY - lastScrollYRef.current;

              // Scrolling down -> hide pill to keep screen clear
              if (delta > 6) {
                setIsVisible(false);
              } 
              // Scrolling up -> show navigation pill
              else if (delta < -6) {
                setIsVisible(true);
              }
            }
          }

          lastScrollYRef.current = currentScrollY;

          if (!isServices) {
            const scrollPos = currentScrollY + 260;
            let matched = false;

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
      if (id === "home") {
        navigate("/");
        return;
      }
      const hash = id === "about" ? "#agencies" : `#${id}`;
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
      try {
        sessionStorage.setItem("getveevz_home_scroll_y", "0");
      } catch {}
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
        initial={{ y: -85, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -85,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.28,
          ease: [0.32, 0.72, 0, 1],
        }}
        className={cn(
          "fixed top-1 sm:top-4 lg:top-5 left-0 right-0 mx-auto w-max max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-32px)] z-[100] transition-all duration-300",
          !isVisible ? "pointer-events-none select-none" : "pointer-events-auto"
        )}
      >
        <nav
          aria-label="Primary Navigation"
          className={cn(
            "pointer-events-auto items-center justify-center flex",
            "py-[2px] px-1.5 sm:py-1 sm:px-1.5 lg:px-2.5 lg:py-1.5 rounded-full",
            "bg-[#111111]/95 text-[#F3EFEA] border border-white/15",
            "backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] lg:shadow-[0_10px_32px_rgba(0,0,0,0.28)]",
            "hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:lg:shadow-[0_14px_42px_rgba(0,0,0,0.38)] transition-shadow duration-300"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isServices ? (
              <motion.div
                key="nav-services"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-1.5"
              >
                <Link
                  to="/"
                  className="flex items-center gap-1.5 sm:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-full mr-1 sm:mr-2 lg:mr-3 pl-1 group cursor-pointer shrink-0"
                  aria-label="GetVeevz Home"
                >
                  <div className="relative flex items-center justify-center w-[13px] h-[13px] sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white/10 border border-white/15 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <img
                      src="/assets/Logo.png"
                      alt="GetVeevz logo"
                      className="w-full h-full object-cover scale-[1.15]"
                    />
                  </div>
                  <span className="hidden xs:inline-block font-display font-medium text-[9.5px] sm:text-xs lg:text-sm tracking-tight text-[#F3EFEA] group-hover:text-white transition-colors">
                    GetVeevz
                  </span>
                </Link>

                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Link
                    to="/services"
                    className="relative h-[15px] sm:h-7 lg:h-auto px-2.5 sm:px-3 lg:px-3.5 lg:py-1.5 text-[9.5px] sm:text-xs lg:text-xs font-semibold rounded-full cursor-pointer text-[#111111] bg-white shadow-xs lg:shadow-sm inline-flex items-center justify-center shrink-0 leading-none lg:leading-normal"
                  >
                    <span>Services</span>
                  </Link>

                  <Link
                    to="/"
                    className="relative h-[15px] sm:h-7 lg:h-auto px-2.5 sm:px-3 lg:px-3.5 lg:py-1.5 text-[9.5px] sm:text-xs lg:text-xs font-medium rounded-full cursor-pointer text-[#F3EFEA]/80 hover:text-white hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center shrink-0 leading-none lg:leading-normal"
                  >
                    <span>Home</span>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="nav-home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                className="flex items-center"
              >
                <div
                  ref={navContainerRef}
                  className="flex items-center gap-0.5 sm:gap-1 lg:gap-1 max-w-[calc(100vw-24px)] sm:max-w-[calc(100vw-32px)] lg:max-w-none overflow-x-auto no-scrollbar"
                >
                  {HOME_NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    const href =
                      item.id === "services"
                        ? "/services"
                        : item.id === "home"
                        ? "/"
                        : `/#${item.id === "about" ? "agencies" : item.id}`;
                    return (
                      <a
                        key={item.id}
                        href={href}
                        data-active={isActive}
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
                          "relative h-[17px] sm:h-7 lg:h-auto px-2.5 sm:px-3 lg:px-3.5 lg:py-1.5 text-[9.5px] sm:text-xs lg:text-xs font-medium tracking-tight sm:tracking-normal rounded-full transition-colors duration-200 cursor-pointer inline-flex items-center justify-center select-none shrink-0 leading-none lg:leading-normal",
                          isActive
                            ? "text-[#111111] font-semibold"
                            : "text-[#F3EFEA]/80 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-nav-indicator"
                            className="pointer-events-none absolute inset-y-[1.5px] inset-x-0.5 lg:inset-0 rounded-full bg-white shadow-xs lg:shadow-sm"
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
        </nav>
      </motion.header>
    </>
  );
}
