import * as React from "react"
import { motion } from "motion/react"
import useEmblaCarousel from "embla-carousel-react"
import { COLORS, FONTS } from "../../utils/theme"

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

type PlaceholderImageOptions = {
  title: string
  startColor: string
  endColor: string
  cardBg: string
  accentColor: string
  subAccent: string
}

const createPlaceholderImage = ({
  title,
  startColor,
  endColor,
  cardBg,
  accentColor,
  subAccent,
}: PlaceholderImageOptions) => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="625" viewBox="0 0 1000 625" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1000" y2="625" gradientUnits="userSpaceOnUse">
      <stop stop-color="${startColor}" />
      <stop offset="1" stop-color="${endColor}" />
    </linearGradient>
    <linearGradient id="goldGlow" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="${accentColor}" />
      <stop offset="1" stop-color="${subAccent}" />
    </linearGradient>
  </defs>
  <!-- Outer luxury canvas -->
  <rect width="1000" height="625" rx="36" fill="url(#bgGrad)" />
  <rect width="1000" height="625" rx="36" stroke="${accentColor}" stroke-opacity="0.25" stroke-width="2" />
  
  <!-- Inner dark card sheet -->
  <rect x="75" y="70" width="850" height="485" rx="28" fill="${cardBg}" stroke="${accentColor}" stroke-opacity="0.15" stroke-width="1.5" />
  
  <!-- Glowing icon badge -->
  <circle cx="215" cy="180" r="48" fill="url(#goldGlow)" />
  <circle cx="215" cy="180" r="38" fill="${cardBg}" />
  <circle cx="215" cy="180" r="22" fill="${accentColor}" />
  
  <!-- Header bar -->
  <rect x="290" y="152" width="480" height="56" rx="16" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1.5" />
  
  <!-- Visual content bars -->
  <rect x="155" y="295" width="350" height="30" rx="14" fill="${subAccent}" fill-opacity="0.4" />
  <rect x="155" y="348" width="530" height="24" rx="12" fill="${subAccent}" fill-opacity="0.25" />
  <rect x="155" y="388" width="620" height="24" rx="12" fill="${subAccent}" fill-opacity="0.18" />
  
  <!-- Title label in warm gold -->
  <text x="155" y="482" fill="${accentColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="700" letter-spacing="1">${title}</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const slides = [
  {
    id: "kickoff",
    alt: "Kickoff & Page Network Setup preview",
    title: "1. Kickoff & Page Network Setup",
    description:
      "Once you sign on, we start with a short kickoff call to lock in your goals, brand voice, and target audience. From there, our team builds and brands your dedicated network of pages — fully set up, optimised, and ready to post. You never log in, manage, or touch a single account.",
    image: createPlaceholderImage({
      startColor: "#1c1713",
      endColor: "#2b2219",
      cardBg: "#120f0c",
      accentColor: "#d4924a",
      subAccent: "#8f6838",
      title: "Network Setup",
    }),
  },
  {
    id: "sourcing",
    alt: "Content Sourcing preview",
    title: "2. Content Sourcing",
    description:
      "We go find the content that already exists — your past interviews, podcast episodes, or the reviews and reactions others have made about your brand — and identify the highest-impact moments worth clipping. If you don't have footage yet, we deploy a Production crew to your location to shoot it for you.",
    image: createPlaceholderImage({
      startColor: "#1d1813",
      endColor: "#2d231a",
      cardBg: "#130f0c",
      accentColor: "#e8a463",
      subAccent: "#9c7042",
      title: "Content Sourcing",
    }),
  },
  {
    id: "distribution",
    alt: "Clipping & Daily Distribution preview",
    title: "3. Clipping & Daily Distribution",
    description:
      "Every sourced clip is edited into short-form content and posted daily across your entire page network — YouTube Shorts, Instagram Reels, and Facebook Reels. This runs continuously, with zero effort required from you. Editing, posting, and growth are handled end to end by our team.",
    image: createPlaceholderImage({
      startColor: "#221a13",
      endColor: "#30241a",
      cardBg: "#14100c",
      accentColor: "#df9952",
      subAccent: "#966735",
      title: "Daily Distribution",
    }),
  },
  {
    id: "guarantee",
    alt: "Reporting & Guarantee preview",
    title: "4. Reporting & Guarantee",
    description:
      "We track performance against the guaranteed minimum views for your tier and keep you updated on how the network is performing. If we haven't hit your guaranteed number by month's end, clipping and distribution continue at no additional cost until we do.",
    image: createPlaceholderImage({
      startColor: "#1e1813",
      endColor: "#2d2319",
      cardBg: "#130f0c",
      accentColor: "#f3b97b",
      subAccent: "#a87a48",
      title: "Reporting & Guarantee",
    }),
  },
] as const

