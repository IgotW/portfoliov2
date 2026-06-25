import { useEffect, useState } from "react";
import {
  about,
  achievements,
  certifications,
  experience,
  profile,
  projects,
  socialLinks,
  techStack,
} from "./data/portfolio";
import "./App.css";
import profilePhoto from "./assets/college_grad.jpg";
import profilePicture from "./assets/graduation_pic_enhanced.jpg";
import papaiaMockup from "./assets/papaia/papaia_mockup.png";
import brgyMockup from "./assets/brgyonestop/brgy-mockup.png";
import kulasImg from "./assets/kulas/kulas.png";
import {
  IconSun,
  IconMoon,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconBrandGithub,
  IconArrowRight,
} from "@tabler/icons-react";

const sampleSvg1 = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23E6F0FF'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='56' fill='%23003' font-family='Arial'>Sample UI 1</text></svg>`;
const sampleSvg2 = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23FFF4E6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='56' fill='%23033' font-family='Arial'>Sample UI 2</text></svg>`;
const sampleImg1 = `data:image/svg+xml;utf8,${encodeURIComponent(sampleSvg1)}`;
const sampleImg2 = `data:image/svg+xml;utf8,${encodeURIComponent(sampleSvg2)}`;

const papaiaGallery = Object.entries(
  import.meta.glob("./assets/papaia/*.{png,jpg,jpeg,svg}", { eager: true }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default);

const brgyGallery = Object.entries(
  import.meta.glob("./assets/brgyonestop/*.{png,jpg,jpeg,svg}", {
    eager: true,
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default);

const ccsyncGallery = Object.entries(
  import.meta.glob("./assets/ccsync/*.{png,jpg,jpeg,svg}", { eager: true }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default);

const loadoutGallery = Object.entries(
  import.meta.glob("./assets/loadout/*.{png,jpg,jpeg,svg}", { eager: true }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default);

const kulasGallery = Object.entries(
  import.meta.glob("./assets/kulas/*.{png,jpg,jpeg,svg}", { eager: true }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default);

const achievementProofImages = {
  "Best in Capstone - Social Relevance Award": new URL(
    "./assets/certificates/achievements/Best_in_Capstone.jpg",
    import.meta.url,
  ).href,
  "Capstone Paper Accepted in 12th International Conference on Education and Training Technologies (ICETT)":
    new URL("./assets/certificates/achievements/ICETT.png", import.meta.url)
      .href,
  "Innovate Cebu 2nd Runner-up": new URL(
    "./assets/certificates/achievements/InnovateCebu.jpg",
    import.meta.url,
  ).href,
};

const certificationProofImages = {
  "GoTeam Artificial Intelligence for Communities Workshop": new URL(
    "./assets/certificates/certifications/goteam-ai.png",
    import.meta.url,
  ).href,
  // "Introduction to Cybersecurity": new URL(
  //   "./assets/certificates/certifications/cybersecurity.jpg",
  //   import.meta.url,
  // ).href,
  "ASEAN AI Class": new URL(
    "./assets/certificates/certifications/asean-ai.png",
    import.meta.url,
  ).href,
  "CCNA: Switching, Routing, and Wireless Essentials": new URL(
    "./assets/certificates/certifications/ccna-switch_routing_wireless.jpg",
    import.meta.url,
  ).href,
  "CCNA7: Introduction to Cybersecurity": new URL(
    "./assets/certificates/certifications/cybersecurity.jpg",
    import.meta.url,
  ).href,
};

const projectGalleryMap = {
  Papaia: papaiaGallery,
  BrgyOneStop: brgyGallery,
  CCSync: ccsyncGallery,
  LoadOut: loadoutGallery,
  KulasDesign: kulasGallery,
};

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <IconSun
        size={16}
        className={`theme-toggle__icon ${!darkMode ? "is-active" : ""}`}
        aria-hidden="true"
      />
      <span className={`theme-toggle__track ${darkMode ? "is-dark" : ""}`}>
        <span className="theme-toggle__thumb" />
      </span>
      <IconMoon
        size={16}
        className={`theme-toggle__icon ${darkMode ? "is-active" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}

function Card({ children, className = "" }) {
  return <article className={`card ${className}`.trim()}>{children}</article>;
}

