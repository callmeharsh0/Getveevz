"use client";

import React, { useEffect } from "react";

export interface HeadSEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * HeadSEO: React SPA Dynamic Document Head & Structured Data Manager
 * Updates document.title, meta tags, canonical links, Open Graph, Twitter cards,
 * and JSON-LD schemas synchronously on route change for search crawlers and social scrapers.
 */
export default function HeadSEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "https://getveevz.com/assets/Logo.png",
  keywords,
  jsonLd,
}: HeadSEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to update or create a meta tag
    const setMeta = (nameAttr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", description);
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    const canonicalUrl = canonical || (typeof window !== "undefined" ? window.location.href.split("#")[0].split("?")[0] : "https://getveevz.com/");

    // 3. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // 4. Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);

    // 5. Twitter / X Cards
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", canonicalUrl);
    setMeta("name", "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    const scriptId = "seo-json-ld";
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = scriptId;
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonical, ogType, ogImage, keywords, jsonLd]);

  return null;
}
