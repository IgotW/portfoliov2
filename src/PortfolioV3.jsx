import { useEffect, useState } from "react";
import {
  IconArrowDown,
  IconArrowUpRight,
  IconAward,
  IconBrandCss3,
  IconBrandFigma,
  IconBrandFirebase,
  IconBrandGit,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandKotlin,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandNodejs,
  IconBrandReact,
  IconCertificate,
  IconCode,
  IconMail,
  IconX,
  IconBrandWordpress,
  IconBrandBootstrap,
  IconCoffee,
  IconBrandAsana,
  IconBrandJira,
} from "@tabler/icons-react";
import {
  achievements,
  certifications,
  profile,
  projects,
  socialLinks,
  techStack,
} from "./data/portfolio";
import profilePicture from "./assets/graduation_pic_enhanced.jpg";
import papaiaMockup from "./assets/papaia/papaia_mockup.png";
import kulasCover from "./assets/kulas/kulas_section1.png";
import loadoutMockup from "./assets/loadout/Aloadout_mockup.png";
import ccsyncCover from "./assets/ccsync/AALanding_Page.png";
import brgyMockup from "./assets/brgyonestop/0brgy-mockup.png";
import innovateCebuProof from "./assets/certificates/achievements/InnovateCebu.jpg";
import icettProof from "./assets/certificates/achievements/ICETT.png";
import capstoneProof from "./assets/certificates/achievements/Best_in_Capstone.jpg";
import goTeamProof from "./assets/certificates/certifications/goteam-ai.png";
import aseanProof from "./assets/certificates/certifications/asean-ai.png";
import switchingProof from "./assets/certificates/certifications/ccna-switch_routing_wireless.jpg";
import cybersecurityProof from "./assets/certificates/certifications/cybersecurity.jpg";
import introCcnaProof from "./assets/certificates/certifications/ccna-intro.jpg";
import PortfolioChat from "./PortfolioChat";
import "./PortfolioV3.css";

const projectImages = {
  Papaia: papaiaMockup,
  "Kulas Design": kulasCover,
  LoadOut: loadoutMockup,
  CCSync: ccsyncCover,
  BrgyOneStop: brgyMockup,
};
const designWorks = Object.entries(
  import.meta.glob("./assets/design/*.{png,jpg,jpeg,webp}", { eager: true }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, module]) => ({
    src: module.default,
    title: path
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "")
      .replaceAll("-", " "),
    collection: path.includes("CoBabble")
      ? "CoBabble / Mobile app"
      : path.includes("ApartWent")
        ? "ApartWent / Responsive web"
        : "Ford / Web concept",
    viewport:
      path.includes("Mobile") || path.includes("CoBabble")
        ? "mobile"
        : "desktop",
  }));
