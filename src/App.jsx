import { useState, useEffect, useCallback } from 'react';
import './App.css';

const projects = [
  { emoji: '🎙️', title: 'Mycelium', subtitle: 'Voice-Controlled Coding Agent', stack: 'Pipecat · DeepSeek · Goose ACP · WebRTC', desc: 'Real-time voice+text AI assistant: VAD → Whisper STT → DeepSeek V4 Pro → Kokoro/Coqui TTS. Controls terminal, browser, and editor via Goose ACP. 116 unit tests.', tags: ['Pipecat','LLM','WebRTC','TTS'], links: { github: 'https://github.com/ttithipan/mycelium' }, status: 'wip' },
  { emoji: '🥛', title: 'GlassHalfFull', subtitle: 'Browser-Based Edge AI Detection', stack: 'PyTorch · ONNX · WebGPU · Blender', desc: 'Trained MobileNetV3-Small on 8,000 synthetic Blender images. Deployed via ONNX Runtime Web — runs entirely client-side with WebGPU acceleration.', tags: ['PyTorch','ONNX','WebGPU','CV'], links: { demo: 'https://ttithipan.github.io/GlassHalfFull/', github: 'https://github.com/ttithipan/GlassHalfFull' }, status: 'live' },
  { emoji: '🚛', title: 'Logistic Optimizer', subtitle: 'Logistic Optimization Platform', stack: 'FastAPI · Google ORTools · OSRM · Docker', desc: 'Combinatorial optimization solving P-Median and VRP. Self-hosted OSRM engine, Docker containerized, React + Leaflet dashboard.', tags: ['ORTools','VRP','Docker','FastAPI'], links: { demo: 'https://routing.shoveitin.me', github: 'https://github.com/ttithipan/Routing-Optimizer' }, status: 'live' },
  { emoji: '🏫', title: 'CEI Resources', subtitle: 'Student Platform with CI/CD', stack: 'Playwright · GitHub Actions · Python · JS', desc: 'Cron scrapes university registration every Monday, auto-commits. Semantic search with 4-signal RRF fusion and typo correction.', tags: ['CI/CD','Playwright','BM25','Search'], links: { demo: 'https://ttithipan.github.io/cei/', github: 'https://github.com/ttithipan/cei' }, status: 'live' },
  { emoji: '📝', title: 'INKLY', subtitle: 'Social Content Platform', stack: 'FastAPI · MongoDB · React · Google OAuth', desc: 'Major contributor: backend API, DB design, auth flow, recommendation logic. Includes system design report with diagrams.', tags: ['MongoDB','OAuth','System Design'], links: { demo: 'https://inkly.shoveitin.me', github: 'https://github.com/mindchu/INKLY' }, status: 'live' },
  { emoji: '🎫', title: 'CeiVoiceThing', subtitle: 'Ticket Categorization Platform', stack: 'Node.js · SQL · Docker · OpenAI API', desc: 'SQL schema with Dockerized DB. OpenAI ticket grouping, role-based auth, and data dashboard.', tags: ['SQL','Docker','Node.js','OpenAI'], links: { demo: 'https://ceivoice.shoveitin.me', github: 'https://github.com/FriedHamCheese/CeiVoiceThing' }, status: 'live' }
];

const skillTiers = [
  { label: 'Primary', color: 'var(--accent)', bg: 'rgba(99,102,241,0.08)', skills: ['Python', 'FastAPI', 'Docker', 'Git', 'Mathematical Modeling'] },
  { label: 'Proficient', color: 'var(--accent-2)', bg: 'rgba(168,85,247,0.06)', skills: ['PyTorch', 'JavaScript', 'React', 'Node.js', 'SQL', 'GitHub Actions', 'Playwright', 'NumPy / Pandas', 'Scikit-learn'] },
  { label: 'Practiced', color: 'var(--accent-3)', bg: 'rgba(6,182,212,0.06)', skills: ['ONNX', 'MongoDB', 'Oracle Cloud', 'WebRTC', 'Blender', 'OSRM'] }
];

const education = [
  { degree: 'B.Eng. Computer Engineering', school: 'KMITL (International Program)', meta: 'Expected 2028 · GPA 3.65 · IELTS 7.0', detail: 'Data Structures, Linear Algebra, Probability & Statistics, Discrete Math' },
  { degree: 'High School Diploma', school: 'Mahidol Wittayanusorn School (MWIT)', meta: '2023 · GPA 3.50', detail: "Thailand's first specialized science school for gifted students" }
];

const awards = [
  { icon: '🥈', title: 'Regional Silver Medal — Young Scientist Competition 2023', subtitle: 'Waste management optimization using P-median modeling' }
];

