import { useState, useEffect, useRef } from "react";
import {
  Mail,
  ExternalLink,
  Award,
  ChevronUp,
  Menu,
  X,
  BarChart2,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Zap,
  Code2,
  BookOpen,
  Brain,
  Code,
  Map,
} from "lucide-react";

/* ─── Global injected keyframes ─── */
const GLOBAL_STYLES = `
  @keyframes shimmer {
    0% { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 1; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes float-badge {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  .shimmer-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 212, 255, 0.07) 50%,
      transparent 100%
    );
    background-size: 600px 100%;
    animation: shimmer 4s infinite linear;
    pointer-events: none;
  }
  html { scroll-behavior: smooth; }
`;

/* ─── Custom hooks ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / totalFrames) * target));
      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

/* ─── Fonts: Cormorant Garamond + DM Sans ─── */
const CG: React.CSSProperties = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const DM: React.CSSProperties = { fontFamily: "'DM Sans', system-ui, sans-serif" };

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const N = 65;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.4 + 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.5)";
        ctx.fill();
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.13 * (1 - d / 115)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ─── Navbar ─── */
const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "certifications" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const link of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(link.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md shadow-lg shadow-black/30" : ""
        }`}
      style={{
        backgroundColor: scrolled ? "rgba(10,14,26,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="cursor-pointer bg-transparent border-0 p-0"
          style={{ ...CG, fontSize: "1.55rem", fontWeight: 600, color: "#00D4FF", letterSpacing: "0.01em" }}
        >
          Albert<span style={{ color: "#F0A500" }}>.</span>
        </button>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="cursor-pointer bg-transparent border-0 p-0 transition-colors duration-200"
                style={{
                  ...DM,
                  fontSize: "0.88rem",
                  color: active === l.id ? "#00D4FF" : "#8892A4",
                  fontWeight: active === l.id ? 500 : 400,
                }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden bg-transparent border-0 p-0 cursor-pointer transition-colors duration-200"
          style={{ color: "#8892A4" }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pb-5"
          style={{
            backgroundColor: "rgba(15,22,41,0.97)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className="cursor-pointer bg-transparent border-0 p-0"
                  style={{
                    ...DM,
                    fontSize: "1rem",
                    color: active === l.id ? "#00D4FF" : "#8892A4",
                  }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
const TITLES = ["Data Analyst", "Applied Geophysicist", "Geospatial", "Data Scientist"];

function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const target = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 42);
    } else {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0A0E1A" }}
    >
      <ParticleCanvas />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.7) 50%, rgba(15,22,41,0.9) 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className="transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
            }}
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-green-400"
                style={{ animation: "pulse 1.8s ease-in-out infinite" }}
              />
              <span style={{ ...DM, fontSize: "0.82rem", color: "#8892A4" }}>
                Available for hire
              </span>
            </div>

            <h1
              className="mb-5 leading-none"
              style={{
                ...CG,
                fontSize: "clamp(3.2rem, 8vw, 7rem)",
                fontWeight: 700,
                color: "#E8EAF0",
                letterSpacing: "-0.02em",
              }}
            >
              Albert
              <br />
              <span style={{ color: "#00D4FF" }}>Oluwatosin</span>
            </h1>

            <div
              className="flex items-center gap-1.5 mb-7"
              style={{ minHeight: "2.8rem" }}
            >
              <span
                style={{
                  ...CG,
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  fontWeight: 400,
                  color: "#F0A500",
                }}
              >
                {displayed}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.6rem",
                  backgroundColor: "#F0A500",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>

            <p
              className="mb-10"
              style={{
                ...DM,
                fontSize: "1.05rem",
                lineHeight: "1.75",
                color: "#8892A4",
                maxWidth: "520px",
              }}
            >
              Turning data into actionable insights for business, environmental, and geospatial decision-making.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  ...DM,
                  fontSize: "0.93rem",
                  fontWeight: 600,
                  padding: "0.85rem 1.8rem",
                  borderRadius: "0.6rem",
                  backgroundColor: "#00D4FF",
                  color: "#0A0E1A",
                  border: "none",
                  boxShadow: "0 0 24px rgba(0,212,255,0.2)",
                }}
              >
                View My Work
              </button>
              <a
                href="#"
                className="transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  ...DM,
                  fontSize: "0.93rem",
                  fontWeight: 500,
                  padding: "0.85rem 1.8rem",
                  borderRadius: "0.6rem",
                  border: "1px solid #F0A500",
                  color: "#F0A500",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Download CV
              </a>
            </div>
          </div>

          <div
  className="flex justify-center lg:justify-end transition-all duration-1000"
  style={{
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transitionDelay: "280ms",
  }}
>
  <div className="relative">
    {/* Glow Effect */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        boxShadow: "0 0 120px rgba(0,212,255,0.28)",
        animation: "pulse-glow 3.5s ease-in-out infinite",
      }}
    />

    {/* Outer Rotating Ring */}
    <div
      className="absolute rounded-full"
      style={{
        inset: "-25px",
        border: "1.5px dashed rgba(0,212,255,0.28)",
        borderRadius: "50%",
        animation: "spin-slow 14s linear infinite",
      }}
    />

    {/* Second Rotating Ring */}
    <div
      className="absolute rounded-full"
      style={{
        inset: "-45px",
        border: "1px dashed rgba(240,165,0,0.14)",
        borderRadius: "50%",
        animation: "spin-slow 22s linear infinite reverse",
      }}
    />

    {/* Profile Image */}
    <div
      style={{
        width: "clamp(280px, 35vw, 420px)",
        height: "clamp(280px, 35vw, 420px)",
        borderRadius: "50%",
        position: "relative",
        overflow: "hidden",
        border: "3px solid rgba(0,212,255,0.35)",
        boxShadow:
          "0 0 60px rgba(0,212,255,0.18), inset 0 0 30px rgba(0,212,255,0.08)",
      }}
    >
      <img
        src="/images/profile.jpg"
        alt="Albert Oluwatosin"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "linear-gradient(to top, rgba(10,14,26,0.25), transparent)",
        }}
      />
    </div>

    {/* Experience Badge */}
    <div
      className="absolute"
      style={{
        right: "-25px",
        top: "30px",
        background: "#0F1629",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "0.85rem",
        padding: "12px 18px",
        textAlign: "center",
        animation: "float-badge 4s ease-in-out infinite",
        minWidth: "90px",
      }}
    >
      <div
        style={{
          ...CG,
          fontSize: "1.9rem",
          fontWeight: 600,
          color: "#00D4FF",
          lineHeight: 1,
        }}
      >
        5+
      </div>
      <div
        style={{
          ...DM,
          fontSize: "0.65rem",
          color: "#8892A4",
          marginTop: "4px",
        }}
      >
        Years Exp.
      </div>
    </div>

    {/* Projects Badge */}
    <div
      className="absolute"
      style={{
        left: "-25px",
        bottom: "50px",
        background: "#0F1629",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "0.85rem",
        padding: "12px 18px",
        textAlign: "center",
        animation: "float-badge 4s ease-in-out infinite 2s",
        minWidth: "90px",
      }}
    >
      <div
        style={{
          ...CG,
          fontSize: "1.9rem",
          fontWeight: 600,
          color: "#F0A500",
          lineHeight: 1,
        }}
      >
        50+
      </div>
      <div
        style={{
          ...DM,
          fontSize: "0.65rem",
          color: "#8892A4",
          marginTop: "4px",
        }}
      >
        Projects
      </div>
    </div>
  </div>
</div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.35 }}>
          <span style={{ ...DM, fontSize: "0.72rem", color: "#8892A4", letterSpacing: "0.12em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: "1px", height: "38px", background: "linear-gradient(to bottom, #8892A4, transparent)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── Section title ─── */
function SectionTitle({
  title,
  accent = "cyan",
  subtitle,
}: {
  title: string;
  accent?: "cyan" | "gold";
  subtitle?: string;
}) {
  const color = accent === "cyan" ? "#00D4FF" : "#F0A500";
  return (
    <div className="mb-14 text-center">
      <h2
        className="mb-4"
        style={{
          ...CG,
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 600,
          color: "#E8EAF0",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div
        style={{ width: "72px", height: "2px", backgroundColor: color, borderRadius: "2px", margin: "0 auto" }}
      />
      {subtitle && (
        <p
          className="mt-4 mx-auto"
          style={{ ...DM, fontSize: "1rem", lineHeight: "1.7", color: "#8892A4", maxWidth: "480px" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── About ─── */
const STATS = [
  { icon: Briefcase, label: "Projects Delivered", value: 50, suffix: "+" },
  { icon: TrendingUp, label: "Years Experience", value: 5, suffix: "+" },
  { icon: Code2, label: "Tools Mastered", value: 10, suffix: "+" },
];

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  active,
}: {
  icon: any;
  label: string;
  value: number;
  suffix: string;
  active: boolean;
}) {
  const count = useCounter(value, active);
  return (
    <div
      className="flex flex-col items-center p-7 rounded-2xl text-center"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "rgba(0,212,255,0.1)" }}
      >
        <Icon size={20} style={{ color: "#00D4FF" }} />
      </div>
      <div
        style={{ ...CG, fontSize: "3.2rem", fontWeight: 600, color: "#E8EAF0", lineHeight: 1 }}
      >
        {count}{suffix}
      </div>
      <div style={{ ...DM, fontSize: "0.85rem", color: "#8892A4", marginTop: "8px" }}>{label}</div>
    </div>
  );
}

function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="py-24" style={{ backgroundColor: "#0F1629" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="About Me" accent="cyan" subtitle="The mind behind the metrics" />
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}
        >
          <div
            className="p-8 rounded-2xl"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-5 mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #0f2744 0%, #0A0E1A 100%)",
                  border: "1px solid rgba(0,212,255,0.28)",
                }}
              >
                <span style={{ ...CG, fontSize: "1.6rem", fontWeight: 300, color: "#00D4FF" }}>AO</span>
              </div>
              <div>
                <div style={{ ...CG, fontSize: "1.4rem", fontWeight: 600, color: "#E8EAF0" }}>Albert Oluwatosin</div>
                <div style={{ ...DM, fontSize: "0.84rem", color: "#00D4FF" }}>Senior Data Analyst</div>
              </div>
            </div>
            <p style={{ ...DM, fontSize: "0.97rem", lineHeight: "1.78", color: "#8892A4", marginBottom: "18px" }}>
              I am a Data Analyst and Applied Geophysicist with experience in data analytics, machine learning, statistical modeling, and geospatial analysis. Through projects in housing markets, air quality monitoring, earthquake damage assessment, customer segmentation, and bankruptcy prediction, I have developed the ability to transform complex datasets into meaningful insights that support business and scientific decision-making.
            </p>
            <p style={{ ...DM, fontSize: "0.97rem", lineHeight: "1.78", color: "#8892A4", marginBottom: "18px" }}>
              My background in geophysics and environmental science further enables me to apply data-driven approaches to Earth systems, groundwater exploration, and remote sensing applications.
            </p>
            <p style={{ ...DM, fontSize: "0.97rem", lineHeight: "1.78", color: "#8892A4" }}>
              When data speaks clearly, leaders act decisively that is the philosophy behind every analysis I deliver.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              {["Osun, Nigeria", "Open to Remote", "Full-time / Contract"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    ...DM,
                    fontSize: "0.76rem",
                    color: "#8892A4",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} active={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─── */
const SKILLS = [
  {
    title: "Business Analytics",
    icon: BarChart2,
    tags: [
      "Data Cleaning", "Data Visualization", "Exploratory Data Analysis",
      "Business Reporting", "Customer Analytics", "Predictive Analytics",
    ],
  },
  {
    title: "Data Science & Machine Learning",
    icon: Brain,
    tags: ["Regression", "Classification", "Clustering", "Feature Engineering", "Model Evaluation"],
  },
  {
    title: "Programming & Visualization",
    icon: Code,
    tags: ["Python", "R", "SQL", "Git", "Plotly", "Matplotlib", "Dash", "Streamlit"],
  },
  {
    title: "Geospatial Analytics",
    icon: Map,
    tags: ["QGIS", "Remote Sensing", "Satellite Data Analysis", "Environmental Monitoring"],
  },
];

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" className="py-24" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Skills & Expertise"
          accent="gold"
          subtitle="A precision toolkit built across 5+ years of data practice"
        />
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-7 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}
        >
          {SKILLS.map(({ title, icon: Icon, tags }) => (
            <div
              key={title}
              className="p-7 rounded-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0,212,255,0.1)" }}
                >
                  <Icon size={18} style={{ color: "#00D4FF" }} />
                </div>
                <h3 style={{ ...CG, fontSize: "1.1rem", fontWeight: 600, color: "#E8EAF0" }}>{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      ...DM,
                      fontSize: "0.8rem",
                      color: "#00D4FF",
                      border: "1px solid rgba(0,212,255,0.32)",
                      background: "rgba(0,212,255,0.06)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ─── */
const PROJECTS = [
  {
    title: "Sales Revenue Dashboard",
    tag: "Visualization",
    tagColor: "#00D4FF",
    desc: "Multi-page Power BI dashboard tracking $50M+ in annual revenue across 8 business units, exposing trends invisible to executive leadership.",
    stack: ["Power BI", "SQL", "DAX"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    imageAlt: "Analytics performance graphs on a laptop screen",
    codeUrl: "https://github.com/albert-oluwatosin/sales-revenue-dashboard",
    liveUrl: "https://albert-oluwatosin.github.io/sales-revenue-dashboard",
  },
  {
    title: "Customer Churn Prediction Model",
    tag: "Machine Learning",
    tagColor: "#F0A500",
    desc: "ML model achieving 87% accuracy in predicting customer churn, enabling proactive retention strategies that saved $2M+ in annual revenue.",
    stack: ["Python", "Scikit-learn", "XGBoost"],
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    imageAlt: "Abstract neural network visualization with dots and lines",
    codeUrl: "https://github.com/albert-oluwatosin/churn-prediction-model",
    liveUrl: "https://albert-oluwatosin.github.io/churn-prediction-model",
  },
  {
    title: "Marketing Attribution Analysis",
    tag: "Analytics",
    tagColor: "#00D4FF",
    desc: "Multi-touch attribution model revealing 35% of ad spend was misallocated — redirected budget delivered a 28% lift in campaign ROI.",
    stack: ["Python", "BigQuery", "Looker"],
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    imageAlt: "Digital marketing artwork and campaign analytics",
    codeUrl: "https://github.com/albert-oluwatosin/marketing-attribution",
    liveUrl: "https://albert-oluwatosin.github.io/marketing-attribution",
  },
  {
    title: "Real-Time KPI Tracker",
    tag: "Real-Time",
    tagColor: "#F0A500",
    desc: "Live operations dashboard updating every 60 seconds, monitoring 12 core business metrics across 5 regions for C-suite oversight.",
    stack: ["Tableau", "SQL", "REST APIs"],
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    imageAlt: "Real-time monitoring screen with live metrics",
    codeUrl: "https://github.com/albert-oluwatosin/realtime-kpi-tracker",
    liveUrl: "https://albert-oluwatosin.github.io/realtime-kpi-tracker",
  },
];

function ProjectCard({
  title, tag, tagColor, desc, stack, image, imageAlt, delay, inView, codeUrl, liveUrl,
}: {
  title: string; tag: string; tagColor: string; desc: string;
  stack: string[]; image: string; imageAlt: string; delay: number; inView: boolean;
  codeUrl: string; liveUrl: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="rounded-2xl cursor-default transition-all duration-500 relative overflow-hidden flex flex-col"
      style={{
        border: `1px solid ${hovered ? `${tagColor}45` : "rgba(255,255,255,0.08)"}`,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(28px)",
        transitionDelay: `${delay}ms`,
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.4), 0 0 28px ${tagColor}1A` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: "200px", flexShrink: 0 }}
      >
        {!imgLoaded && (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, #0F1629 0%, #1a2540 50%, #0F1629 100%)", backgroundSize: "400px 100%", animation: "shimmer 1.8s infinite linear" }}
          />
        )}
        <img
          src={image}
          alt={imageAlt}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s ease, opacity 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            opacity: imgLoaded ? 1 : 0,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, transparent 0%, rgba(10,14,26,0.85) 100%)",
            pointerEvents: "none",
          }}
        />
        <span
          className="absolute bottom-3 left-4 inline-block px-3 py-1 rounded-full"
          style={{
            ...DM,
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: tagColor,
            background: `rgba(10,14,26,0.8)`,
            border: `1px solid ${tagColor}50`,
            backdropFilter: "blur(6px)",
          }}
        >
          {tag}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="mb-3" style={{ ...CG, fontSize: "1.4rem", fontWeight: 600, color: "#E8EAF0", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p className="mb-5 flex-1" style={{ ...DM, fontSize: "0.88rem", lineHeight: "1.68", color: "#8892A4" }}>
          {desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-md"
              style={{
                ...DM,
                fontSize: "0.74rem",
                color: "#8892A4",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border transition-all duration-200"
            style={{ ...DM, fontSize: "0.8rem", color: "#8892A4", borderColor: "rgba(255,255,255,0.1)", textDecoration: "none" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#E8EAF0";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#8892A4";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            <GitHubIcon size={13} /> Code
          </a>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border transition-all duration-200"
            style={{ ...DM, fontSize: "0.8rem", color: "#8892A4", borderColor: "rgba(255,255,255,0.1)", textDecoration: "none" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#00D4FF";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,255,0.28)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,212,255,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#8892A4";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            <ExternalLink size={13} /> Live
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" className="py-24" style={{ backgroundColor: "#0F1629" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Featured Projects" accent="cyan" subtitle="Data problems solved, business value delivered" />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 90} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience ─── */
const EXPERIENCE = [
  {
    role: "Senior Data Analyst",
    company: "TechBridge Solutions",
    period: "2022 — Present",
    bullets: [
      "Engineered automated dashboards that reduced manual reporting time by 40%, saving 20+ hours weekly across the analytics team.",
      "Built real-time analytics pipeline processing 5M+ records/day, cutting executive query response time by 65%.",
      "Led cross-functional data initiatives adopted by 200+ stakeholders across 12 departments and 3 continents.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Nexus Consulting Group",
    period: "2020 — 2022",
    bullets: [
      "Modeled customer segmentation strategy that lifted quarterly revenue by ₦12M through targeted campaign optimization.",
      "Designed A/B testing framework that improved campaign ROI by 28% across 5 concurrent marketing programs.",
      "Migrated legacy reporting infrastructure to BigQuery, reducing operational data costs by 35%.",
    ],
  },
  {
    role: "Junior Data Analyst",
    company: "DataSpark Startup",
    period: "2018 — 2020",
    bullets: [
      "Built foundational ETL pipelines processing 500K+ daily transactions with 99.7% data accuracy.",
      "Created automated KPI reports compressing C-suite reporting cycles from 2 weeks to 2 days.",
      "Developed Python automation scripts eliminating 15+ repetitive data cleaning and validation tasks.",
    ],
  },
];

function ExpCard({ role, company, period, bullets }: { role: string; company: string; period: string; bullets: string[] }) {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
        <div>
          <h3 style={{ ...CG, fontSize: "1.3rem", fontWeight: 600, color: "#E8EAF0", marginBottom: "4px" }}>{role}</h3>
          <div style={{ ...DM, fontSize: "0.87rem", color: "#00D4FF" }}>{company}</div>
        </div>
        <span
          className="px-3 py-1.5 rounded-full flex-shrink-0"
          style={{
            ...DM,
            fontSize: "0.76rem",
            color: "#8892A4",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {period}
        </span>
      </div>
      <ul className="space-y-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              style={{
                marginTop: "7px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#00D4FF",
                flexShrink: 0,
                boxShadow: "0 0 6px rgba(0,212,255,0.5)",
              }}
            />
            <span style={{ ...DM, fontSize: "0.88rem", lineHeight: "1.68", color: "#8892A4" }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" className="py-24" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="Experience" accent="gold" subtitle="A career built on data-driven impact" />
        <div ref={ref} className="relative">
          <div
            className="hidden md:block absolute top-0 bottom-0"
            style={{
              left: "50%",
              width: "1px",
              transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, rgba(0,212,255,0.45), rgba(0,212,255,0.15), transparent)",
            }}
          />

          {EXPERIENCE.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={exp.company} className="relative mb-10">
                <div
                  className="hidden md:block absolute top-6 z-10"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: "#0A0E1A",
                    border: "2px solid #00D4FF",
                    boxShadow: "0 0 14px rgba(0,212,255,0.55)",
                  }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {isLeft ? (
                    <>
                      <div
                        className="md:pr-12 transition-all duration-700"
                        style={{
                          opacity: inView ? 1 : 0,
                          transform: inView ? "translateX(0)" : "translateX(-32px)",
                          transitionDelay: `${i * 140}ms`,
                        }}
                      >
                        <ExpCard {...exp} />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div
                        className="md:pl-12 transition-all duration-700"
                        style={{
                          opacity: inView ? 1 : 0,
                          transform: inView ? "translateX(0)" : "translateX(32px)",
                          transitionDelay: `${i * 140}ms`,
                        }}
                      >
                        <ExpCard {...exp} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Certifications ─── */
const CERTS = [
  { name: "Google Data Analytics Professional", issuer: "Google / Coursera", year: "2023" },
  { name: "Microsoft Power BI Data Analyst", issuer: "Microsoft", year: "2022" },
  { name: "IBM Data Science Professional", issuer: "IBM", year: "2021" },
];

function Certifications() {
  const [ref, inView] = useInView();
  return (
    <section id="certifications" className="py-24" style={{ backgroundColor: "#0F1629" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Credentials" accent="cyan" subtitle="Certified, validated, and industry-recognized" />
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}
        >
          <div>
            <h3 className="mb-6" style={{ ...CG, fontSize: "1.6rem", fontWeight: 600, color: "#E8EAF0" }}>
              Certifications
            </h3>
            <div className="flex flex-col gap-4">
              {CERTS.map((cert) => (
                <div
                  key={cert.name}
                  className="shimmer-card flex items-center gap-4 p-5 rounded-2xl relative overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)" }}
                  >
                    <Award size={20} style={{ color: "#00D4FF" }} />
                  </div>
                  <div>
                    <div style={{ ...DM, fontSize: "0.93rem", fontWeight: 600, color: "#E8EAF0", marginBottom: "3px" }}>
                      {cert.name}
                    </div>
                    <div style={{ ...DM, fontSize: "0.8rem", color: "#8892A4" }}>
                      {cert.issuer} · {cert.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6" style={{ ...CG, fontSize: "1.6rem", fontWeight: 600, color: "#E8EAF0" }}>
              Education
            </h3>
            <div
              className="p-7 rounded-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(135deg, rgba(240,165,0,0.05) 0%, rgba(255,255,255,0.03) 100%)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(240,165,0,0.12)" }}
                >
                  <GraduationCap size={20} style={{ color: "#F0A500" }} />
                </div>
                <div>
                  <div style={{ ...CG, fontSize: "1.35rem", fontWeight: 600, color: "#E8EAF0", marginBottom: "4px" }}>
                    Bachelor of Science, Physics
                  </div>
                  <div style={{ ...DM, fontSize: "0.88rem", color: "#F0A500" }}>                Obafemi Awolowo University, Ile Ife, Nigeria
                  </div>
                  <div style={{ ...DM, fontSize: "0.8rem", color: "#8892A4", marginTop: "2px" }}>Graduated 2024</div>
                </div>
              </div>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{
                  background: "rgba(240,165,0,0.12)",
                  border: "1px solid rgba(240,165,0,0.3)",
                }}
              >
                <Zap size={13} style={{ color: "#F0A500" }} />
                <span style={{ ...DM, fontSize: "0.8rem", fontWeight: 600, color: "#F0A500" }}>
                  First Class Honours
                </span>
              </div>

              <p style={{ ...DM, fontSize: "0.88rem", lineHeight: "1.68", color: "#8892A4" }}>
                Related coursework: Quantum Physics, Solid earth Physics, Introduction to Astrophysics, Statistical Physics, Mathematical Physics, Thermodynamics and Kinetics Theory, Classical Mechanics, Solid State Physics, Computer Programming.
              </p>
            </div>
          </div>

          {/* Publication */}
          <div>
            <h3 className="mb-6" style={{ ...CG, fontSize: "1.6rem", fontWeight: 600, color: "#E8EAF0" }}>Publications</h3>
            <a
              href="https://www.scirp.org/journal/paperinformation?paperid=145927"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-card flex items-start gap-4 p-5 rounded-2xl relative overflow-hidden transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", textDecoration: "none", display: "flex" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,255,0.3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.1)" }}>
                <BookOpen size={20} style={{ color: "#00D4FF" }} />
              </div>
              <div className="flex-1">
                <div style={{ ...DM, fontSize: "0.93rem", fontWeight: 600, color: "#E8EAF0", marginBottom: "6px", lineHeight: "1.5" }}>
                  SRTM-DEM Fracture Mapping for Groundwater Potential around Oyo and Ogun States, Southwestern Nigeria
                </div>
                <div style={{ ...DM, fontSize: "0.78rem", color: "#8892A4", marginBottom: "8px" }}>
                  Open Access Library Journal · Sep 27, 2025
                </div>
                <div style={{ ...DM, fontSize: "0.78rem", color: "#00D4FF", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <ExternalLink size={12} /> View Publication
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/albert-oluwatosin",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/albert-oluwatosin",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:albert.oluwatosin@email.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer
        className="py-16"
        style={{ backgroundColor: "#0A0E1A", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className="mb-9"
            style={{
              ...CG,
              fontSize: "1.55rem",
              fontStyle: "italic",
              color: "#8892A4",
              fontWeight: 400,
            }}
          >
            "Turning data into decisions."
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#8892A4",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00D4FF";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,255,0.28)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#8892A4";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          <a
            href="mailto:albert.oluwatosin@email.com"
            className="inline-flex items-center gap-2 mb-8 transition-colors duration-200"
            style={{ ...DM, fontSize: "0.88rem", color: "#8892A4", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00D4FF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8892A4")}
          >
            <Mail size={14} />
            albert.oluwatosin@email.com
          </a>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "28px" }} />

          <p style={{ ...DM, fontSize: "0.8rem", color: "#8892A4" }}>
            © {new Date().getFullYear()} Albert Oluwatosin. All rights reserved.
          </p>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
        style={{
          background: "rgba(15,22,41,0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#8892A4",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(16px)",
          pointerEvents: showTop ? "auto" : "none",
        }}
        aria-label="Back to top"
      >
        <ChevronUp size={18} />
      </button>
    </>
  );
}

/* ─── App ─── */
export default function App() {
  useEffect(() => {
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap";
    document.head.appendChild(fontLink);

    return () => {
      [preconnect1, preconnect2, fontLink].forEach((el) => {
        if (document.head.contains(el)) document.head.removeChild(el);
      });
    };
  }, []);

  return (
    <div style={{ ...DM, backgroundColor: "#0A0E1A", minHeight: "100vh overflow-x-hidden" }}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Footer />
    </div>
  );
}