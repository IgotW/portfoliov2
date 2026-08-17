import { useEffect, useMemo, useRef, useState } from "react";
import {
  IconMessageCircle,
  IconRobot,
  IconSend,
  IconX,
} from "@tabler/icons-react";
import {
  about,
  achievements,
  certifications,
  experience,
  profile,
  projects,
  techStack,
} from "./data/portfolio";

const WINDOW_MS = 60_000;
const MAX_MESSAGES_PER_WINDOW = 8;
const MAX_MESSAGES_PER_SESSION = 30;

const openingMessage = {
  role: "assistant",
  text: `Hi! I can answer questions about ${profile.name}'s portfolio, projects, skills, experience, achievements, and contact details.`,
};

const cleanQuestion = (question) => question.toLowerCase().replace(/[^a-z0-9+.# ]/g, " ");

function answerPortfolioQuestion(question) {
  const query = cleanQuestion(question);
  const project = projects.find((item) => query.includes(item.title.toLowerCase()));

  if (project) {
    if (/tech|stack|built with|use/.test(query)) {
      return `${project.title} uses ${project.tech.join(", ")}.`;
    }
    return `${project.title}: ${project.description}`;
  }

  if (/contact|email|reach|hire|talk/.test(query)) {
    return `You can contact ${profile.name} at ${profile.email}.`;
  }
  if (/where|location|based|live/.test(query)) {
    return `${profile.name} is based in ${profile.location}.`;
  }
  if (/experience|intern|work history|ojt|dinnox/.test(query)) {
    return experience.length
      ? experience.map((item) => `${item.title} at ${item.company} (${item.period})`).join(". ")
      : "There is no experience information available in this portfolio yet.";
  }
  if (/award|achievement|recognition|competition|capstone/.test(query)) {
    return `Achievements: ${achievements.map((item) => `${item.title} (${item.year})`).join("; ")}.`;
  }
  if (/certif|credential|ccna|workshop/.test(query)) {
    return `Certifications: ${certifications.map((item) => `${item.title} (${item.year})`).join("; ")}.`;
  }
  if (/skill|technology|tech stack|language|tool|frontend|backend|database/.test(query)) {
    return Object.entries(techStack)
      .map(([group, skills]) => `${group}: ${skills.join(", ")}`)
      .join(". ");
  }
  if (/project|portfolio|work|made|build/.test(query)) {
    return `The portfolio includes ${projects.map((item) => item.title).join(", ")}. Ask about any one for its details or technology stack.`;
  }
  if (/who|about|name|role|developer/.test(query)) {
    return `${profile.name} is a ${profile.role}. ${about[0]}`;
  }

  return "I can only answer from this portfolio. Try asking about projects, skills, experience, achievements, certifications, location, or contact details.";
}

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([openingMessage]);
  const [limitNotice, setLimitNotice] = useState("");
  const requestTimes = useRef([]);
  const messageEndRef = useRef(null);

  const remaining = useMemo(
    () => Math.max(0, MAX_MESSAGES_PER_SESSION - ((messages.length - 1) / 2)),
    [messages.length],
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isOpen]);

  const submit = (event) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;

    if (question.length > 300) {
      setLimitNotice("Please keep each question to 300 characters or fewer.");
      return;
    }

    const now = Date.now();
    requestTimes.current = requestTimes.current.filter((time) => now - time < WINDOW_MS);
    if (requestTimes.current.length >= MAX_MESSAGES_PER_WINDOW) {
      const seconds = Math.ceil((WINDOW_MS - (now - requestTimes.current[0])) / 1000);
      setLimitNotice(`Please wait ${seconds}s before sending another question.`);
      return;
    }
    if (remaining <= 0) {
      setLimitNotice("This chat has reached its 30-question session limit. Please refresh later.");
      return;
    }

    requestTimes.current.push(now);
    setInput("");
    setLimitNotice("");
    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      { role: "assistant", text: answerPortfolioQuestion(question) },
    ]);
  };

  return (
    <aside className="portfolio-chat" aria-label="Portfolio assistant">
      {isOpen && (
        <section className="portfolio-chat__panel" aria-labelledby="portfolio-chat-title">
          <header className="portfolio-chat__header">
            <div>
              <span className="portfolio-chat__eyebrow"><IconRobot size={15} /> Portfolio assistant</span>
              <h2 id="portfolio-chat-title">Ask about Went&apos;s work</h2>
            </div>
            <button type="button" className="portfolio-chat__close" onClick={() => setIsOpen(false)} aria-label="Close portfolio chat">
              <IconX size={18} />
            </button>
          </header>
          <div className="portfolio-chat__messages" aria-live="polite">
            {messages.map((message, index) => (
              <p className={`portfolio-chat__message portfolio-chat__message--${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
            <div ref={messageEndRef} />
          </div>
          <div className="portfolio-chat__suggestions" aria-label="Suggested questions">
            {["What projects has he built?", "What are his skills?", "How can I contact him?"].map((question) => (
              <button type="button" key={question} onClick={() => setInput(question)}>{question}</button>
            ))}
          </div>
          <form className="portfolio-chat__form" onSubmit={submit}>
            <label className="sr-only" htmlFor="portfolio-chat-input">Ask a portfolio question</label>
            <input id="portfolio-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={300} placeholder="Ask about the portfolio…" />
            <button type="submit" aria-label="Send question"><IconSend size={17} /></button>
          </form>
          <p className="portfolio-chat__limit">Portfolio data only · {Math.floor(remaining)} questions remaining</p>
          {limitNotice && <p className="portfolio-chat__notice" role="status">{limitNotice}</p>}
        </section>
      )}
      <button type="button" className="portfolio-chat__bubble" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls="portfolio-chat-title" aria-label={isOpen ? "Close portfolio chat" : "Open portfolio chat"}>
        {isOpen ? <IconX size={24} /> : <IconMessageCircle size={24} />}
        <span>Ask me</span>
      </button>
    </aside>
  );
}
