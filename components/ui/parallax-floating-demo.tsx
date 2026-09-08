"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import { Button } from "@/components/ui/button"
import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating"

const exampleImages = [
  {
    url: "https://cdn.21st.dev/assets/mirror/52/52b151d355aa4cb6cb37f97fbd8ec4220186496e0e2cb63975a2b7756f3430ff.jpg",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/63/63536c1429b0897bad2245e153f83b4cd5edb05295ced36f5abd5c42639b6f.jpg",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/e4/e4889c24cd905daec03b7e1e1b80272a5dc257bdde184b6ab490880302638213.jpg",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/ef/ef4b3850e919b354ceae8e2ee350f0ba264ee59636ac3dad6413c062baa18584.jpg",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/0c/0cf551640ccf256e3b0ca6a86d1e35097ef7dadb74db3424380647192a30170d.jpg",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/b8/b830e628d8435311cd2a2b055311f44c25684f94c2f7ee06c187f1e3ca24c37d.jpg",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/f6/f6c549ea344a0680070bb5afa17dadb44ad3108cf18d1ff2743881741fe8dba5.jpg",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/de/de33e61d893c390086271e3ff0dbfbe8d6f5684f85909b0cda563ce3b3fcaa27.jpg",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
]

export function ParallaxFloatingDemo() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#07111E]">
      <div className="relative min-h-[80vh] sm:min-h-[90vh]">
        {/* Eyebrow + Headline + CTA — matches the site's dark-section pattern */}
        <div className="relative z-20 flex flex-col items-center justify-center pt-20 sm:pt-28 pb-8 text-center px-6">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-frost/70">
            The work
          </p>
          <motion.h2
            className="mt-4 font-agency text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-moonlight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            fancy.
          </motion.h2>
          <motion.p
            className="mt-4 max-w-md text-sm text-muted leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Parallax floating elements driven by pointer position —
            each layer drifts at its own depth.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Button
              variant="default"
              size="sm"
              className="h-9 px-6 text-xs font-medium tracking-wider"
            >
              Book a Strategy Call
            </Button>
          </motion.div>
        </div>

        {/* Parallax floating images */}
        <Floating sensitivity={-1} className="absolute inset-0">
          <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[0].url}
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[10%] left-[32%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[1].url}
              className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[2%] left-[53%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[2].url}
              className="w-28 h-40 md:w-40 md:h-52 object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[0%] left-[83%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[3].url}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>

          <FloatingElement depth={1} className="top-[40%] left-[2%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[4].url}
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[70%] left-[77%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[7].url}
              className="w-28 h-28 md:w-36 md:h-48 object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>

          <FloatingElement depth={4} className="top-[73%] left-[15%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[5].url}
              className="w-40 md:w-52 h-full object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[80%] left-[50%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[6].url}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-transform shadow-lg shadow-black/40"
            />
          </FloatingElement>
        </Floating>
      </div>
    </section>
  )
}