interface OnboardingDialogProps {
  isModal?: boolean
  defaultOpen?: boolean
  className?: string
}

export function OnboardingDialog({ isModal = false, defaultOpen = true, className }: OnboardingDialogProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  const isLastSlide = activeIndex === slides.length - 1
  const currentSlide = slides[activeIndex] ?? slides[0]

  const handleNext = () => {
    if (isLastSlide && isModal) { setOpen(false); return }
    emblaApi?.scrollNext()
  }

  const cardContent = (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        borderRadius: 24,
        backgroundColor: COLORS.surface,
        border: `1px solid ${COLORS.borderSubtle}`,
        boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(212, 146, 74, 0.05)",
        padding: 24,
        boxSizing: "border-box",
        textAlign: "left",
      }}
      className={className ?? ""}
    >
      {/* Carousel Viewport */}
      <div ref={emblaRef} style={{ overflow: "hidden", borderRadius: 18, border: "1px solid rgba(212, 146, 74, 0.15)" }}>
        <div style={{ display: "flex" }}>
          {slides.map((slide) => (
            <div key={slide.id} style={{ flex: "0 0 100%", minWidth: 0 }}>
              <img
                src={slide.image}
                alt={slide.alt}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: 18,
                  objectFit: "cover",
                  display: "block",
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicator Dots */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 20,
        marginBottom: 20,
      }}>
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            animate={{ width: index === activeIndex ? 26 : 8 }}
            initial={false}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to ${slide.title}`}
              style={{
                display: "block",
                width: "100%",
                height: 6,
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: index === activeIndex ? COLORS.accent : "rgba(242, 236, 225, 0.2)",
                boxShadow: index === activeIndex ? "0 0 10px rgba(212, 146, 74, 0.6)" : "none",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Title + Description with Crossfade */}
      <div style={{ position: "relative", minHeight: 110 }}>
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            animate={{
              opacity: currentSlide.id === slide.id ? 1 : 0,
              y: currentSlide.id === slide.id ? 0 : 4,
            }}
            initial={false}
            style={{
              position: currentSlide.id === slide.id ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: currentSlide.id === slide.id ? "auto" : "none",
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <h3 style={{
              fontSize: 19,
              fontWeight: 600,
              color: COLORS.text,
              fontFamily: FONTS.body,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              margin: 0,
            }}>
              {slide.title}
            </h3>
            <p style={{
              fontSize: 13.5,
              color: COLORS.textMuted,
              lineHeight: 1.6,
              fontFamily: FONTS.body,
              margin: "10px 0 0 0",
              fontWeight: 300,
            }}>
              {slide.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 16,
        marginTop: 24,
        paddingTop: 16,
        borderTop: `1px solid ${COLORS.borderSubtle}`,
      }}>
        <button
          onClick={() => {
            if (isModal) { setOpen(false); }
            else { emblaApi?.scrollTo(slides.length - 1); }
          }}
          style={{
            fontSize: 13.5,
            fontWeight: 500,
            color: COLORS.textMuted,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 10px",
            fontFamily: FONTS.body,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            color: "#0e0c0a",
            background: "linear-gradient(135deg, #e8a463, #d4924a)",
            border: "none",
            borderRadius: 12,
            padding: "10px 24px",
            cursor: "pointer",
            fontFamily: FONTS.body,
            boxShadow: "0 4px 18px rgba(212, 146, 74, 0.3)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(212, 146, 74, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 18px rgba(212, 146, 74, 0.3)";
          }}
        >
          {isLastSlide ? (isModal ? "Get Started" : "Next →") : "Next →"}
        </button>
      </div>
    </div>
  )

  if (!isModal) {
    return cardContent
  }

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setTimeout(() => emblaApi?.scrollTo(0), 50) }}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          border: "none",
          backgroundColor: COLORS.accent,
          color: "#0e0c0a",
        }}
      >
        Restart Onboarding
      </button>
    )
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={() => setOpen(false)}
      />
      {cardContent}
    </div>
  )
}

export default OnboardingDialog
