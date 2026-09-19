import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Route, Router as WouterRouter, Switch, useLocation, useParams } from "wouter";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  MoveUpRight,
  Network,
  Orbit,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
const dashboardImage = "/1_1789837815931.png";
const networkImage = "/5_1789837815930.png";
const caseTrackImage = "/6_(1)_1789837815928.png";
const phoneImage = "/4_1789837815930.jpg";
const watchImage = "/3_1789837815929.png";
import "@/index.css";

const queryClient = new QueryClient();

type Project = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  details: string;
  tags: string[];
  image: string;
  year: string;
  accent: string;
  stat: string;
  challenge: string;
  outcome: string;
  bullets: string[];
  code: string;
};

const projects: Project[] = [
  {
    slug: "workforce-management-erp",
    title: "Workforce Management ERP",
    type: "Operations platform",
    summary: "A single source of truth for people, inventory, attendance, and field work.",
    details:
      "An operations suite built around the messy reality of distributed teams: unreliable connectivity, many roles, and no patience for duplicate entry.",
    tags: ["NestJS", "React", "MongoDB", "React Native"],
    image: dashboardImage,
    year: "2025",
    accent: "green",
    stat: "205+ secure endpoints",
    challenge:
      "Manual HR processes were costing the client nearly 40 hours a week in reconciliation. Every spreadsheet was a new version of the truth.",
    outcome: "One dependable operational layer for 40+ live users across eight connected modules.",
    bullets: [
      "Geo-fenced attendance with route history",
      "Complaint ticketing with ownership and resolution states",
      "Inventory tracking across multiple warehouses",
      "Typed, documented API surface with role-aware access",
    ],
    code: "@UseGuards(JwtAuthGuard, RolesGuard)\n@Roles(Role.ADMIN, Role.HR)\n@Post('attendance/punch')\nasync recordPunch(@Body() dto: CreatePunchDto) {\n  return this.attendanceService.verifyAndRecordPunch(dto)\n}",
  },
  {
    slug: "kranti-backend",
    title: "Kranti Backend",
    type: "Community infrastructure",
    summary: "A production backend that keeps a community product quick under real traffic.",
    details:
      "The unglamorous, high-leverage layer behind a community app: permissions, feeds, media, moderation, and the small decisions that prevent a launch from becoming a fire drill.",
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    image: networkImage,
    year: "2024",
    accent: "blue",
    stat: "Sub-100ms average response",
    challenge:
      "A growing community platform needed concurrent socket connections, heavy read loads, and clean moderation boundaries without slowing down the team.",
    outcome:
      "Live production traffic on the Play Store with resilient query paths and a backend that could evolve without drama.",
    bullets: [
      "JWT authentication and granular RBAC",
      "Asynchronous media optimisation via Cloudinary",
      "Aggregation pipelines for personalised feeds",
      "Production-ready APIs built for mobile clients",
    ],
    code: "router.route('/feed')\n  .get(requireAuth,\n    validateQuery(feedQuerySchema),\n    asyncHandler(feedController.getPersonalizedFeed)\n  )",
  },
  {
    slug: "advocate-case-tracker",
    title: "Advocate Case Tracker",
    type: "Product system",
    summary: "A calmer way for Indian advocates to manage cases, clients, and hearings.",
    details:
      "Case Track Diary India turns the daily legal practice into an organised workspace: less searching, fewer missed dates, and more time for the work that matters.",
    tags: ["Product design", "React Native", "API design", "UX"],
    image: caseTrackImage,
    year: "2024",
    accent: "mint",
    stat: "Built for the daily brief",
    challenge:
      "Important dates and client context were scattered across diaries, messages, and memory. The product needed to feel trustworthy before it felt clever.",
    outcome:
      "A mobile-first workflow that makes the next hearing, active case, and client context immediately visible.",
    bullets: [
      "Upcoming hearing timelines and reminders",
      "Client and case relationships that stay in context",
      "A focused mobile home for the first five minutes of the day",
      "Visual language designed for clarity, not legal theatre",
    ],
    code: "const upcoming = hearings\n  .filter(({ date }) => date >= today)\n  .sort(bySoonest)\n  .slice(0, 5)",
  },
  {
    slug: "tikk-app",
    title: "Tikk App",
    type: "Rapid prototype",
    summary: "A cross-platform proof of concept for QA workflows and live state.",
    details:
      "A focused prototype that proved a mobile workflow quickly, while leaving the right seams for a production backend and real-time collaboration.",
    tags: ["React Native", "Firebase", "Express", "Mongoose"],
    image: phoneImage,
    year: "2023",
    accent: "amber",
    stat: "Concept to prototype in 14 days",
    challenge:
      "The product hypothesis needed a working surface before another week of planning could make it feel safer.",
    outcome: "A functioning cross-platform prototype with live session state and a clear path to hardening.",
    bullets: [
      "Unified iOS and Android experience",
      "Firebase snapshot updates for live sessions",
      "Small surface area designed for rapid QA",
      "Clear migration path from prototype to service",
    ],
    code: "useEffect(() => {\n  const unsubscribe = onSnapshot(\n    doc(db, 'sessions', id),\n    snapshot => setState(snapshot.data())\n  )\n  return unsubscribe\n}, [id])",
  },
  {
    slug: "template-x356",
    title: "Template-X356",
    type: "Developer tooling",
    summary: "Opinionated foundations for starting a product without starting from zero.",
    details:
      "A practical collection of reusable React and Expo patterns: theme primitives, layouts, and the boring setup that makes the interesting work arrive sooner.",
    tags: ["React", "Tailwind", "Expo", "Design systems"],
    image: watchImage,
    year: "2023",
    accent: "violet",
    stat: "60+ reusable templates",
    challenge:
      "Every new project was spending its first days solving the same configuration and visual consistency problems.",
    outcome: "A reliable base layer that lets developers start with decisions instead of defaults.",
    bullets: [
      "Reusable layouts for web and native",
      "CSS-variable based theme system",
      "Accessible primitives with sensible defaults",
      "Documentation that explains the why",
    ],
    code: "export function ThemeProvider({ children }: Props) {\n  const [theme, setTheme] = useState<Theme>('dark')\n  useEffect(() => {\n    document.documentElement.dataset.theme = theme\n  }, [theme])\n  return <ThemeContext.Provider value={{ theme }} />\n}",
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/skills", label: "Skills" },
];

function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("saurabh-theme") !== "light");

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    localStorage.setItem("saurabh-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <div className="noise min-h-[100dvh] overflow-hidden">
      <div className="fixed inset-0 -z-10 shell-grid opacity-70" />
      <div className="fixed left-[12%] top-[-160px] -z-10 h-[420px] w-[420px] rounded-full bg-[hsl(var(--primary)/.06)] blur-[100px]" />
      <header className="sticky top-0 z-30 border-b hairline bg-[hsl(var(--background)/.82)] backdrop-blur-xl">
        <div className="page-wrap flex h-[74px] items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
            <span className="flex h-9 w-9 items-center justify-center border border-[hsl(var(--primary)/.5)] font-display text-sm font-bold text-[hsl(var(--primary))] transition-transform group-hover:rotate-12">
              SK
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-[.08em] sm:block">
              SAURABH KUMAR
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`relative py-3 font-mono text-[11px] uppercase tracking-[.14em] transition-colors ${
                  location === link.href
                    ? "text-[hsl(var(--primary))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(var(--primary))]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="button button-ghost button-icon !min-h-9 !h-9"
              onClick={() => setDark((value) => !value)}
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              href="/contact"
              className="button button-primary hidden !min-h-9 px-4 font-mono text-[11px] uppercase tracking-[.12em] sm:inline-flex"
              data-testid="link-header-contact"
            >
              Start a conversation <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              className="button button-ghost button-icon !min-h-9 !h-9 md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Open menu"
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="page-wrap border-t hairline py-4 md:hidden" aria-label="Mobile navigation">
            {navLinks.concat({ href: "/contact", label: "Contact" }).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
                className={`block border-b hairline py-4 font-mono text-xs uppercase tracking-[.15em] ${
                  location === link.href
                    ? "text-[hsl(var(--primary))]"
                    : "text-[hsl(var(--muted-foreground))]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t hairline">
        <div className="page-wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-[hsl(var(--primary)/.5)] font-display text-xs font-bold text-[hsl(var(--primary))]">
                SK
              </span>
              <span className="font-display font-semibold tracking-[.08em]">SAURABH KUMAR</span>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">
              Backend-focused engineer and product-minded builder. I make complex systems easier to
              understand, use, and trust.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-5">Navigate</div>
            <div className="grid gap-3 text-sm text-[hsl(var(--muted-foreground))]">
              {navLinks.concat({ href: "/contact", label: "Contact" }).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-[hsl(var(--primary))]"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-5">Elsewhere</div>
            <div className="grid gap-3 text-sm text-[hsl(var(--muted-foreground))]">
              <a
                href="https://github.com/Saurabhkumar9"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-[hsl(var(--primary))]"
                data-testid="link-github"
              >
                <Github size={15} /> GitHub <ExternalLink size={12} />
              </a>
              <a
                href="https://www.linkedin.com/in/saurabh-kumar-yadav-7368252b7"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-[hsl(var(--primary))]"
                data-testid="link-linkedin"
              >
                <Linkedin size={15} /> LinkedIn <ExternalLink size={12} />
              </a>
              <a
                href="mailto:saurabhkumarycse@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-[hsl(var(--primary))]"
                data-testid="link-email"
              >
                <Mail size={15} /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="page-wrap flex flex-col gap-2 border-t hairline py-5 text-[11px] text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Saurabh Kumar. Built with care.</span>
          <Link href="/privacy" className="hover:text-[hsl(var(--primary))]" data-testid="link-privacy">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-3 eyebrow">
      <span className="text-[hsl(var(--muted-foreground))]">{index || "//"}</span>
      <span>{children}</span>
      <span className="h-px w-10 bg-[hsl(var(--primary)/.5)]" />
    </div>
  );
}

function PageIntro({ kicker, title, copy }: { kicker: string; title: ReactNode; copy: string }) {
  return (
    <section className="page-wrap pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="max-w-4xl reveal">
        <SectionLabel> {kicker}</SectionLabel>
        <h1 className="display-lg max-w-4xl">{title}</h1>
        <p className="body-lg mt-8 max-w-2xl text-[hsl(var(--muted-foreground))]">{copy}</p>
      </div>
    </section>
  );
}

function Home() {
  return (
    <Layout>
      <section className="page-wrap relative flex min-h-[calc(100dvh-74px)] flex-col justify-center py-20">
        <div className="pointer-events-none absolute right-0 top-1/4 hidden w-1/2 md:block">
          <div className="relative aspect-square overflow-hidden border border-[hsl(var(--border))] opacity-80">
            <img
              src={networkImage}
              alt=""
              className="h-full w-full object-cover opacity-30 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background))_0%,transparent_45%,hsl(var(--background)/.2))]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(var(--background))_0%,transparent_45%,hsl(var(--background)/.2))]" />
          </div>
        </div>

        <div className="relative max-w-5xl">
          <div className="eyebrow reveal">01 / BACKEND ENGINEER · PRODUCT BUILDER</div>
          <h1 className="display-xl mt-7 max-w-5xl reveal delay-1">
            Systems with <span className="text-[hsl(var(--primary))]">a point of view.</span>
          </h1>
          <p className="body-lg mt-9 max-w-xl text-[hsl(var(--muted-foreground))] reveal delay-2">
            I’m Saurabh — I design and build the dependable layer behind ambitious products. Clear
            architecture, useful interfaces, no unnecessary theatre.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 reveal delay-3">
            <Link
              href="/projects"
              className="button button-primary font-mono text-xs uppercase tracking-[.12em]"
              data-testid="link-home-projects"
            >
              See selected work <ArrowDownRight size={16} />
            </Link>
            <Link
              href="/about"
              className="button button-ghost font-mono text-xs uppercase tracking-[.12em]"
              data-testid="link-home-about"
            >
              How I work <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="relative mt-24 grid max-w-3xl grid-cols-2 gap-px border-y hairline bg-[hsl(var(--border))] md:grid-cols-4 reveal delay-3">
          {[
            ["05", "systems shipped"],
            ["205+", "API endpoints in one platform"],
            ["14d", "concept to prototype"],
            ["∞", "curiosity about the edge cases"],
          ].map(([value, label]) => (
            <div key={label} className="bg-[hsl(var(--background))] px-4 py-5">
              <div className="font-display text-2xl font-semibold text-[hsl(var(--primary))]">{value}</div>
              <div className="mt-2 max-w-[130px] font-mono text-[10px] uppercase leading-4 tracking-[.08em] text-[hsl(var(--muted-foreground))]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t hairline">
        <div className="page-wrap">
          <SectionLabel index="02">Selected work</SectionLabel>
          <div className="grid gap-5 md:grid-cols-12">
            <ProjectCard project={projects[0]} featured />
            <ProjectCard project={projects[2]} />
            <ProjectCard project={projects[1]} />
          </div>
          <div className="mt-10">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[.14em] text-[hsl(var(--primary))]"
              data-testid="link-home-archive"
            >
              View the full archive{" "}
              <span className="transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t hairline bg-[hsl(var(--card)/.35)]">
        <div className="page-wrap grid gap-12 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel index="03">The useful part</SectionLabel>
            <h2 className="display-lg max-w-md">
              Make the hard part feel <span className="text-[hsl(var(--secondary))]">obvious.</span>
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="body-lg text-[hsl(var(--muted-foreground))]">
              The best engineering is felt as calm. Fewer surprises in the product, fewer mysteries in the
              codebase, fewer meetings spent translating between an idea and its implementation.
            </p>
            <div className="mt-12 grid gap-8 border-t hairline pt-8 sm:grid-cols-2">
              <div>
                <div className="mb-3 text-[hsl(var(--primary))]">
                  <Network size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold">Think in systems</h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  Model the flows, permissions, failure modes, and seams before committing to the surface.
                </p>
              </div>
              <div>
                <div className="mb-3 text-[hsl(var(--secondary))]">
                  <Sparkles size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold">Stay close to the user</h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  Technical decisions only matter when they make someone’s day clearer or faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group card relative block overflow-hidden transition-colors hover:border-[hsl(var(--primary)/.55)] ${
        featured ? "md:col-span-7 md:row-span-2" : "md:col-span-5"
      }`}
      data-testid={`card-project-${project.slug}`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[1.25/1] md:aspect-auto md:h-[100%] md:min-h-[590px]" : "aspect-[1.25/1]"
        }`}
      >
        {/* FIX: images were rendered dark/grayscale by default ("opacity-70 grayscale")
           and only turned to full color on hover ("group-hover:grayscale-0").
           Removing the default grayscale + raising opacity shows real colors immediately;
           hover now just does a subtle zoom, no color flip. */}
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,hsl(var(--background)/.9)_100%)]" />
        <div className="absolute left-5 top-5 flex items-center gap-3">
          <span className="tag !border-white/20 !bg-black/30 !text-white/75">{project.year}</span>
          <span className="font-mono text-[10px] uppercase tracking-[.12em] text-white/60">
            {project.type}
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <div className="mb-3 flex items-center justify-between">
            <h3
              className={`${
                featured ? "text-3xl md:text-4xl" : "text-2xl"
              } font-display font-semibold tracking-tight text-white`}
            >
              {project.title}
            </h3>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              <MoveUpRight size={16} />
            </span>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/65">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="font-mono text-[10px] uppercase tracking-[.06em] text-white/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function About() {
  return (
    <Layout>
      <PageIntro
        kicker="About / working philosophy"
        title={
          <>
            Complexity is a material.
            <br />
            <span className="text-[hsl(var(--primary))]">I shape it carefully.</span>
          </>
        }
        copy="I’m a backend-focused software engineer who likes sitting close to the product. My work lives where reliable systems, useful interfaces, and ambiguous business problems meet."
      />

      <section className="border-y hairline bg-[hsl(var(--card)/.35)]">
        <div className="page-wrap grid gap-14 py-20 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionLabel index="01">A little context</SectionLabel>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              The code is only one part of the job.
            </h2>
          </div>
          <div className="space-y-6 text-[hsl(var(--muted-foreground))] leading-8">
            <p>
              I started with web development and kept moving toward the places where products either become
              trustworthy or quietly fall apart: data models, auth boundaries, integrations, background jobs,
              and the decisions that shape every screen downstream.
            </p>
            <p>
              Today I work across NestJS, Node, React, React Native, MongoDB, and the space between a product
              idea and its first honest version. I care about the details that let a small team move with
              confidence.
            </p>
            <p className="text-[hsl(var(--foreground))]">
              My north star: leave the system easier to reason about than I found it.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-wrap">
          <SectionLabel index="02">Principles</SectionLabel>
          <div className="grid gap-px border hairline bg-[hsl(var(--border))] md:grid-cols-3">
            {[
              [
                "01",
                "Start with the shape of the problem",
                "Before choosing a framework, map the people, decisions, state changes, and failure modes.",
              ],
              [
                "02",
                "Make the invisible legible",
                "Good systems explain themselves through naming, documentation, observability, and a few thoughtful defaults.",
              ],
              [
                "03",
                "Ship the smallest honest thing",
                "A useful prototype teaches more than a polished assumption. Build the testable version first.",
              ],
            ].map(([num, title, copy]) => (
              <article key={num} className="bg-[hsl(var(--background))] p-7 md:p-9">
                <div className="font-mono text-xs text-[hsl(var(--primary))]">{num}</div>
                <h3 className="mt-12 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="page-wrap grid gap-12 py-20 md:grid-cols-[1fr_1fr]">
          <div>
            <SectionLabel index="03">Trajectory</SectionLabel>
            <h2 className="font-display text-4xl font-semibold">Learning by building in public.</h2>
          </div>
          <div className="border-l border-[hsl(var(--primary)/.45)] pl-7">
            {[
              ["2026 — now", "Full-Stack Developer", "GK Enterprises"],
              ["2025 — 2026", "MERN Stack Intern", "Punto 7x"],
              ["2025", "Web Development Intern", "Octanet Services"],
              ["2021 — 2025", "B.Tech, Computer Science", "8.33 SGPA"],
            ].map(([date, role, company]) => (
              <div key={date} className="relative mb-9 last:mb-0">
                <span className="absolute -left-[33px] top-1 h-3 w-3 rounded-full border-2 border-[hsl(var(--background))] bg-[hsl(var(--primary))]" />
                <div className="font-mono text-[11px] uppercase tracking-[.12em] text-[hsl(var(--primary))]">
                  {date}
                </div>
                <div className="mt-2 font-display text-xl font-semibold">{role}</div>
                <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Operations", "Product", "Infrastructure", "Tooling"];

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => {
      if (filter === "Operations") return project.type.includes("Operations");
      if (filter === "Infrastructure") return project.type.includes("infrastructure");
      if (filter === "Tooling") return project.type.includes("Tooling");
      return project.type.includes("Product") || project.type.includes("prototype");
    });
  }, [filter]);

  return (
    <Layout>
      <PageIntro
        kicker="Projects / selected systems"
        title={
          <>
            A record of making
            <br />
            <span className="text-[hsl(var(--primary))]">useful things work.</span>
          </>
        }
        copy="A small archive of platforms, products, and experiments. Each one started with a messy problem and ended with a clearer way through it."
      />

      <section className="page-wrap pb-24">
        <div className="mb-10 flex flex-wrap items-center gap-2 border-y hairline py-4">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`button !min-h-9 px-3 font-mono text-[10px] uppercase tracking-[.1em] ${
                filter === item ? "button-primary" : "button-ghost"
              }`}
              data-testid={`button-filter-${item.toLowerCase()}`}
            >
              {item}
            </button>
          ))}
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))] sm:block">
            {visible.length} projects
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((project, index) => (
            <div key={project.slug} className={index === 0 && filter === "All" ? "md:col-span-2" : ""}>
              <ProjectCard project={project} featured={index === 0 && filter === "All"} />
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}

function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <Layout>
        <div className="page-wrap py-40 text-center">
          <SectionLabel>404 / project</SectionLabel>
          <h1 className="display-lg">
            That system is
            <br />
            not in this archive.
          </h1>
          <Link
            href="/projects"
            className="button button-primary mt-10 font-mono text-xs uppercase"
            data-testid="link-back-projects"
          >
            Back to projects <ArrowLeft size={15} />
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="page-wrap pt-20 pb-14 md:pt-28">
        <Link
          href="/projects"
          className="mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
          data-testid="link-back-archive"
        >
          <ArrowLeft size={14} /> All projects
        </Link>
        <div className="grid gap-12 md:grid-cols-[1fr_.75fr] md:items-end">
          <div>
            <div className="eyebrow reveal">
              {project.year} / {project.type}
            </div>
            <h1 className="display-lg mt-7 reveal delay-1">{project.title}</h1>
          </div>
          <p className="body-lg text-[hsl(var(--muted-foreground))] reveal delay-2">{project.details}</p>
        </div>
      </section>

      <section className="page-wrap pb-20">
        <div className="relative aspect-[16/8] overflow-hidden border hairline">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover grayscale-[.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/.65)] to-transparent" />
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag !border-white/20 !bg-black/35 !text-white/80">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[hsl(var(--card)/.3)]">
        <div className="page-wrap grid gap-14 py-20 md:grid-cols-[.75fr_1.25fr]">
          <aside>
            <SectionLabel index="01">The challenge</SectionLabel>
            <blockquote className="border-l-2 border-[hsl(var(--primary))] pl-5 font-display text-2xl font-medium leading-tight">
              “{project.challenge}”
            </blockquote>
            <div className="mt-10 border-t hairline pt-5">
              <div className="eyebrow">Outcome</div>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--foreground))]">{project.outcome}</p>
            </div>
          </aside>
          <div>
            <SectionLabel index="02">What shipped</SectionLabel>
            <div className="grid gap-px border hairline bg-[hsl(var(--border))] sm:grid-cols-2">
              {project.bullets.map((bullet, i) => (
                <div key={bullet} className="bg-[hsl(var(--background))] p-6">
                  <span className="font-mono text-xs text-[hsl(var(--primary))]">0{i + 1}</span>
                  <p className="mt-7 text-sm leading-6">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section">
        <div className="grid gap-12 md:grid-cols-[.75fr_1.25fr]">
          <div>
            <SectionLabel index="03">Under the hood</SectionLabel>
            <h2 className="font-display text-4xl font-semibold">
              The small decisions
              <br />
              carry the weight.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
              Clean boundaries, explicit permissions, and code that gives the next person somewhere obvious to
              stand.
            </p>
          </div>
          <div className="overflow-hidden border hairline bg-[#10151a]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#e36b5e]" />
              <span className="h-2 w-2 rounded-full bg-[#d5b55a]" />
              <span className="h-2 w-2 rounded-full bg-[#55c787]" />
              <span className="ml-3 font-mono text-[10px] text-white/35">architecture.ts</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-xs leading-7 text-[#b7c8b9]">
              <code>{project.code}</code>
            </pre>
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}

function Services() {
  const services = [
    {
      icon: <Network size={21} />,
      title: "Backend architecture",
      copy: "From first domain model to a service boundary that can survive growth. APIs, auth, data, jobs, and the seams between them.",
    },
    {
      icon: <Orbit size={21} />,
      title: "Product engineering",
      copy: "Turn an ambiguous product brief into a working, coherent slice that users can actually respond to.",
    },
    {
      icon: <ShieldCheck size={21} />,
      title: "Systems hardening",
      copy: "Find the hidden fragility: permissions, observability, integrations, edge cases, and the places the happy path does not reach.",
    },
    {
      icon: <Layers3 size={21} />,
      title: "Design-minded delivery",
      copy: "A technical partner who cares about the interface because clarity in the product usually starts with clarity in the system.",
    },
  ];

  return (
    <Layout>
      <PageIntro
        kicker="Services / how I can help"
        title={
          <>
            Bring me the
            <br />
            <span className="text-[hsl(var(--primary))]">complicated part.</span>
          </>
        }
        copy="I work best with teams who have a meaningful problem, a sharp constraint, or a product that is starting to feel heavier than it should."
      />

      <section className="page-wrap pb-24">
        <div className="grid gap-px border hairline bg-[hsl(var(--border))] md:grid-cols-2">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="group bg-[hsl(var(--background))] p-8 transition-colors hover:bg-[hsl(var(--card)/.7)] md:p-10"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center border border-[hsl(var(--primary)/.35)] text-[hsl(var(--primary))] transition-colors group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))]">
                  {service.icon}
                </div>
                <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">0{i + 1}</span>
              </div>
              <h2 className="mt-14 font-display text-2xl font-semibold">{service.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {service.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y hairline bg-[hsl(var(--card)/.35)]">
        <div className="page-wrap grid gap-12 py-20 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel index="02">Good fit</SectionLabel>
            <h2 className="font-display text-4xl font-semibold">A little ambition helps.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              "You need a real system, not just a demo.",
              "You value clear trade-offs over perfect predictions.",
              "You want product thinking in the technical room.",
              "You are willing to look at the uncomfortable edge cases.",
            ].map((item) => (
              <div key={item} className="flex gap-3 border-t hairline pt-4 text-sm leading-6">
                <Check className="mt-1 shrink-0 text-[hsl(var(--primary))]" size={16} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}

function Skills() {
  const groups = [
    {
      title: "Build",
      icon: <Code2 size={19} />,
      items: [
        "TypeScript",
        "Node.js",
        "NestJS",
        "Express.js",
        "React",
        "React Native",
        "REST APIs",
        "Swagger / OpenAPI",
      ],
    },
    {
      title: "Persist",
      icon: <Database size={19} />,
      items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Aggregation pipelines", "Data modelling"],
    },
    {
      title: "Ship",
      icon: <Server size={19} />,
      items: ["Docker", "Git", "CI / CD", "Cloudinary", "Firebase", "Production debugging"],
    },
    {
      title: "Think",
      icon: <Zap size={19} />,
      items: [
        "Domain modelling",
        "RBAC & JWT",
        "System design",
        "Product discovery",
        "Technical writing",
        "Design systems",
      ],
    },
  ];

  return (
    <Layout>
      <PageIntro
        kicker="Skills / technical toolkit"
        title={
          <>
            The toolbox is wide.
            <br />
            <span className="text-[hsl(var(--primary))]">The thinking is specific.</span>
          </>
        }
        copy="Tools are useful when they disappear into the result. Here is the set I reach for most often, and the principles I bring along with them."
      />

      <section className="page-wrap pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((group) => (
            <article key={group.title} className="card p-7 md:p-9">
              <div className="flex items-center gap-3 text-[hsl(var(--primary))]">
                {group.icon}
                <h2 className="font-display text-2xl font-semibold text-[hsl(var(--foreground))]">
                  {group.title}
                </h2>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y hairline">
        <div className="page-wrap grid gap-12 py-20 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel index="02">Strengths</SectionLabel>
            <h2 className="font-display text-4xl font-semibold">The multiplier is judgment.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Clarity", "I can turn a noisy problem into a sequence of buildable decisions."],
              [
                "Ownership",
                "I care about what happens after the pull request: adoption, uptime, and the next handoff.",
              ],
              [
                "Range",
                "I move comfortably from schema and controller to the screen that makes it make sense.",
              ],
              ["Curiosity", "I ask why until the constraint becomes visible—and then I use it."],
            ].map(([title, copy]) => (
              <div key={title} className="border-t hairline pt-4">
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && email.trim() && message.trim()) setSent(true);
  };

  return (
    <Layout>
      <PageIntro
        kicker="Contact / start here"
        title={
          <>
            Tell me what
            <br />
            <span className="text-[hsl(var(--primary))]">needs untangling.</span>
          </>
        }
        copy="Have a product to shape, a backend to steady, or a technical problem that has outgrown a quick fix? Send the rough version. That is usually the useful one."
      />

      <section className="page-wrap pb-28">
        <div className="grid gap-14 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel index="01">Direct line</SectionLabel>
            <a
              href="mailto:saurabhkumarycse@gmail.com"
              className="group inline-flex items-center gap-3 font-display text-xl transition-colors hover:text-[hsl(var(--primary))]"
              data-testid="link-contact-email"
            >
              saurabhkumarycse@gmail.com{" "}
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <div className="mt-12 border-t hairline pt-5">
              <div className="eyebrow">Availability</div>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                Currently open to thoughtful product and platform work. I usually reply within two working
                days.
              </p>
            </div>
          </div>

          <div className="card p-6 md:p-9">
            {sent ? (
              <div className="flex min-h-[390px] flex-col justify-center">
                <div className="flex h-12 w-12 items-center justify-center border border-[hsl(var(--primary))] text-[hsl(var(--primary))]">
                  <Check size={22} />
                </div>
                <h2 className="mt-7 font-display text-3xl font-semibold">Message received.</h2>
                <p className="mt-3 max-w-md leading-7 text-[hsl(var(--muted-foreground))]">
                  Thanks for the context. I’ll get back to you at{" "}
                  <span className="text-[hsl(var(--foreground))]">{email}</span> soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="button button-ghost mt-8 w-fit font-mono text-[11px] uppercase tracking-[.12em]"
                  data-testid="button-send-another"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
                      Name
                    </span>
                    <input
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="border-b hairline bg-transparent py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]"
                      placeholder="Your name"
                      data-testid="input-contact-name"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="border-b hairline bg-transparent py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]"
                      placeholder="you@company.com"
                      data-testid="input-contact-email"
                    />
                  </label>
                </div>
                <label className="grid gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
                    What are you working on?
                  </span>
                  <textarea
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={6}
                    className="resize-none border-b hairline bg-transparent py-3 text-sm leading-7 outline-none transition-colors focus:border-[hsl(var(--primary))]"
                    placeholder="A few sentences is plenty. Context, constraints, what is not working..."
                    data-testid="textarea-contact-message"
                  />
                </label>
                <div className="flex items-center justify-between gap-4">
                  <span className="hidden text-xs text-[hsl(var(--muted-foreground))] sm:block">
                    No sales funnel. Just a direct reply.
                  </span>
                  <button
                    type="submit"
                    className="button button-primary ml-auto font-mono text-[11px] uppercase tracking-[.12em]"
                    data-testid="button-submit-contact"
                  >
                    Send message <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Privacy() {
  return (
    <Layout>
      <PageIntro
        kicker="Privacy / plain language"
        title={
          <>
            A quiet, clear
            <br />
            <span className="text-[hsl(var(--primary))]">privacy policy.</span>
          </>
        }
        copy="This site is a portfolio, not a surveillance machine. Here is what happens when you use it."
      />
      <section className="page-wrap max-w-3xl pb-28">
        <div className="space-y-10 border-t hairline pt-10">
          {[
            [
              "What is collected",
              "The contact form only uses the name, email address, and message you choose to submit. This information is used to reply to your enquiry and is not sold.",
            ],
            [
              "Cookies and storage",
              "The site stores one small preference in your browser: whether you prefer the dark or light theme. No advertising cookies are used.",
            ],
            [
              "Third-party links",
              "Links to GitHub and LinkedIn take you to services with their own privacy policies. Check those policies when you visit them.",
            ],
            [
              "Questions",
              "For questions about this policy or a message you have sent, email saurabhkumarycse@gmail.com.",
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <h2 className="font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function CTA() {
  return (
    <section className="border-t hairline">
      <div className="page-wrap flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">Next / open channel</div>
          <h2 className="display-lg mt-5 max-w-2xl">
            Let’s make the
            <br />
            <span className="text-[hsl(var(--primary))]">complex part clear.</span>
          </h2>
        </div>
        <Link
          href="/contact"
          className="button button-primary w-fit font-mono text-xs uppercase tracking-[.12em]"
          data-testid="link-cta-contact"
        >
          Start a conversation <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <Layout>
      <div className="page-wrap py-40">
        <SectionLabel>404 / not found</SectionLabel>
        <h1 className="display-lg max-w-3xl">
          This route took
          <br />
          <span className="text-[hsl(var(--primary))]">a wrong turn.</span>
        </h1>
        <p className="body-lg mt-8 max-w-lg text-[hsl(var(--muted-foreground))]">
          Nothing lives at this address. The useful things are still in the archive.
        </p>
        <Link
          href="/"
          className="button button-primary mt-10 font-mono text-xs uppercase tracking-[.12em]"
          data-testid="link-404-home"
        >
          Return home <ArrowRight size={15} />
        </Link>
      </div>
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:slug" component={CaseStudy} />
      <Route path="/services" component={Services} />
      <Route path="/skills" component={Skills} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;