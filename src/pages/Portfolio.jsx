import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import LogoLoop from "../components/LogoLoop";
import aboutImg from "../assets/about.jpg";
import MunicipalOrdinanceDemo from "./demos/MunicipalOrdinanceDemo";
import TruckTrailerDriverDemo from "./demos/TruckTrailerDriverDemo";
import SalesManagementSystem from "./demos/SalesManagementSystem";
import SpmsDemo from "./demos/SpmsDemo";
import FlipSevenScoreBoard from "./demos/FlipSevenScoreBoard";
import municipalOrdinance from "../assets/municipalOrdinance.png";
import SalesManagementSystemImage from "../assets/salesManagementSystem.png";
import spms from "../assets/spms.png";
import flip7 from "../assets/flip7.png";

// Use Vite env vars so keys are easier to manage across environments.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const skills = [
  {
    name: "React",
    level: 5,
    color: "#61DAFB",
    icon: (
      <svg viewBox="0 0 24 24" fill="#61DAFB">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    level: 5,
    color: "#F7DF1E",
    icon: (
      <svg viewBox="0 0 24 24" fill="#F7DF1E">
        <rect width="24" height="24" rx="2" fill="#F7DF1E" />
        <path d="M7 18.5c.5.8 1.2 1.4 2.4 1.4 1.4 0 2.2-.7 2.2-1.9V12H9.8v5.9c0 .5-.2.8-.7.8-.5 0-.8-.3-1.1-.7L7 18.5zm6.6-.2c.6 1 1.5 1.6 2.9 1.6 1.5 0 2.6-.8 2.6-2.1 0-1.2-.7-1.8-2-2.3l-.6-.2c-.7-.3-.9-.5-.9-.9 0-.4.3-.6.7-.6.5 0 .8.2 1 .7l1.4-.9c-.6-1-1.4-1.4-2.4-1.4-1.4 0-2.4.9-2.4 2.2 0 1.1.7 1.8 1.9 2.2l.6.2c.7.3 1 .5 1 1s-.4.8-.9.8c-.7 0-1.1-.4-1.4-.9l-1.5.6z" fill="#333" />
      </svg>
    ),
  },
  {
    name: "HTML5",
    level: 5,
    color: "#E34F26",
    icon: (
      <svg viewBox="0 0 24 24" fill="#E34F26">
        <path d="M4.136 18.948L2.5 2.5h19l-1.638 16.444L12 21.5l-7.864-2.552z" />
        <path d="M12 19.98l6.35-1.76 1.4-15.72H12v17.48z" fill="#EF652A" />
        <path d="M12 10.5H8.9l-.21-2.38H12V5.88H6.27l.56 6.25H12V10.5zm0 5.82l-.01.003-3.16-.853-.202-2.266H6.34l.396 4.44 5.26 1.46.004-.001V16.32z" fill="#fff" />
        <path d="M12 10.5v2.13h2.89l-.272 3.04-2.618.706v2.223l5.27-1.46.039-.43.6-6.72.063-.7H12zm0-4.62v2.22h5.56l.046-.52.105-1.17.055-.53H12z" fill="#EBEBEB" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    level: 5,
    color: "#1572B6",
    icon: (
      <svg viewBox="0 0 24 24" fill="#1572B6">
        <path d="M4.136 18.948L2.5 2.5h19l-1.638 16.444L12 21.5l-7.864-2.552z" />
        <path d="M12 19.98l6.35-1.76 1.4-15.72H12v17.48z" fill="#33A9DC" />
        <path d="M12 8.1H8.7l.22 2.4H12V8.1zm0-2.22H6.27l.22 2.22H12V5.88zm0 8.5l-2.63-.71-.17-1.96H6.86l.35 3.89 4.79 1.33V14.38zm0-2.5h-2.6l-.09-1.28H12v-2.1H7.7l.58 6.63L12 16.24v-4.36z" fill="#fff" />
        <path d="M12 8.1v2.4h3.08l-.29 3.12-2.79.76v2.27l4.79-1.33.04-.4.6-6.82H12zm0-2.22v2.22h6.08l.05-.52.11-1.17.06-.53H12z" fill="#EBEBEB" />
      </svg>
    ),
  },
  {
    name: "PowerApps",
    level: 4,
    color: "#742774",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#742774" />
        <path d="M12 3L4 8v8l8 5 8-5V8L12 3z" fill="url(#paGrad)" />
        <defs>
          <linearGradient id="paGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C663C8" />
            <stop offset="1" stopColor="#6B1F6B" />
          </linearGradient>
        </defs>
        <path d="M12 7l-5 3v4l5 3 5-3v-4L12 7z" fill="rgba(255,255,255,0.15)" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "SQL",
    level: 4,
    color: "#4479A1",
    icon: (
      <svg viewBox="0 0 24 24" fill="#4479A1">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#4479A1" />
        <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" fill="#5B8DB8" />
        <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" fill="#4479A1" />
        <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" fill="#5B8DB8" />
      </svg>
    ),
  },
  // ── NEW DESIGN TOOLS ──
  {
    name: "Photoshop",
    level: 4,
    color: "#31A8FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#001E36" />
        <text x="3" y="17" fontSize="10" fontWeight="bold" fill="#31A8FF" fontFamily="Arial, sans-serif">Ps</text>
      </svg>
    ),
  },
  {
    name: "Illustrator",
    level: 4,
    color: "#FF9A00",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#330000" />
        <text x="3" y="17" fontSize="10" fontWeight="bold" fill="#FF9A00" fontFamily="Arial, sans-serif">Ai</text>
      </svg>
    ),
  },
  {
    name: "Figma",
    level: 4,
    color: "#F24E1E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="8" y="2" width="8" height="6" rx="3" fill="#F24E1E" />
        <rect x="8" y="9" width="8" height="6" rx="3" fill="#FF7262" />
        <rect x="8" y="16" width="8" height="6" rx="3" fill="#0ACF83" />
        <rect x="2" y="2" width="6" height="6" rx="3" fill="#A259FF" />
        <circle cx="5" cy="12" r="3" fill="#1ABCFE" />
      </svg>
    ),
  },
];
const skillLogos = skills.map(skill => ({
  node: skill.icon,
  title: skill.name,
  href: "#", // or a relevant URL if available
}));
const projects = [
  {
    title: "Truck, Trailer, and Driver Management System",
    desc: "A system for managing trucks, trailers, and drivers with counting capacity dashboards.",
    extraDesc: "A truck, trailer, and driver management system enables fleet managers to track vehicle availability, assign drivers, monitor maintenance schedules, and optimize routing. It includes inventory tracking, capacity planning, driver assignments, and dashboard analytics to streamline operations and ensure efficient transportation management.",
    image: null,
    color: "#1e3a5f",
    techStack: ["React", "JavaScript", "CSS", "Fleet Tracking", "Capacity Dashboards"],
    demo: "#",
    demoType: "truck-trailer-driver",
  },
  {
    title: "Sales Management System",
    desc: "A system for managing sales, tracking performance, and generating reports for ASM, Forecast, DCT, SFT, and EXD.",
    extraDesc: "A Sales Management System centralizes sales tracking, performance monitoring, and reporting for regional teams. It supports lead tracking, revenue forecasting, sales order management, and dashboard insights to improve decision making and boost sales productivity.",
    image: SalesManagementSystemImage,
    color: "#1a2e4a",
    techStack: ["Google Sheets", "Google Apps Script", "Google Gspread API", "Sheets API", "Pivot Tables"],
    demo: "#",
    demoType: "sales-management",
  },
  {
    title: "Strategic Performance Management System",
    desc: "A system for managing and tracking strategic performance indicators.",
    extraDesc: "A Strategic Performance Management System helps organizations track KPIs, align goals, and monitor progress across departments. It provides dashboards for target setting, scorecards, analytics, and reporting to support better strategy execution and business performance.",
    image: spms,
    color: "#1e3040",
    techStack: ["React", "Charting", "KPI Tracking", "Dashboard UX"],
    demo: "#",
    demoType: "spms",
  },
  {
    title: "Municipal Ordinance",
    desc: "A system for managing and tracking municipal ordinances and regulations.",
    extraDesc: "A Municipal Ordinance System is a web-based application designed to help Local Government Units (LGUs) manage, monitor, and organize municipal ordinances and regulations digitally. The system allows users to create, review, approve, track, and archive ordinances efficiently. It includes features such as dashboard analytics, ordinance management, barangay tracking, approval workflows, reporting, notifications, and user role management. The goal of the system is to improve efficiency, reduce paperwork, enhance transparency, and simplify the monitoring of local laws and regulations within municipalities and barangays.",
    image: municipalOrdinance,
    color: "#1e3040",
    techStack: ["React", "JavaScript", "CSS", "Responsive UI"],
    demo: null,
    demoType: "municipal-ordinance",
  },
  {
    title: "Flip Seven ScoreBoard",
    desc: "A card-based scoreboard for tracking scores in a game or competition.",
    extraDesc: "A card-based scoreboard system designed for tracking scores in games or competitions. It features a visually engaging interface where players can flip cards to reveal their scores, making it ideal for interactive gaming events, trivia nights, or any competitive setting. The system allows for easy score updates, player management, and can be customized with different themes and styles to enhance the user experience.",
    image: flip7,
    color: "#1e3040",
    techStack: ["React", "JavaScript", "CSS", "Responsive UI"],
    demo: "null",
    demoType: "FlipSevenScoreBoard",
  },
];
function ProjectCard({ project, onOpenPreview }) {
  return (
    <div className="project-card">
      <div className="project-img" style={{ background: project.color }}>
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-img-inner" />
        ) : (
          <div className="project-mockup">
            <div className="mockup-bar"></div>
            <div className="mockup-row"></div>
            <div className="mockup-row short"></div>
            <div className="mockup-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="mockup-cell"></div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-links">
          {(["municipal-ordinance", "truck-trailer-driver", "sales-management", "spms", "FlipSevenScoreBoard"].includes(project.demoType)) ? (
            <button type="button" className="link-demo link-demo-button" onClick={() => onOpenPreview(project)}>
              View <span>↗</span>
            </button>
          ) : project.demo ? (
            <a href={project.demo} className="link-demo" target="_blank" rel="noreferrer">
              Live Demo <span>↗</span>
            </a>
          ) : (
            <span className="link-demo link-demo-disabled">Demo coming soon</span>
          )}
        </div>
      </div>
    </div>
  );
}
export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const previousBodyOverflow = useRef("");
  const previousHtmlOverflow = useRef("");

  useEffect(() => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn("EmailJS config is missing. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.");
    }
  }, []);

  useEffect(() => {
    if (!previewProject) return;

    previousBodyOverflow.current = document.body.style.overflow;
    previousHtmlOverflow.current = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow.current;
      document.documentElement.style.overflow = previousHtmlOverflow.current;
    };
  }, [previewProject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      alert("Email form is not configured yet. Please set EmailJS environment variables.");
      setSending(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_email: "seguenzajhonruel02@gmail.com",
          reply_to: formData.email,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      alert("✅ Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const status = error?.status ? ` (status: ${error.status})` : "";
      const reason = error?.text || error?.message || "Unknown error";
      alert(`❌ Failed to send message${status}: ${reason}`);
      console.error("EmailJS error:", error);
    } finally {
      setSending(false);
    }
  };

  const handleViewProject = (project) => {
    setPreviewProject(project);
  };

  const handleStartDemo = () => {
    if (previewProject) {
      setActiveDemo(previewProject);
      setPreviewProject(null);
    }
  };

  const closePreview = () => {
    setPreviewProject(null);
  };

  const ActiveDemoComponent = activeDemo
    ? {
      "municipal-ordinance": MunicipalOrdinanceDemo,
      "truck-trailer-driver": TruckTrailerDriverDemo,
      "sales-management": SalesManagementSystem,
      "spms": SpmsDemo,
      "FlipSevenScoreBoard": FlipSevenScoreBoard,
    }[activeDemo.demoType]
    : null;

  return (
    <main>
      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-img-wrap">
            <img src={aboutImg} alt="About Jhon" className="about-img" />
          </div>
          <div className="about-text">
            <p className="section-tag">ABOUT ME</p>
            <h2 className="about-heading">Building clean, scalable, and modern web apps..</h2>
            <p className="about-desc">
              Hi, I’m Jhon — a Frontend Developer and Graphic Designer based in the Philippines, passionate about creating modern, responsive, and user-focused digital experiences.
              I specialize in building web applications, dashboards, and enterprise-style systems using technologies such as React, TypeScript, JavaScript, CSS, and modern UI/UX practices.
              <br /><br />
              Over the years, I’ve worked on developing responsive admin dashboards, sales monitoring systems, user management modules, custom modals, advanced table settings, and interactive
              interfaces that focus on both performance and usability. I enjoy transforming complex workflows into clean, intuitive, and visually appealing designs while maintaining scalable
              and maintainable frontend architecture.
              <br /><br />
              Aside from development, I also have experience in graphic design, branding, packaging design, and UI/UX design, working with clients from industries such as fashion, food,
              and technology. My design approach combines creativity, functionality, and attention to detail to create seamless user experiences.
              <br /><br />
              I’m continuously learning new technologies, experimenting with modern design trends, and improving my skills in frontend engineering, responsive design, animations,
              glassmorphism UI, enterprise theming, and user experience optimization to keep my work innovative and impactful.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-icon">💼</span>
                <div>
                  <strong>Experience</strong>
                  <span>2+ Years</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <span>South Triangle, Quezon City, Philippines</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon avail">●</span>
                <div>
                  <strong>Availability</strong>
                  <span className="open">Open to work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── SKILLS ── */}
      <section id="skills" className="skills-section">
        <p className="section-tag centered">MY SKILLS</p>
        <h2 className="section-heading centered">Technologies I work with</h2>
        <div className="skills-loop-wrapper">
          <LogoLoop
            logos={skillLogos}
            speed={50}
            direction="left"
            logoHeight={40}
            gap={40}
            scaleOnHover
            fadeOut
            fadeOutColor="#0b0b0b"
            ariaLabel="Skills and technologies"
          />
        </div>
      </section>
      {/* ── PROJECTS ── */}
      <section id="projects" className="projects-section">
        <p className="section-tag centered">MY PROJECTS</p>
        <h2 className="section-heading centered">Some of my recent work</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} onOpenPreview={handleViewProject} />
          ))}
        </div>
      </section>
      {previewProject && (
        <div className="project-preview-modal">
          <div className="project-preview-backdrop" onClick={closePreview} />
          <div className="project-preview-card">
            <button className="preview-close-button" onClick={closePreview} aria-label="Close preview">
              ×
            </button>
            <div className="project-preview-body">
              <div className="preview-image-wrap">
                {previewProject.image ? (
                  <img src={previewProject.image} alt={previewProject.title} />
                ) : (
                  <div className="preview-placeholder">Demo Preview</div>
                )}
              </div>
              <div className="preview-info">
                <p className="section-tag">PROJECT PREVIEW</p>
                <h2>{previewProject.title}</h2>
                {previewProject.extraDesc ? (
                  <p className="preview-extra-desc">{previewProject.extraDesc}</p>
                ) : (
                  <p>{previewProject.desc}</p>
                )}
                {previewProject.techStack?.length > 0 && (
                  <div className="preview-tech-stack">
                    <p className="section-tag">Tech Stack</p>
                    <div className="preview-stack-list">
                      {previewProject.techStack.map((tag) => (
                        <span key={tag} className="preview-stack-item">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="preview-actions">
                  <button type="button" className="link-demo link-demo-button" onClick={handleStartDemo}>
                    <span role="img" aria-label="eye">👁</span> Live Demo
                  </button>
                  <button type="button" className="preview-secondary" onClick={closePreview}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {ActiveDemoComponent && <ActiveDemoComponent onClose={() => setActiveDemo(null)} project={activeDemo} />}
      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <p className="section-tag">CONTACT ME</p>
            <h2>Let's work together!</h2>
            <p>I'm currently open to new opportunities. Feel free to reach out to me.</p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <span>seguenzajhonruel02@gmail.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+63 961 564 3632</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Philippines</span>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn-send" disabled={sending}>
              {sending ? "Sending..." : "Send Message"} <span>✈</span>
            </button>
          </form>
        </div>
      </section>
      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>© 2026 Jhonrlsgnz. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/jhon-ruel-seguenza" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" aria-label="Scroll to top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <polyline points="16 12 12 8 8 12" />
              <line x1="12" y1="16" x2="12" y2="8" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}

