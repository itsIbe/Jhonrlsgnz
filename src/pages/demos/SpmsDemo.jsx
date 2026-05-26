import { useState, useEffect, useRef } from "react";
import dhvsuImage from "../../assets/dhvsu.jpg";
import dhvsuLogo from "../../assets/dhvsulogo.png";

const MAROON = "#5c0017";
const GOLD = "#feba29";

// ── Scroll Reveal Hook (AOS equivalent) ─────────────────────────────────────
function useScrollReveal({ animation = "fade-up", delay = 0, threshold = 0.15 } = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    const base = { transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` };
    const hidden = {
        "fade-up": { opacity: 0, transform: "translateY(40px)" },
        "fade-left": { opacity: 0, transform: "translateX(40px)" },
        "zoom-in": { opacity: 0, transform: "scale(0.88)" },
    }[animation] || { opacity: 0 };
    const shown = { opacity: 1, transform: "none" };

    return { ref, style: { ...base, ...(visible ? shown : hidden) } };
}

// Convenience wrapper component
function Reveal({ animation, delay, threshold, children, style: extraStyle, ...rest }) {
    const { ref, style } = useScrollReveal({ animation, delay, threshold });
    return (
        <div ref={ref} style={{ ...style, ...extraStyle }} {...rest}>
            {children}
        </div>
    );
}

// ── Header ───────────────────────────────────────────────────────────────────
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { label: "HOME", href: "#hero" },
        { label: "VISION/MISSION", href: "#about" },
        { label: "DEPARTMENTS", href: "#courses" },
    ];

    return (
        <header style={{
            background: MAROON, padding: "12px 0", borderBottom: `3px solid ${GOLD}`,
            fontFamily: "'Poppins', sans-serif",
        }}>
            <div style={{
                maxWidth: 1200, margin: "0 auto", padding: "0 20px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <a href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    {/* <div style={{
                        background: GOLD, color: MAROON, fontWeight: 700, fontSize: 20,
                        padding: "6px 14px", borderRadius: 6, letterSpacing: 1,
                        fontFamily: "'Poppins', sans-serif",
                    }}></div> */}
                    <span style={{ color: "#fff", marginLeft: 10, fontSize: 13, fontWeight: 500, letterSpacing: 1 }}>
                       DHVSU SPMS
                    </span>
                </a>

                <nav style={{ display: "flex", alignItems: "center" }} className="desktop-nav">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} style={{
                            color: GOLD, textDecoration: "none", padding: "10px 20px",
                            fontSize: 14, fontWeight: 500, transition: "color 0.3s", letterSpacing: 0.5,
                        }}
                            onMouseEnter={(e) => (e.target.style.color = "#fff")}
                            onMouseLeave={(e) => (e.target.style.color = GOLD)}
                        >{link.label}</a>
                    ))}
                </nav>

                <a href="#" style={{
                    background: GOLD, color: "#fff", padding: "8px 24px", borderRadius: 50,
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                    transition: "background 0.3s", whiteSpace: "nowrap",
                }}
                    onMouseEnter={(e) => (e.target.style.background = "#e0a520")}
                    onMouseLeave={(e) => (e.target.style.background = GOLD)}
                >LOGIN</a>

                <button onClick={() => setMenuOpen(!menuOpen)} style={{
                    display: "none", background: "none", border: "none",
                    color: "#fff", fontSize: 28, cursor: "pointer",
                }} className="mobile-toggle">
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {menuOpen && (
                <div style={{ background: "#fff", padding: "10px 0", borderTop: `3px solid ${GOLD}` }}>
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{
                            display: "block", padding: "12px 24px", color: MAROON,
                            textDecoration: "none", fontSize: 14, fontWeight: 500,
                        }}>{link.label}</a>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </header>
    );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
    const { ref, style: aoStyle } = useScrollReveal({ animation: "zoom-in", delay: 100, threshold: 0 });

    return (
        <section id="hero" style={{
            width: "100%", minHeight: 400,
            background: `linear-gradient(rgba(0,0,0,0.55), rgba(92,0,23,0.55)), url('${dhvsuImage}') center/cover no-repeat`,
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        }}>
            <div ref={ref} style={{ textAlign: "center", paddingTop: 40, ...aoStyle }}>
                <h1 style={{
                    margin: 0, fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700,
                    lineHeight: 1.2, color: "#fff", fontFamily: "'Poppins', sans-serif",
                    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}>
                    "Shaping Minds,<br />Advancing Technologies,
                </h1>
                <h1 style={{
                    margin: "4px 0 0", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700,
                    color: GOLD, fontFamily: "'Poppins', sans-serif",
                    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                }}>
                    and Creating Brighter Futures"
                </h1>
                <a href="#about" style={{
                    display: "inline-block", marginTop: 24, padding: "10px 30px",
                    border: "2px solid #fff", color: "#fff", borderRadius: 50, fontSize: 14,
                    fontWeight: 500, fontFamily: "'Raleway', sans-serif",
                    textDecoration: "none", letterSpacing: 1, transition: "all 0.4s",
                }}
                    onMouseEnter={(e) => { e.target.style.background = GOLD; e.target.style.borderColor = GOLD; }}
                    onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "#fff"; }}
                >Get Started</a>
            </div>
        </section>
    );
}

// ── About / Vision-Mission ───────────────────────────────────────────────────
function About() {
    return (
        <section id="about" style={{ padding: "60px 0", fontFamily: "'Open Sans', sans-serif" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>

                    {/* Logo — fade-left delay 100 */}
                    <Reveal animation="fade-left" delay={100} style={{ flex: "1 1 280px", textAlign: "center" }}>
                        <div style={{
                            width: 220, height: 220, borderRadius: "50%",
                            background: `linear-gradient(135deg, ${MAROON}, #8a0025)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto", boxShadow: `0 12px 40px rgba(92,0,23,0.35)`,
                        }}>
                            <img src={dhvsuLogo} alt="DHVSU logo" style={{
                                width: 210, height: 210, objectFit: "contain", borderRadius: "50%",
                            }} />
                        </div>
                    </Reveal>

                    {/* Content — fade-up */}
                    <Reveal animation="fade-up" style={{ flex: "1 1 340px" }}>
                        <h2 style={{
                            fontSize: 24, fontWeight: 700, color: "#37423b",
                            fontFamily: "'Raleway', sans-serif", marginBottom: 20,
                        }}>UNIVERSITY VISION AND MISSION</h2>

                        {[
                            {
                                title: "VISION",
                                text: "DHVSU envisions of becoming one of the lead universities in the ASEAN Region in producing globally competitive professionals.",
                            },
                            {
                                title: "MISSION",
                                text: "DHVSU commits itself to provide a conducive environment for the holistic development of students to become globally competitive professionals.",
                            },
                        ].map(({ title, text }) => (
                            <div key={title} style={{ marginBottom: 20 }}>
                                <h3 style={{
                                    fontSize: 13, fontWeight: 700, color: MAROON,
                                    fontFamily: "'Raleway', sans-serif", textTransform: "uppercase",
                                    letterSpacing: 1, borderLeft: `4px solid ${GOLD}`,
                                    paddingLeft: 12, marginBottom: 8,
                                }}>{title}</h3>
                                <p style={{ color: "#555", lineHeight: 1.6, fontSize: 13, margin: 0 }}>{text}</p>
                            </div>
                        ))}
                    </Reveal>

                </div>
            </div>
        </section>
    );
}

