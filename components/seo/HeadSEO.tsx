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
    document.title = title;

    const setMeta = (nameAttr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    const canonicalUrl = canonical || (typeof window !== "undefined" ? window.location.href.split("#")[0].split("?")[0] : "https://getveevz.com/");

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", canonicalUrl);
    setMeta("name", "twitter:image", ogImage);

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
