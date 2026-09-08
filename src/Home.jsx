import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import {
  Plane, Menu, X, Globe2, ShieldCheck, Clock, Truck, Warehouse,
  PackageCheck, MapPin, ArrowRight, Search, Star,
  Ship, Award, Users, Target, Zap, TrendingUp, Headphones, Briefcase
} from "lucide-react";
import shippingImg from "./assets/shipping.jpg";
import shippingaImg from "./assets/shippinga.jpg";
import shippingwImg from "./assets/shippingw.jpg";
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import StatusBadge from "./components/StatusBadge";
import heroImg from "./assets/hero-cargo.jpg";




/* ---------- Small reusable: animated number counter ---------- */
function AnimatedCounter({ to, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- Static content for the marketing sections ---------- */
const NAV = [
  { href: "#top", label: "Home" },
  { href: "#track", label: "Track" },
  { href: "#features", label: "Services" },
  { href: "#global", label: "Global" },
  { href: "#team", label: "Team" },
  { href: "#testimonials", label: "About" },
  { href: "#contact", label: "Contact" },
];

const services = [
  { icon: Plane, title: "Air Freight", desc: "Priority air cargo to 200+ destinations with next-flight-out service.", tone: "from-sky-500 to-blue-600" },
  { icon: Globe2, title: "International Cargo", desc: "Door-to-door cross-border shipping across continents.", tone: "from-blue-600 to-indigo-700" },
  { icon: ShieldCheck, title: "Customs Clearance", desc: "In-house brokerage clears your cargo at every major hub.", tone: "from-indigo-600 to-violet-700" },
];

const reasons = [
  { icon: Clock, title: "Fast Delivery", desc: "Avg. 2.3 day door-to-door." },
  { icon: MapPin, title: "Real-Time Tracking", desc: "Live location + scan events on every leg." },
  { icon: Globe2, title: "Global Coverage", desc: "200+ countries, dozens of partners." },
  { icon: ShieldCheck, title: "Secure Shipping", desc: "Certified handling on every shipment." },
  { icon: PackageCheck, title: "Customs Cleared", desc: "Pre-cleared at major hubs, zero surprises." },
  { icon: Truck, title: "24/7 Support", desc: "Multilingual ops desk, always on." },
];

const companyHighlights = [
  { icon: Ship, title: "20+ Years", desc: "Of logistics excellence" },
  { icon: Award, title: "Industry Leader", desc: "Award-winning service" },
  { icon: Users, title: "500+ Team", desc: "Dedicated professionals" },
  { icon: Target, title: "99.9% Accuracy", desc: "Delivery precision" },
  { icon: Zap, title: "24/7 Operations", desc: "Always on the move" },
  { icon: TrendingUp, title: "1000+ Partners", desc: "Global network" },
];

const testimonials = [
  { name: "Sophie Laurent", role: "Operations Lead, Renault", quote: "Their customs team saved us a full day on every route. Tracking is the most accurate we've used." },
  { name: "Markus Weber", role: "Logistics Director, BASF", quote: "Reliability we can plan around. Same-day delivery is genuinely same-day." },
  { name: "Isabella Romano", role: "Founder, Romano Imports", quote: "A beautiful tracking experience for our customers and rock-solid SLAs for us." },
];

const teamMembers = [
  { 
    icon: Headphones, 
    title: "Operations Team", 
    desc: "Dedicated logistics experts managing your shipments from pickup to delivery.",
    img: image1
  },
  { 
    icon: Briefcase, 
    title: "Warehouse Crew", 
    desc: "Professional handlers ensuring your cargo is stored and moved with care.",
    img: image2
  },
  { 
    icon: Users, 
    title: "Support Staff", 
    desc: "Friendly team ready to assist with tracking, customs, and any questions.",
    img: image3
  },
];

export default function Home() {
  const [tnInput, setTnInput] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!tnInput.trim()) return;
    navigate(`/track/${encodeURIComponent(tnInput.trim())}`);
  }

  // Header background switches from transparent to solid after scrolling past the hero
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background">
      {/* ================= HEADER ================= */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all ${
          scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="#top" className="group flex items-center gap-2">
            <div className="gradient-primary shadow-glow flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
              <Plane className="h-5 w-5 -rotate-45 text-white" />
            </div>
            <span
              className={`font-display text-lg font-bold tracking-tight ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              Swift<span className="gradient-text">Delivery Cargo</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#track"
              className="gradient-primary shadow-glow rounded-md px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Track Now
            </a>
          </div>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className={`rounded-lg p-2 md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setNavOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section id="track" className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cargo aircraft loading at an airport at night"
            className="h-full w-full object-cover"
          />
          {/* Frosted tint — image reads through clearly instead of being washed out */}
          <div className="hero-glass-tint absolute inset-0" />
        </div>

        <div className="relative container mx-auto px-4 pb-20 pt-32 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="glass-rugged inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white">
              <span className="bg-cyan-accent h-2 w-2 animate-pulse rounded-full" />
              Real-time global shipment tracking
            </span>

            <h1 className="font-display mt-6 text-5xl font-bold leading-[1.05] text-white md:text-7xl">
              Track any shipment,
              <br />
              <span className="gradient-text bg-clip-text">anywhere in the world.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Packages, luggage, vehicles, or freight — enter your tracking number and see
              exactly where it is, right now.
            </p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onSubmit={handleSearch}
              className="glass-rugged shadow-elegant mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl p-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Enter tracking number"
                  value={tnInput}
                  onChange={(e) => setTnInput(e.target.value)}
                  className="h-14 w-full rounded-xl border border-white/20 bg-white/10 pl-12 pr-4 text-base text-white placeholder:text-white/50 outline-none focus:border-white/40"
                />
              </div>
              <button
                type="submit"
                disabled={!tnInput.trim()}
                className="bg-cyan-accent text-navy flex h-14 items-center justify-center gap-2 rounded-xl px-8 text-base font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Track Shipment
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.form>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#features"
                className="glass-rugged rounded-md px-6 py-3 text-sm font-semibold text-white"
              >
                Our Services
              </a>
              <a
                href="#contact"
                className="flex items-center gap-1 rounded-md px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Smooth blended fade into the section below — no hard line */}
        <div className="hero-fade-bottom pointer-events-none absolute bottom-0 left-0 right-0 h-56" />
      </section>

      

      {/* ================= STATS ================= */}
      <section className="relative z-10 container mx-auto -mt-12 px-4 md:px-6">
        <div className="glass-light shadow-elegant grid grid-cols-2 gap-4 rounded-2xl p-6 md:grid-cols-4 md:gap-6 md:p-8">
          {[
            { v: 2_400_000, s: "+", label: "Packages Delivered" },
            { v: 200, s: "+", label: "Countries Served" },
            { v: 18_400, s: "", label: "Active Shipments" },
            { v: 99, s: "%", label: "On-Time Delivery" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display gradient-text text-3xl font-bold md:text-5xl">
                <AnimatedCounter to={s.v} suffix={s.s} />
              </div>
              <div className="text-muted-foreground mt-1 text-xs font-medium md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="features" className="container mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">
            What we do
          </span>
          <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
            End-to-end logistics, handled.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Three integrated services, one accountable team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group hover:shadow-elegant border-border/50 bg-card h-full rounded-2xl border p-7 transition-all hover:-translate-y-1"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.tone} mb-5 text-white transition-transform group-hover:scale-110`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display mb-2 text-xl font-bold">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= COMPANY HIGHLIGHTS ================= */}
      <section className="border-y border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-24 md:px-6">
          <div className="mb-12 text-center">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
              More Than a Shipping Company
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              We're your trusted partner in global logistics, moving what matters most.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card hover:shadow-elegant rounded-2xl border border-border p-8 text-center transition-all hover:-translate-y-2"
            >
              <div className="gradient-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
                <Ship className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold">20+ Years</h3>
              <p className="text-muted-foreground mt-2">Of logistics excellence across the globe</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-card hover:shadow-elegant rounded-2xl border border-border p-8 text-center transition-all hover:-translate-y-2"
            >
              <div className="gradient-cyan mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold">500+ Team</h3>
              <p className="text-muted-foreground mt-2">Dedicated professionals worldwide</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-card hover:shadow-elegant rounded-2xl border border-border p-8 text-center transition-all hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold">99.9% Accuracy</h3>
              <p className="text-muted-foreground mt-2">Delivery precision you can count on</p>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {companyHighlights.slice(3).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
                className="glass-light rounded-2xl border border-border/50 p-6 text-center"
              >
                <item.icon className="text-accent mx-auto mb-3 h-6 w-6" />
                <h4 className="font-display font-semibold">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="gradient-primary relative mt-12 overflow-hidden rounded-3xl p-8 text-center text-white md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.3),transparent)]" />
            <div className="relative">
              <p className="text-lg font-medium text-white/90">
                "We don't just ship packages — we deliver peace of mind."
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
                <span className="h-1 w-1 rounded-full bg-white/50" />
                <span>Your cargo is our priority</span>
                <span className="h-1 w-1 rounded-full bg-white/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= GLOBAL PRESENCE ================= */}
      <section id="global" className="container mx-auto px-4 py-24 md:px-6">
        <div className="mb-14 text-center">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">
            Our Reach
          </span>
          <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
            Our Global Presence
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Swifttrack is a global logistics company that provides end-to-end solutions to meet the needs of customers with a fleet of trucks, planes, and ships.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Image 1 - Cargo Ships */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant transition-all hover:-translate-y-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={shippingImg}
                alt="Cargo ships at port"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Ship className="h-5 w-5 text-accent" />
                <h3 className="font-display font-semibold text-lg">Maritime Fleet</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Container ships operating across major shipping routes worldwide.
              </p>
            </div>
          </motion.div>

          {/* Image 2 - Planes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant transition-all hover:-translate-y-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={shippingaImg}
                alt="Cargo planes at airport"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Plane className="h-5 w-5 text-accent" />
                <h3 className="font-display font-semibold text-lg">Air Cargo</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Priority air freight reaching over 200 destinations globally.
              </p>
            </div>
          </motion.div>

          {/* Image 3 - Trucks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant transition-all hover:-translate-y-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={shippingwImg}
                alt="Delivery trucks on road"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="h-5 w-5 text-accent" />
                <h3 className="font-display font-semibold text-lg">Ground Transport</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Last-mile delivery and ground logistics for every shipment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR TEAM ================= */}
      <section id="team" className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 py-24 md:px-6">
          <div className="mb-14 text-center">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">
              Our People
            </span>
            <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
              The Team Behind SwiftTrack
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              Dedicated professionals working together to ensure your cargo arrives safely and on time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i + 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant transition-all hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="gradient-cyan flex h-8 w-8 items-center justify-center rounded-lg text-white">
                      <member.icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">{member.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="container mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">
            Why SwiftTrack
          </span>
          <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
            Built for people who can't afford to lose track.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="hover:shadow-card flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/40"
            >
              <div className="gradient-cyan flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white">
                <r.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold">{r.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 py-24 md:px-6">
          <div className="mb-14 text-center">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Trusted</span>
            <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
              What our customers say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card h-full rounded-2xl p-7"
              >
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="fill-warning text-warning h-4 w-4" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 border-t border-border pt-5">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-muted-foreground text-sm">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container mx-auto px-4 py-24 md:px-6">
        <div className="gradient-primary shadow-elegant relative overflow-hidden rounded-3xl p-12 text-center md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.25),transparent)]" />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Ready to send something?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Reach out to our team about rates, coverage, and service level agreements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="bg-cyan-accent text-navy rounded-md px-6 py-3 text-sm font-semibold hover:opacity-90"
              >
                Get a Quote
              </a>
              <a
                href="#track"
                className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Track a Shipment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="relative mt-24 bg-navy text-white/80">
        <div className="gradient-primary absolute inset-0 opacity-95" />
        <div className="relative container mx-auto px-4 py-16 md:px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <Plane className="h-5 w-5 -rotate-45 text-white" />
                </div>
                <span className="font-display text-lg font-bold text-white">SwiftDeliveryCargo</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Real-time tracking for packages, luggage, vehicles, and freight — anywhere in the world.
              </p>
            </div>

            <div>
              <h4 className="font-display mb-4 font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#testimonials" className="hover:text-cyan-accent transition-colors">About</a></li>
                <li><a href="#features" className="hover:text-cyan-accent transition-colors">Services</a></li>
                <li><a href="#track" className="hover:text-cyan-accent transition-colors">Track Shipment</a></li>
                <li><a href="#contact" className="hover:text-cyan-accent transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display mb-4 font-semibold text-white">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="text-cyan-accent mt-0.5 h-4 w-4" /> Word wide Globally
                </li>
                <li className="flex items-start gap-2">
                  <Plane className="text-cyan-accent mt-0.5 h-4 w-4 -rotate-45" /> +44 800 000 0000
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display mb-4 font-semibold text-white">Newsletter</h4>
              <p className="mb-3 text-sm text-white/70">Logistics insights, monthly.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.target.reset();
                  alert("Subscribed!");
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none"
                />
                <button
                  type="submit"
                  className="bg-cyan-accent text-navy rounded-md px-4 py-2 text-sm font-semibold hover:opacity-90"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/60 md:flex-row">
            <p>© {new Date().getFullYear()} Swift Delivery Cargo. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}