function Nav({ toggleTheme }) {
  return <nav className="nav"><div className="nav-inner"><span className="nav-logo">TT</span><button className="theme-toggle" onClick={toggleTheme}>☀️</button></div></nav>;
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useCallback((node) => {
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    obs.observe(node); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="pc-top"><span className="pc-emoji">{project.emoji}</span><span className={`pc-status ${project.status}`}>{project.status === 'wip' ? 'In Dev' : 'Live'}</span></div>
      <h3>{project.title}</h3>
      <div className="pc-subtitle">{project.subtitle}</div>
      <div className="pc-stack">{project.stack}</div>
      <p>{project.desc}</p>
      <div className="pc-tags">{project.tags.map((t,i) => <span key={i} className={`tag ${['purple','cyan','green'][i%3]}`}>{t}</span>)}</div>
      <div className="pc-links">
        {project.links.demo && <a href={project.links.demo} className="pc-link" target="_blank" rel="noreferrer">Live Demo →</a>}
        {project.links.github && <a href={project.links.github} className="pc-link" target="_blank" rel="noreferrer">Source →</a>}
      </div>
    </div>
  );
}

function SkillTier({ tier }) {
  return (
    <div className="skill-tier" style={{ '--tier-color': tier.color, '--tier-bg': tier.bg }}>
      <div className="tier-header"><span className="tier-dot" /><span className="tier-label">{tier.label}</span></div>
      <div className="tier-chips">{tier.skills.map(s => <span key={s} className="tier-chip">{s}</span>)}</div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('theme') || 'light';
    return 'dark';
  });
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <>
      <div className="grid-bg" /><Nav toggleTheme={toggleTheme} />
      <div className="app">
        <section className="hero">
          <div className="hero-badge"><span className="hero-badge-dot" />Open to Internships · April–December 2027</div>
          <h1>Tithipan<br />Thepsuthin</h1>
          <p className="hero-subtitle">Computer Engineering undergrad who ships. I build backends, train models, and deploy pipelines — from optimization engines to voice-controlled AI agents.</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">See My Work</a>
            <a href="https://github.com/ttithipan" className="btn" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/ttithipan/" className="btn" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:tithipan.the@gmail.com" className="btn">Email</a>
          </div>
          <div className="hero-scroll"><span>Scroll</span><div className="hero-scroll-arrow" /></div>
        </section>

        <section id="projects" className="section">
          <Reveal><div className="section-eyebrow">Projects</div><h2 className="section-title">What I've Built</h2><p className="section-desc">Six projects spanning AI agents, computer vision, optimization engines, CI/CD pipelines, and fullstack platforms.</p></Reveal>
          <div className="projects-grid">{projects.map((p,i) => <Reveal key={p.title} delay={i*80}><ProjectCard project={p} /></Reveal>)}</div>
        </section>

        <section id="skills" className="section">
          <Reveal><div className="section-eyebrow">Skills</div><h2 className="section-title">Tech Stack</h2><p className="section-desc">Tools organized by how often and how deeply I use them.</p></Reveal>
          <div className="skills-section">{skillTiers.map((tier, i) => <Reveal key={tier.label} delay={i*120}><SkillTier tier={tier} /></Reveal>)}</div>
        </section>

        <section id="about" className="section">
          <Reveal><div className="section-eyebrow">Background</div><h2 className="section-title">Education & Awards</h2></Reveal>
          <div className="timeline-grid">{education.map((e,i) => <Reveal key={i} delay={i*80}><div className="timeline-card"><div className="edu-degree">{e.degree}</div><div className="edu-school">{e.school}</div><div className="edu-meta">{e.meta}</div><div className="edu-detail">{e.detail}</div></div></Reveal>)}</div>
          <Reveal delay={160}><div className="awards-list" style={{marginTop:18}}>{awards.map((a,i) => <div key={i} className="award-item"><span className="award-icon">{a.icon}</span><div><strong>{a.title}</strong><span>{a.subtitle}</span></div></div>)}</div></Reveal>
        </section>

        <section id="contact" className="section">
          <Reveal><div className="contact-card"><h2>Let's Talk</h2><p>Looking for an internship April–October 2027. Backend, fullstack, or data engineering — I'm flexible.</p><div className="contact-links"><a href="mailto:tithipan.the@gmail.com" className="contact-link">📧 tithipan.the@gmail.com</a><a href="https://github.com/ttithipan" className="contact-link" target="_blank" rel="noreferrer">🐙 GitHub</a><a href="https://www.linkedin.com/in/ttithipan/" className="contact-link" target="_blank" rel="noreferrer">💼 LinkedIn</a></div></div></Reveal>
          <div className="copyright">© {new Date().getFullYear()} Tithipan Thepsuthin · Built with React + Vite</div>
        </section>
      </div>
    </>
  );
}
