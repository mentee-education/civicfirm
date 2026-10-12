/*
 * DESIGN: Institutional — Portfolio / Work Section
 * Clean editorial layout. Image cards with solid dark text panel.
 * Images use object-contain on mobile to prevent cropping.
 * Text is always readable — solid dark panel, high contrast.
 * 5 projects: 2 featured + 3 standard. Non-Indigenous projects featured first.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const projects = [
  {
    name: "Toronto Cold Plunge",
    sector: "Wellness & Recovery",
    descriptor: "Premier recovery centre in North York",
    summary:
      "A sleek, conversion-focused website for Toronto's top cold plunge and recovery facility — featuring online booking, service breakdowns, and membership options.",
    image: "/portfolio/torontocoldplunge-hero.png",
    url: "https://torontocoldplunge.ca",
    accent: "#38bdf8",
    featured: false,
  },
  {
    name: "GoGo Wellness Clinic",
    sector: "Wellness & Beauty",
    descriptor: "Holistic wellness clinic",
    summary:
      "A polished, modern website for a wellness clinic — featuring treatment information, online booking, and a clean aesthetic that reflects personalized care.",
    image: "/portfolio/gogowellness-hero.png",
    url: "https://gogowellnessclinic.com",
    accent: "#5ec4a8",
    featured: false,
  },
  {
    name: "Tucson Tots",
    sector: "Childcare & Education",
    descriptor: "Early learning centre",
    summary:
      "A warm, trust-building website for a licensed early learning centre — designed to drive enrollment and communicate with families.",
    image: "/portfolio/tucsontots-hero-new.png",
    url: "https://tucsontots.com",
    accent: "#ffc83c",
    featured: true,
  },
  {
    name: "Stitch Deliver",
    sector: "Home Services",
    descriptor: "Mobile alterations & tailoring",
    summary:
      "A clean, service-focused website for a pickup-and-delivery tailoring business — designed to explain the process and drive bookings.",
    image: "/portfolio/stitchdeliver-hero.png",
    url: "https://stitchdeliver.ca",
    accent: "#ec4899",
    featured: false,
  },
  {
    name: "Room for Being",
    sector: "Coaching & Wellness",
    descriptor: "Personal discovery practice",
    summary:
      "A calm, editorial website for a personal discovery and transformation practice — designed to set the tone, explain the work, and invite a first conversation.",
    image: "/portfolio/roomforbeing-hero.png",
    url: "https://roomforbeing.com",
    accent: "#a3b18a",
    featured: false,
  },
  {
    name: "Becker's Bridal",
    sector: "Retail & Bridal",
    descriptor: "Toronto's oldest bridal boutique",
    summary:
      "An elegant, appointment-driven website for a heritage bridal boutique — celebrating 80+ years of trust with modern booking and collection showcases.",
    image: "/portfolio/beckers-hero.png",
    url: "",
    accent: "#d4a574",
    featured: true,
  },
];

export function ProjectCard({
  project,
  index,
  featured,
}: {
  project: (typeof projects)[0];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={project.url || undefined}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noopener noreferrer" : undefined}
      style={{
        cursor: project.url ? undefined : "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
      className="group relative block overflow-hidden rounded-xl bg-[oklch(0.18_0.03_155)] border border-white/[0.12] hover:border-white/30 transition-[border,box-shadow] duration-500 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.08)]"
    >
      {/* Image — uses object-cover with center positioning so nothing important gets cut */}
      <div
        className={`relative w-full overflow-hidden ${
          featured
            ? "aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9]"
            : "aspect-[16/10]"
        }`}
      >
        <img
          src={project.image}
          alt={`${project.name} — ${project.descriptor}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Arrow — top right, appears on hover */}
        <div className="absolute top-3 right-3 md:top-4 md:right-5 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm bg-white/10">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </div>
      </div>

      {/* Text panel — BELOW the image, not overlaid. Solid background, always readable. */}
      <div className="bg-[oklch(0.18_0.03_155)] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-5">
        <p
          className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] font-semibold mb-1"
          style={{ color: project.accent }}
        >
          {project.descriptor}
        </p>
        <h3
          className={`font-[var(--font-display)] font-bold text-white tracking-tight leading-tight ${
            featured
              ? "text-xl md:text-2xl lg:text-[1.75rem]"
              : "text-lg md:text-xl"
          }`}
        >
          {project.name}
        </h3>
        <p
          className={`text-white/60 leading-relaxed mt-1.5 ${
            featured
              ? "text-sm md:text-[15px]"
              : "text-xs md:text-sm"
          }`}
        >
          {project.summary}
        </p>
      </div>

      {/* Accent bar — bottom edge, slides in on hover */}
      <div
        className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: project.accent }}
      />
    </a>
  );
}

export default function Work() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-20 md:py-28 bg-[oklch(0.12_0.03_155)]">
      <div className="container">
        {/* Section header */}
        <div
          ref={headRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
              <span className="section-label">
                Selected Projects
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
            >
              Work that{" "}
              <span className="text-[#5cb85c]">speaks for itself.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-4 md:mt-0 text-white/70 text-sm max-w-xs leading-relaxed"
          >
            Real projects for real businesses — designed to attract customers,
            build trust, and drive growth.
          </motion.p>
        </div>

        {/* All projects — 3 across, featured ones first */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...featured, ...standard].map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[oklch(0.24_0.03_155)] pt-8 gap-4"
        >
          <p className="text-white/55 text-xs">
            Every project custom-designed and built to perform.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[#5cb85c] text-sm font-semibold hover:underline underline-offset-4"
          >
            Start a project
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