// ── Counts ───────────────────────────────────────────────────────────────────
function useCounter(target, duration = 1500) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let current = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(current);
        }, 16);
        return () => clearInterval(timer);
    }, [started, target, duration]);

    return { ref, count };
}

function StatCard({ end, label, delay }) {
    const { ref, count } = useCounter(end);
    const { ref: revealRef, style: aoStyle } = useScrollReveal({ animation: "fade-up", delay });

    return (
        <div ref={(el) => { ref.current = el; revealRef.current = el; }}
            style={{ textAlign: "center", padding: "0 20px", ...aoStyle }}>
            <span style={{
                fontSize: 40, fontWeight: 700, color: MAROON, display: "block",
                fontFamily: "'Poppins', sans-serif", lineHeight: 1,
            }}>{count.toLocaleString()}</span>
            <p style={{
                margin: "8px 0 0", fontSize: 13, fontWeight: 600,
                color: "#37423b", fontFamily: "'Raleway', sans-serif",
            }}>{label}</p>
        </div>
    );
}

function Counts() {
    const stats = [
        { end: 12322, label: "Students", delay: 0 },
        { end: 12, label: "Colleges", delay: 100 },
        { end: 42, label: "Courses", delay: 200 },
        { end: 7, label: "Campuses", delay: 300 },
    ];
    return (
        <section style={{ padding: "40px 0", background: "#f6f7f6" }}>
            <div style={{
                maxWidth: 1200, margin: "0 auto", padding: "0 20px",
                display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 32,
            }}>
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>
        </section>
    );
}

