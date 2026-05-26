import Grainient from "./Grainient";
// import ProfileImage2 from "../assets/ProfileImage2.png";
import graduationpicnobg from "../assets/graduationpicnobg.png";

const floatingBadges = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
      </svg>
    ),
    label: "React Dev",
    position: { top: "8%", right: "-10%" },
    delay: "0s",
  },
  // {
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
  //       <rect x="3" y="3" width="18" height="18" rx="2" />
  //       <path d="M3 9h18M9 21V9" />
  //     </svg>
  //   ),
  //   label: "Dashboard",
  //   position: { top: "35%", right: "-18%" },
  //   delay: "0.4s",
  // },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    label: "UI/UX Design",
    position: { top: "62%", right: "-12%" },
    delay: "0.8s",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "Web Apps",
    position: { top: "18%", left: "-16%" },
    delay: "0.2s",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <ellipse cx="12" cy="7" rx="8" ry="3" />
        <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
        <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" />
      </svg>
    ),
    label: "SQL & Data",
    position: { top: "52%", left: "-18%" },
    delay: "0.6s",
  },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-dots"></div>

      <div className="hero-content">
        <p className="hero-tag">— Hello, world. I'm</p>
        <h1 className="hero-title">
          <span className="hero-name">Jhon Ruel Seguenza.</span>
        </h1>
        <p className="hero-desc">
          I design and develop modern dashboards and business tools
          <br />
          that help teams work smarter and faster.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">
            View My Work <span>→</span>
          </a>
          <a href="#" className="btn-secondary">
            Get in touch <span>→</span>
          </a>
        </div>
        <div className="hero-socials">
          <a href="#" className="social-icon" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="mailto:jhon.dev@email.com" className="social-icon" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── PROFILE IMAGE WITH FLOATING BADGES ── */}
      <div className="hero-image-area">
        <div className="hero-profile-wrap">
          {/* Glow ring behind image */}
          <div className="hero-profile-glow" />

          <img
            src={graduationpicnobg}
            // alt="Jhon Ruel Seguenza"
            className="hero-profile-img"
          />

          {/* Floating badges */}
          {floatingBadges.map((badge, i) => (
            <div
              key={i}
              className="hero-badge"
              style={{
                ...badge.position,
                animationDelay: badge.delay,
              }}
            >
              <div className="hero-badge-icon">{badge.icon}</div>
              <span className="hero-badge-label">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-background">
        <Grainient
          color1="#3B82F6"
          color2="#0d0043"
          color3="#0545ae"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
    </section>
  );
}