import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import Floating, { FloatingElement } from "../../common/parallax-floating";
import { COLORS, FONTS } from "../../../utils/theme";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop",
    title: "Cinematic Portrait",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop",
    title: "Neon Aesthetic",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop",
    title: "Live Atmosphere",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop",
    title: "Fluid Dynamics",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop",
    title: "Editorial Mood",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop",
    title: "Modern Iconography",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop",
    title: "Natural Organic",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop",
    title: "Curated Still Life",
  },
];

export default function ParallaxFloatingSection() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1], scale: [0.94, 1] },
      { duration: 0.7, delay: stagger(0.12), ease: "easeOut" }
    );
  }, [animate]);

  return (
    <section
      ref={scope}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: `radial-gradient(ellipse 80% 60% at 50% 50%, #15120f 0%, ${COLORS.bg} 100%)`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
      }}
    >
      {/* Central Hero Branding & Action */}
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: "0.7rem",
            fontWeight: 400,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: COLORS.accent,
            marginBottom: "0.5rem",
          }}
        >
          Interactive Showcase
        </p>

        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
            fontWeight: 300,
            color: COLORS.text,
            letterSpacing: "0.02em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Move to <span style={{ fontStyle: "italic", color: COLORS.sky }}>explore</span>
        </h2>

        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
            fontWeight: 300,
            color: COLORS.textMuted,
            maxWidth: "460px",
            lineHeight: 1.6,
          }}
        >
          Every visual layer reacts to your mouse movement in real time with multi-plane parallax depth.
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <a
            href="#results"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: FONTS.body,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #2563EB, #38BDF8)",
              padding: "0.85rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(56, 189, 248, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Explore Moments
            <span>↓</span>
          </a>
        </div>
      </motion.div>

      {/* Floating Multi-Plane Parallax Layer */}
      <Floating sensitivity={-1.2} easingFactor={0.06} className="overflow-hidden pointer-events-none">
        <FloatingElement depth={0.5} className="top-[8%] left-[10%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[0].url}
            alt={galleryImages[0].title}
            className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.1)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1.2} className="top-[12%] left-[34%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[1].url}
            alt={galleryImages[1].title}
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.1)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={2.2} className="top-[4%] left-[58%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[2].url}
            alt={galleryImages[2].title}
            className="w-28 h-40 md:w-44 md:h-56 object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.12)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1.0} className="top-[2%] left-[82%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[3].url}
            alt={galleryImages[3].title}
            className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.1)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1.4} className="top-[42%] left-[4%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[4].url}
            alt={galleryImages[4].title}
            className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.1)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={2.0} className="top-[68%] left-[76%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[7].url}
            alt={galleryImages[7].title}
            className="w-32 h-32 md:w-44 md:h-52 object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.12)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={3.5} className="top-[72%] left-[14%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[5].url}
            alt={galleryImages[5].title}
            className="w-44 md:w-56 h-auto object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.15)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1.2} className="top-[78%] left-[48%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={galleryImages[6].url}
            alt={galleryImages[6].title}
            className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-md shadow-2xl border border-[rgba(242,236,225,0.1)] hover:scale-105 duration-300 pointer-events-auto transition-transform"
          />
        </FloatingElement>
      </Floating>
    </section>
  );
}
