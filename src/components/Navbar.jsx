import { useState, useEffect } from "react";
import portfolioLogo from "../assets/portfoliologo.png";
import "../styles/styles.css";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = ["Home", "About", "Skills", "Projects", "Contact"];

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollTo("home")}>
  <img src={portfolioLogo} alt="Portfolio Logo" className="navbar-logo-img" />
</div>
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link}>
              <button
                className={`nav-link ${activeSection === link.toLowerCase() ? "active" : ""}`}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <button className="btn-contact" onClick={() => scrollTo("contact")}>
          Contact Me
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}