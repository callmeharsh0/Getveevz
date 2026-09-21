"use client";

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function ServicesNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Services", to: "/services" },
    { label: "Home", to: "/" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 mx-auto w-max px-4 z-50">
      {/* Fluid Island Nav — high-contrast dark glass pill on light background */}
      <div
        className={cn(
          "flex items-center justify-between",
          "px-2.5 py-1.5 rounded-full",
          "bg-[#111111] text-[#F3EFEA] border border-black/15",
          "backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.18)]",
          "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.25)]"
        )}
      >
        {/* Logo / Home link */}
        <Link
          to="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-full mr-3 pl-1"
          aria-label="GetVeevz Home"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/15">
            <img
              src="/assets/Logo.png"
              alt="GetVeevz logo"
              className="w-full h-full object-cover scale-[1.15]"
            />
          </div>
          <span className="hidden sm:inline-block font-display font-medium text-sm tracking-tight text-[#F3EFEA]">
            GetVeevz
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className={cn(
                  "relative px-3.5 py-1 text-xs font-medium rounded-full",
                  "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  "flex items-center cursor-pointer",
                  isActive
                    ? "text-[#111111] bg-white font-semibold shadow-sm"
                    : "text-[#F3EFEA]/75 hover:text-white hover:bg-white/10"
                )}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