function TagList({ items }) {
  return (
    <div className="tag-list">
      {items.map((item) => (
        <span key={item} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
}

function ListSection({ items }) {
  return (
    <ul className="info-list">
      {items.map((item) => (
        <li key={item.title} className="info-list__item">
          <span className="info-list__content">
            <span className="info-list__title">{item.title}</span>
            {item.company && (
              <span className="info-list__subtitle">{item.company}</span>
            )}
          </span>
          <span className="date-badge">{item.period || item.year}</span>
        </li>
      ))}
    </ul>
  );
}

function ProofListSection({ items, onProofClick }) {
  return (
    <ul className="info-list">
      {items.map((item) => (
        <li key={item.title}>
          <button
            type="button"
            className="info-list__item info-list__item--clickable"
            onClick={() => onProofClick(item)}
            aria-label={`View proof for ${item.title}`}
          >
            <span className="info-list__content">
              <span className="info-list__title">{item.title}</span>
            </span>
            <span className="date-badge">{item.year}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function ProofModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="proof-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="proof-modal-title"
      onClick={onClose}
    >
      <div
        className="proof-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="proof-modal__close"
          onClick={onClose}
          aria-label="Close proof viewer"
        >
          <IconX size={20} aria-hidden="true" />
        </button>
        <img
          src={item.proof}
          alt={`Proof for ${item.title}`}
          className="proof-modal__image"
        />
        <div className="proof-modal__footer">
          <h3 id="proof-modal-title" className="proof-modal__title">
            {item.title}
          </h3>
          <span className="date-badge">{item.year}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Redesigned Project Modal ────────────────────────────────────────────────
function ProjectModal({
  project,
  images,
  index,
  onClose,
  onPrev,
  onNext,
  setIndex,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (!project) return null;

  const total = images.length;

  return (
    <div
      className="pm-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pm-title"
      onClick={onClose}
    >
      <div className="pm" onClick={(e) => e.stopPropagation()}>
        {/* ── Carousel ── */}
        <div className="pm-carousel">
          {/* Close */}
          <button
            type="button"
            className="pm-close"
            onClick={onClose}
            aria-label="Close project viewer"
          >
            <IconX size={16} aria-hidden="true" />
          </button>

          {/* Counter */}
          {total > 1 && (
            <span className="pm-counter">
              {index + 1} / {total}
            </span>
          )}

          {/* Image */}
          <img
            key={index}
            src={images[index]}
            alt={`${project.title} screenshot ${index + 1}`}
            className="pm-image"
          />

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                className="pm-arrow pm-arrow--left"
                onClick={onPrev}
                aria-label="Previous image"
              >
                <IconChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="pm-arrow pm-arrow--right"
                onClick={onNext}
                aria-label="Next image"
              >
                <IconChevronRight size={18} aria-hidden="true" />
              </button>

              {/* Dot indicators */}
              <div className="pm-dots" role="tablist">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to image ${i + 1}`}
                    className={`pm-dot ${i === index ? "pm-dot--active" : ""}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Body ── */}
        <div className="pm-body">
          {/* Tech tags */}
          {project.tech && project.tech.length > 0 && (
            <div className="pm-tags">
              {project.tech.map((t) => (
                <span key={t} className="pm-tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          <h2 id="pm-title" className="pm-title">
            {project.title}
          </h2>
          <p className="pm-desc">{project.description}</p>

          {/* Footer: source link + thumbnail strip */}
          <div className="pm-footer">
            {project.source && (
              <a
                href={project.source}
                className="pm-link"
                target="_blank"
                rel="noreferrer"
              >
                <IconBrandGithub size={15} aria-hidden="true" />
                Source code
                <IconArrowRight size={14} aria-hidden="true" />
              </a>
            )}

            {total > 1 && (
              <div className="pm-thumbs">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`pm-thumb ${i === index ? "pm-thumb--active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${project.title} thumbnail ${i + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [proofItem, setProofItem] = useState(null);
  const [projectModal, setProjectModal] = useState(null);
  const [projectModalIndex, setProjectModalIndex] = useState(0);
  const [projectModalImages, setProjectModalImages] = useState([]);

  const projectPrev = () => {
    setProjectModalIndex((i) => {
      if (!projectModalImages || projectModalImages.length === 0) return 0;
      return (i - 1 + projectModalImages.length) % projectModalImages.length;
    });
  };

  const projectNext = () => {
    setProjectModalIndex((i) => {
      if (!projectModalImages || projectModalImages.length === 0) return 0;
      return (i + 1) % projectModalImages.length;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const projectPreviewImages = {
    Papaia: papaiaMockup,
    BrgyOneStop: brgyMockup,
    KulasDesign: kulasImg,
    CCSync: projectGalleryMap.CCSync?.[0],
    LoadOut: projectGalleryMap.LoadOut?.[0],
  };

  const handleProofClick = (item) => {
    const proof =
      achievementProofImages[item.title] ||
      certificationProofImages[item.title] ||
      item.proof;
    setProofItem({ ...item, proof });
  };

  return (
    <div className="portfolio">
      <main className="portfolio__layout">
        <Card className="header-card">
          <DarkModeToggle
            darkMode={darkMode}
            onToggle={() => setDarkMode((prev) => !prev)}
          />

          <div className="header-card__profile">
            <img
              src={profilePicture}
              alt={profile.name}
              className="header-card__photo"
            />
            <div className="header-card__info">
              <h1 className="header-card__name">{profile.name}</h1>
              <p className="header-card__location">
                <span className="location-pin" aria-hidden="true">
                  📍
                </span>
                {profile.location}
              </p>
              <span className="role-badge">{profile.role}</span>
              <div className="header-card__actions">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn--primary"
                >
                  Send Email
                </a>
                <a href="#projects" className="btn btn--outline">
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </Card>

        <div className="portfolio__main">
          <div className="portfolio__left">
            <Card>
              <h2 className="card__title">About</h2>
              <div className="about-text">
                {about.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="card__title">Technology Stack</h2>
              <div className="tech-stack">
                {Object.entries(techStack).map(([category, items]) => (
                  <div key={category} className="tech-stack__group">
                    <h3 className="tech-stack__category">{category}</h3>
                    <TagList items={items} />
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 id="projects" className="card__title">
                Featured Projects
              </h2>
              <div className="projects-grid">
                {projects.map((project) => (
                  <article key={project.title} className="project-card">
                    <div
                      className="project-card__btn"
                      onClick={() => {
                        const imgs =
                          projectGalleryMap[project.title]?.length > 0
                            ? projectGalleryMap[project.title]
                            : [
                                projectPreviewImages[project.title] ||
                                  project.image,
                              ];
                        setProjectModal(project);
                        setProjectModalIndex(0);
                        setProjectModalImages(imgs);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          const imgs =
                            projectGalleryMap[project.title]?.length > 0
                              ? projectGalleryMap[project.title]
                              : [
                                  projectPreviewImages[project.title] ||
                                    project.image,
                                ];
                          setProjectModal(project);
                          setProjectModalIndex(0);
                          setProjectModalImages(imgs);
                        }
                      }}
                      aria-label={`Open ${project.title} gallery`}
                    >
                      <div className="project-card__image-wrap">
                        <img
                          src={
                            projectPreviewImages[project.title] || project.image
                          }
                          alt={`${project.title} preview`}
                          className="project-card__image"
                        />
                      </div>
                      <div className="project-card__body">
                        <h3 className="project-card__title">{project.title}</h3>
                        <p className="project-card__description">
                          {project.description}
                        </p>
                        <div className="project-card__tech">
                          <span className="project-card__tech-label">
                            Tech Stack:
                          </span>
                          <TagList items={project.tech} />
                        </div>
                        <a
                          href={project.source}
                          className="project-card__link"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Source Code
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Card>
          </div>

          <aside className="portfolio__right">
            <Card>
              <h2 className="card__title">Experience</h2>
              <ListSection items={experience} />
            </Card>

            <Card>
              <h2 className="card__title">Achievements</h2>
              <ProofListSection
                items={achievements}
                onProofClick={handleProofClick}
              />
            </Card>

            <Card>
              <h2 className="card__title">Certifications</h2>
              <ProofListSection
                items={certifications}
                onProofClick={handleProofClick}
              />
            </Card>

            <Card>
              <h2 className="card__title">Social</h2>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </main>

      <ProofModal item={proofItem} onClose={() => setProofItem(null)} />
      <ProjectModal
        project={projectModal}
        images={projectModalImages}
        index={projectModalIndex}
        onClose={() => setProjectModal(null)}
        onPrev={projectPrev}
        onNext={projectNext}
        setIndex={setProjectModalIndex}
      />
    </div>
  );
}

export default App;