const toolVisuals = {
  Kotlin: [IconBrandKotlin, "#a97bff"],
  Javascript: [IconBrandJavascript, "#f7df1e"],
  React: [IconBrandReact, "#61dafb"],
  HTML: [IconBrandHtml5, "#e44d26"],
  CSS: [IconBrandCss3, "#264de4"],
  "Node.js": [IconBrandNodejs, "#8cc84b"],
  Firebase: [IconBrandFirebase, "#ffb400"],
  MongoDB: [IconBrandMongodb, "#47a248"],
  MySQL: [IconBrandMysql, "#4d8cbf"],
  Git: [IconBrandGit, "#f05032"],
  Github: [IconBrandGithub, "#24292f"],
  Figma: [IconBrandFigma, "#f24e1e"],
  WordPress: [IconBrandWordpress, "#21759b"],
  Bootstrap: [IconBrandBootstrap, "#563d7c"],
  Java: [IconCoffee, "#5382a1"],
  Asana: [IconBrandAsana, "#273347"],
  Jira: [IconBrandJira, "#0052cc"],
};
const toolCards = Object.entries(techStack).flatMap(([category, tools]) =>
  tools.map((name) => {
    const [Icon = IconCode, color = "#6e8577"] = toolVisuals[name] || [];
    return { name, category, Icon, color };
  }),
);
const credentialProofs = {
  "Best in Capstone - Social Relevance Award": capstoneProof,
  "Capstone Paper Accepted in 12th International Conference on Education and Training Technologies (ICETT)":
    icettProof,
  "Innovate Cebu 2nd Runner-up": innovateCebuProof,
  "GoTeam Artificial Intelligence for Communities Workshop": goTeamProof,
  "Introduction to Cybersecurity": cybersecurityProof,
  "ASEAN AI Class": aseanProof,
  "CCNA: Switching, Routing, and Wireless Essentials": switchingProof,
  "CCNA7: Introduction to Networks": introCcnaProof,
};

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const keydown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [project, onClose]);
  if (!project) return null;
  return (
    <div className="v3-dialog-backdrop" onClick={onClose}>
      <section
        className="v3-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="v3-close" onClick={onClose}>
          <IconX size={20} />
        </button>
        <div className="v3-dialog-image">
          <img src={projectImages[project.title] || project.image} alt="" />
        </div>
        <div className="v3-dialog-copy">
          <span className="v3-eyebrow">Selected project</span>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="v3-tags">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="v3-dialog-actions">
            {project.liveUrl && (
              <a className="v3-button v3-button--solid" href={project.liveUrl}>
                Live site
              </a>
            )}
            {project.demoUrl && (
              <a className="v3-button v3-button--solid" href={project.demoUrl}>
                Watch demo
              </a>
            )}
            <a
              className="v3-button v3-button--outline"
              href={project.source}
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandGithub size={16} /> Source code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
function CredentialDialog({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const keydown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div className="v3-dialog-backdrop" onClick={onClose}>
      <section
        className="v3-credential-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="v3-close" onClick={onClose}>
          <IconX size={20} />
        </button>
        <img src={item.proof} alt={`Proof for ${item.title}`} />
        <div>
          <span className="v3-eyebrow">
            {item.type} / {item.year}
          </span>
          <h2>{item.title}</h2>
        </div>
      </section>
    </div>
  );
}

export default function PortfolioV3() {
  const [project, setProject] = useState(null);
  const [credential, setCredential] = useState(null);
  const [activeDesign, setActiveDesign] = useState(designWorks[0]);
  const [designViewport, setDesignViewport] = useState(
    designWorks[0]?.viewport || "desktop",
  );
  const chooseDesign = (work) => {
    setActiveDesign(work);
    setDesignViewport(work.viewport);
  };
  return (
    <div className="v3">
      <div className="v3-noise" />
      <nav className="v3-nav">
        <a href="#top" className="v3-logo">
          WI<span>·</span>
        </a>
        <div className="v3-nav-links">
          <a href="#work">Work</a>
          <a href="#design">Design</a>
          <a href="#credentials">Credentials</a>
        </div>
        <a className="v3-nav-contact" href={`mailto:${profile.email}`}>
          Let's talk <IconArrowUpRight size={15} />
        </a>
      </nav>
      <main id="top">
        <section className="v3-hero">
          <div className="v3-orbit v3-orbit--one" />
          <div className="v3-orbit v3-orbit--two" />
          <div className="v3-glow" />
          <div className="v3-hero-copy">
            <p className="v3-eyebrow">
              <i /> Available for opportunities
            </p>
            <h1>
              Building digital
              <br />
              <em>experiences</em> that work.
            </h1>
            <p className="v3-lede">
              I'm {profile.name}, a full-stack developer who brings thoughtful
              interfaces and dependable software together.
            </p>
            <div className="v3-hero-actions">
              <a href="#work" className="v3-button v3-button--solid">
                Explore my work <IconArrowDown size={16} />
              </a>
              <a href={`mailto:${profile.email}`} className="v3-text-link">
                <IconMail size={17} /> Get in touch
              </a>
            </div>
          </div>
          <div className="v3-portrait-wrap">
            <div className="v3-photo-ring">
              <img src={profilePicture} alt={profile.name} />
            </div>
            <div className="v3-floating-card">
              <IconCode size={20} />
              <span>
                Developer
                <br />
                <b>& UI/UX Designer</b>
              </span>
            </div>
            <div className="v3-location">
              Based in
              <br />
              <b>Cebu, PH</b>
            </div>
          </div>
        </section>
        <section className="v3-intro">
          <p>01 / ABOUT</p>
          <h2>
            From the first wireframe to the final deploy, I make products people
            enjoy using.
          </h2>
          <div>
            <p>
              My work spans responsive web experiences, mobile applications, and
              systems that solve real operational problems. I care about clean
              architecture, clear communication, and the small details that make
              an interface feel right.
            </p>
            <a className="v3-text-link" href={`mailto:${profile.email}`}>
              More about me <IconArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section className="v3-work" id="work">
          <div className="v3-section-heading">
            <div>
              <p className="v3-eyebrow">02 / SELECTED WORK</p>
              <h2>A few things I've made.</h2>
            </div>
            <p>Click a project to see the story, stack, and available links.</p>
          </div>
          <div className="v3-project-grid">
            {projects.map((item) => (
              <article className="v3-project-card" key={item.title}>
                <button
                  className="v3-project-visual"
                  onClick={() => setProject(item)}
                >
                  <img
                    src={projectImages[item.title] || item.image}
                    alt={`${item.title} preview`}
                  />
                  <span className="v3-project-open">
                    Explore project <IconArrowUpRight size={17} />
                  </span>
                </button>
                <div className="v3-project-info">
                  <div className="v3-project-meta">
                    <span>0{projects.indexOf(item) + 1}</span>
                    <span>Case study</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="v3-tags">
                    {item.tech.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="v3-design" id="design">
          <div className="v3-section-heading">
            <div>
              <p className="v3-eyebrow">03 / UI/UX DESIGN</p>
              <h2>Interfaces with intent.</h2>
            </div>
            <p>
              Select an artboard, then scroll inside the preview just like a
              Figma prototype.
            </p>
          </div>
          <div className="v3-design-stage">
            <div className="v3-figma">
              <div className="v3-figma-toolbar">
                <div className="v3-window-controls">
                  <i />
                  <i />
                  <i />
                </div>
                <span>{activeDesign?.collection}</span>
                <div className="v3-viewport-switch">
                  <button
                    className={designViewport === "desktop" ? "is-active" : ""}
                    onClick={() => setDesignViewport("desktop")}
                  >
                    Desktop
                  </button>
                  <button
                    className={designViewport === "mobile" ? "is-active" : ""}
                    onClick={() => setDesignViewport("mobile")}
                  >
                    Mobile
                  </button>
                </div>
              </div>
              <div
                className={`v3-device-area v3-device-area--${designViewport}`}
              >
                <div className="v3-device">
                  <div className="v3-device-top">
                    <span>
                      {designViewport === "mobile"
                        ? "9:41"
                        : activeDesign?.title}
                    </span>
                    <i />
                  </div>
                  <div
                    className="v3-device-scroll"
                    key={`${activeDesign?.src}-${designViewport}`}
                  >
                    <img src={activeDesign?.src} alt={activeDesign?.title} />
                  </div>
                  <div className="v3-scroll-hint">
                    Scroll to inspect <IconArrowDown size={13} />
                  </div>
                </div>
              </div>
            </div>
            <aside className="v3-design-list">
              {designWorks.map((work, index) => (
                <button
                  className={activeDesign?.src === work.src ? "is-active" : ""}
                  key={work.src}
                  onClick={() => chooseDesign(work)}
                >
                  <span>0{index + 1}</span>
                  <strong>{work.title}</strong>
                  <small>
                    {work.collection} / {work.viewport}
                  </small>
                  <IconArrowUpRight size={16} />
                </button>
              ))}
            </aside>
          </div>
        </section>
        <section className="v3-credentials" id="credentials">
          <div className="v3-credentials-heading">
            <div>
              <p className="v3-eyebrow">04 / RECOGNITION</p>
              <h2>
                Proof of the work
                <br />
                behind the work.
              </h2>
            </div>
            <p>
              Selected academic awards, innovation achievements, and
              professional learning credentials. Click a card to view its proof.
            </p>
          </div>
          <div className="v3-credential-columns">
            <div>
              <div className="v3-credential-label">
                <IconAward size={18} /> Achievements{" "}
                <span>{achievements.length}</span>
              </div>
              <div className="v3-credential-list">
                {achievements.map((item) => (
                  <button
                    key={item.title}
                    onClick={() =>
                      setCredential({
                        ...item,
                        proof: credentialProofs[item.title] || item.proof,
                        type: "Achievement",
                      })
                    }
                  >
                    <span>{item.year}</span>
                    <strong>{item.title}</strong>
                    <IconArrowUpRight size={17} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="v3-credential-label">
                <IconCertificate size={18} /> Certifications{" "}
                <span>{certifications.length}</span>
              </div>
              <div className="v3-credential-list">
                {certifications.map((item) => (
                  <button
                    key={item.title}
                    onClick={() =>
                      setCredential({
                        ...item,
                        proof: credentialProofs[item.title] || item.proof,
                        type: "Certification",
                      })
                    }
                  >
                    <span>{item.year}</span>
                    <strong>{item.title}</strong>
                    <IconArrowUpRight size={17} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="v3-stack">
          <div className="v3-stack-heading">
            <div>
              <p className="v3-eyebrow">05 / COMPLETE TOOLBOX</p>
              <h2>
                Every tool I use,
                <br />
                clearly shown.
              </h2>
            </div>
            <p>
              From coding languages to design and team tools — every skill in my
              working toolkit is visible here.
            </p>
          </div>
          <div className="v3-tool-grid">
            {toolCards.map(({ name, category, Icon, color }, index) => (
              <article
                className="v3-tool-card"
                style={{
                  "--tool-color": color,
                  "--card-delay": `${index * 70}ms`,
                }}
                key={name}
              >
                <div className="v3-tool-icon">
                  <Icon size={33} stroke={1.7} />
                </div>
                <div>
                  <span className="v3-tool-category">{category}</span>
                  <h3>{name}</h3>
                </div>
                <b>0{index + 1}</b>
              </article>
            ))}
          </div>
        </section>
        <section className="v3-contact">
          <p className="v3-eyebrow">06 / HAVE A PROJECT IN MIND?</p>
          <h2>
            Let's build something
            <br />
            <em>meaningful.</em>
          </h2>
          <a href={`mailto:${profile.email}`} className="v3-contact-email">
            {profile.email}
            <IconArrowUpRight />
          </a>
        </section>
      </main>
      <footer className="v3-footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
          <a href="/v2">View V2</a>
        </div>
      </footer>
      <ProjectDialog project={project} onClose={() => setProject(null)} />
      <CredentialDialog item={credential} onClose={() => setCredential(null)} />
      <PortfolioChat />
    </div>
  );
}