// ── Colleges ─────────────────────────────────────────────────────────────────
function CollegeCard({ abbr, name, color, index }) {
    const [hovered, setHovered] = useState(false);
    const { ref, style: aoStyle } = useScrollReveal({ animation: "zoom-in", delay: index * 150 });

    return (
        <div ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flex: "1 1 280px",
                border: `1px solid ${hovered ? GOLD : "#eef0ef"}`,
                borderRadius: 8, overflow: "hidden",
                transition: "all 0.3s",
                transform: aoStyle.transform !== "none"
                    ? aoStyle.transform
                    : hovered ? "translateY(-6px)" : "translateY(0)",
                opacity: aoStyle.opacity,
                boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
                background: "#fff",
                fontFamily: "'Open Sans', sans-serif",
                transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms, box-shadow 0.3s, border-color 0.3s`,
            }}
        >
            <div style={{
                height: 160,
                background: `linear-gradient(135deg, ${MAROON}, ${color})`,
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <span style={{
                    fontSize: 64, fontWeight: 800, color: "rgba(255,255,255,0.15)",
                    fontFamily: "'Poppins', sans-serif", letterSpacing: 2, userSelect: "none",
                }}>{abbr}</span>
            </div>
            <div style={{ padding: 20 }}>
                <span style={{
                    display: "inline-block", background: MAROON, color: "#fff",
                    fontSize: 12, fontWeight: 600, padding: "4px 12px",
                    borderRadius: 4, marginBottom: 10,
                }}>{abbr}</span>
                <h3 style={{
                    fontSize: 18, fontWeight: 700, fontFamily: "'Raleway', sans-serif",
                    margin: "0 0 10px", transition: "color 0.3s",
                    color: hovered ? GOLD : "#37423b",
                }}>{name}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, margin: 0 }}>
                    Committed to excellence in education, research, and community service through innovative programs.
                </p>
            </div>
        </div>
    );
}

function Colleges() {
    const colleges = [
        { abbr: "CEA", name: "College of Engineering and Architecture", color: "#b5451b" },
        { abbr: "CCS", name: "College of Computing Studies", color: "#1b4db5" },
        { abbr: "COE", name: "College of Education", color: "#1b8a45" },
    ];

    return (
        <section id="courses" style={{ padding: "60px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

                {/* Section title */}
                <Reveal animation="fade-up" style={{ paddingBottom: 40 }}>
                    <h2 style={{
                        fontSize: 13, fontWeight: 500, color: "#aaa", textTransform: "uppercase",
                        letterSpacing: 3, fontFamily: "'Poppins', sans-serif", marginBottom: 6,
                    }}>
                        Colleges{" "}
                        <span style={{
                            display: "inline-block", width: 100, height: 1,
                            background: GOLD, verticalAlign: "middle", marginLeft: 8,
                        }} />
                    </h2>
                    <p style={{
                        fontSize: 28, fontWeight: 700, color: "#37423b",
                        fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", margin: 0,
                    }}>Popular Colleges</p>
                </Reveal>

                {/* Cards */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
                    {colleges.map((c, i) => <CollegeCard key={c.abbr} {...c} index={i} />)}
                </div>

            </div>
        </section>
    );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer style={{ background: "#f9faf9", color: "#37423b", fontFamily: "'Open Sans', sans-serif", padding: "40px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "space-between" }}>

                    <Reveal animation="fade-up" delay={0} style={{ flex: "1 1 220px", minWidth: 180 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, fontFamily: "'Raleway', sans-serif", color: MAROON }}>
                            DHVSU SPMS
                        </h3>
                        <p style={{ fontSize: 12, color: "#777", lineHeight: 1.7, margin: 0 }}>
                            Don Honorio Ventura State University<br />
                            Bacolor, Pampanga, Philippines<br /><br />
                            <strong>Phone:</strong> (045) 436-5840<br />
                            <strong>Email:</strong> info@dhvsu.edu.ph
                        </p>
                    </Reveal>

                    <Reveal animation="fade-up" delay={100} style={{ flex: "1 1 160px", minWidth: 140 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: "#444", marginBottom: 12 }}>Useful Links</h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {["Home", "About Us", "Services"].map((l) => (
                                <li key={l} style={{ padding: "4px 0" }}>
                                    <a href="#" style={{ color: "#777", textDecoration: "none", fontSize: 12, transition: "color 0.3s" }}
                                        onMouseEnter={(e) => (e.target.style.color = GOLD)}
                                        onMouseLeave={(e) => (e.target.style.color = "#777")}
                                    >› {l}</a>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                </div>

                <div style={{
                    marginTop: 24, paddingTop: 16, borderTop: "1px solid #e0e5e2",
                    textAlign: "center", fontSize: 12, color: "#999",
                }}>
                    © {new Date().getFullYear()} DHVSU SPMS
                </div>
            </div>
        </footer>
    );
}

// ── Main App ──────────────────────────────────────────────────────────────────
function SpmsDemoContent() {
    return (
        <div style={{ fontFamily: "'Open Sans', sans-serif", color: "#444" }}>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
                rel="stylesheet"
            />
            <Header />
            <Hero />
            <About />
            <Counts />
            <Colleges />
            <Footer />
        </div>
    );
}

export default function SpmsDemo({ onClose, project }) {
    useEffect(() => {
        const prevBody = document.body.style.overflow;
        const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevBody;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label="SPMS demo">
            <button type="button" className="demo-modal-backdrop" aria-label="Close demo" onClick={onClose} />
            <div className="demo-shell">
                <header className="demo-topbar">
                    <div className="demo-topbar-left">
                        <button type="button" className="demo-back" onClick={onClose} aria-label="Back">
                            {"< Back"}
                        </button>
                        <div>
                            <p className="demo-kicker">Capstone Project</p>
                            <h2>Strategic Performance Management System</h2>
                        </div>
                    </div>
                    <div className="demo-topbar-right">
                        <span className="demo-close-hint">Press Esc or close</span>
                        <button type="button" className="demo-close" onClick={onClose}>Close</button>
                    </div>
                </header>

                <div className="mos-system" style={{ overflowY: "auto", height: "calc(100% - 80px)" }}>
                    <style>{`
                        .mos-system { scrollbar-width: none; -ms-overflow-style: none; }
                        .mos-system::-webkit-scrollbar { width: 0; height: 0; }
                    `}</style>
                    <SpmsDemoContent />
                </div>
            </div>
        </div>
    );
}
