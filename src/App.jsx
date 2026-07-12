import { useState, useEffect, useCallback } from 'react';
import './App.css';

/* ===== DATA ===== */
const data = {
  projects: [
    {
      category: 'ai',
      emoji: '🥛',
      title: 'GlassHalfFull',
      subtitle: 'Browser-Based Edge AI Object Detection',
      stack: 'Python · PyTorch · ONNX · WebGPU · Blender',
      desc: 'End-to-end CV pipeline: trained MobileNetV3-Small on 8,000 synthetic Blender images. Deployed via ONNX Runtime Web — runs entirely in the browser with WebGPU acceleration.',
      tags: ['PyTorch', 'ONNX', 'WebGPU', 'CV', 'Synthetic Data'],
      links: { demo: 'https://ttithipan.github.io/GlassHalfFull/', github: 'https://github.com/ttithipan/GlassHalfFull' },
      status: 'live'
    },
    {
      category: 'ai',
      emoji: '🎙️',
      title: 'Mycelium',
      subtitle: 'Voice-Controlled Coding Agent',
      stack: 'Python · Pipecat · DeepSeek · Goose ACP · WebRTC',
      desc: 'Real-time voice+text AI assistant: VAD → Whisper STT → DeepSeek V4 Pro → Kokoro TTS. Controls terminal, browser, and editor via Goose ACP. 116 unit tests.',
      tags: ['Pipecat', 'LLM', 'WebRTC', 'TTS', '116 tests'],
      links: { github: 'https://github.com/ttithipan/mycelium' },
      status: 'wip'
    },
    {
      category: 'platform',
      emoji: '🚛',
      title: 'Web-Optimizer',
      subtitle: 'Logistic Optimization Platform',
      stack: 'Python · FastAPI · Google ORTools · OSRM · Docker · React',
      desc: 'Combinatorial optimization system solving P-Median and VRP. Self-hosted OSRM engine for real road-network distance computation. Interactive React + Leaflet dashboard.',
      tags: ['ORTools', 'VRP', 'Docker', 'FastAPI', 'React'],
      links: { github: 'https://github.com/ttithipan/Routing-Optimizer' },
      status: 'live'
    },
    {
      category: 'platform',
      emoji: '🏫',
      title: 'CEI Resources',
      subtitle: 'Student Platform with CI/CD Pipeline',
      stack: 'Python · Playwright · GitHub Actions · JS · GitHub Pages',
      desc: 'Automated data pipeline: cron scrapes university registration every Monday, auto-commits. Semantic search with 4-signal RRF fusion and typo correction.',
      tags: ['CI/CD', 'Playwright', 'BM25', 'Search', 'Cron'],
      links: { demo: 'https://ttithipan.github.io/cei/', github: 'https://github.com/ttithipan/cei' },
      status: 'wip'
    },
    {
      category: 'team',
      emoji: '📝',
      title: 'INKLY',
      subtitle: 'Social Content Platform',
      stack: 'FastAPI · MongoDB · React · Google OAuth',
      desc: 'Major contributor to backend API, database design, auth flow, and recommendation logic. Includes formal system design report with architecture diagrams.',
      tags: ['MongoDB', 'OAuth', 'System Design'],
      links: { github: 'https://github.com/mindchu/INKLY' },
      status: 'live'
    },
    {
      category: 'team',
      emoji: '🎫',
      title: 'CeiVoiceThing',
      subtitle: 'Ticket Categorization Platform',
      stack: 'Node.js · SQL · Docker · OpenAI API',
      desc: 'Designed SQL schema with Dockerized database. OpenAI-powered ticket grouping, role-based authentication, and data dashboard.',
      tags: ['SQL', 'Docker', 'Node.js', 'OpenAI'],
      links: { github: 'https://github.com/FriedHamCheese/CeiVoiceThing' },
      status: 'live'
    }
  ],
  skills: [
    { icon: '🐍', title: 'Languages', items: ['Python', 'JavaScript', 'Node.js', 'SQL'] },
    { icon: '⚡', title: 'Backend', items: ['FastAPI', 'REST API', 'Docker', 'Git'] },
    { icon: '🧠', title: 'AI & ML', items: ['PyTorch', 'Scikit-learn', 'ONNX', 'NumPy', 'Pandas'] },
    { icon: '🎨', title: 'Frontend', items: ['React', 'Vite', 'Leaflet', 'CSS'] },
    { icon: '🔧', title: 'Infrastructure', items: ['GitHub Actions', 'Playwright', 'OCI', 'OSRM'] },
    { icon: '📐', title: 'Specialties', items: ['Optimization', 'Mathematical Modeling', 'System Design', 'CI/CD'] }
  ],
  education: [
    {
      degree: 'B.Eng. Computer Engineering',
      school: 'KMITL (International Program)',
      meta: 'Expected 2027 · GPA 3.65 · IELTS 7.0',
      detail: 'Relevant: Data Structures, Linear Algebra, Probability & Statistics, Discrete Math'
    },
    {
      degree: 'High School Diploma',
      school: 'Mahidol Wittayanusorn School (MWIT)',
      meta: '2023 · GPA 3.50',
      detail: "Thailand's first specialized science school for gifted students"
    }
  ],
  awards: [
    { icon: '🥈', title: 'Regional Silver Medal', subtitle: 'Young Scientist Competition 2023' },
    { icon: '🗑️', title: 'Waste Management Optimization', subtitle: 'Applied P-median modeling for facility placement' }
  ]
};

/* ===== CATEGORIES ===== */
const categories = {
  ai: { label: 'AI & Agents', icon: '🤖' },
  platform: { label: 'Platform & Infrastructure', icon: '🏗️' },
  team: { label: 'Team Projects', icon: '👥' }
};

/* ===== COMPONENTS ===== */

function Nav({ theme, toggleTheme }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <span className="nav-logo">TT</span>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useCallback((node) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-icon-row">
        <span className="project-emoji">{project.emoji}</span>
        <span className={`project-status ${project.status}`}>
          {project.status === 'wip' ? 'In Dev' : 'Live'}
        </span>
      </div>
      <h3>{project.title}</h3>
      <div className="project-stack">{project.subtitle}</div>
      <p>{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag, i) => {
          const colorClass = ['purple', 'cyan', 'green'][i % 3];
          return <span key={i} className={`tag ${colorClass}`}>{tag}</span>;
        })}
      </div>
      <div className="project-links">
        {project.links.demo && (
          <a href={project.links.demo} className="project-link" target="_blank" rel="noreferrer">
            Live Demo <span className="arrow">→</span>
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} className="project-link" target="_blank" rel="noreferrer">
            Source <span className="arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );
}

/* ===== MAIN APP ===== */

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const groupedProjects = data.projects.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <>
      <div className="grid-bg" />
      <Nav theme={theme} toggleTheme={toggleTheme} />

      <div className="app">
        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Open to Internships · April–October 2027
          </div>
          <h1>Tithipan<br />Thepsuthin</h1>
          <p className="hero-subtitle">
            Computer Engineering undergrad who ships. I build backends, train models,
            and deploy pipelines — from optimization engines to voice-controlled AI agents.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">See My Work</a>
            <a href="https://github.com/ttithipan" className="btn" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/ttithipan/" className="btn" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:tithipan.the@gmail.com" className="btn">Email</a>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="hero-scroll-arrow" />
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <Reveal>
            <div className="section-eyebrow">Projects</div>
            <h2 className="section-title">What I've Built</h2>
            <p className="section-desc">
              Projects span AI agents, computer vision, optimization engines, and automated data pipelines.
            </p>
          </Reveal>

          {Object.entries(categories).map(([key, cat]) => (
            <div key={key}>
              <Reveal>
                <div className="category-heading">
                  <span className="cat-icon">{cat.icon}</span>
                  {cat.label}
                </div>
              </Reveal>
              <div className="projects-grid">
                {(groupedProjects[key] || []).map((project, i) => (
                  <Reveal key={project.title} delay={i * 80}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <Reveal>
            <div className="section-eyebrow">Skills</div>
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-desc">
              Primary expertise in Python with fullstack capabilities. Comfortable across backend, AI/ML, and infrastructure.
            </p>
          </Reveal>
          <div className="skills-grid">
            {data.skills.map((skill, i) => (
              <Reveal key={skill.title} delay={i * 60}>
                <div className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h4>{skill.title}</h4>
                  <div className="skill-items">
                    {skill.items.map(item => (
                      <span key={item} className="skill-chip">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION + AWARDS */}
        <section id="about" className="section">
          <Reveal>
            <div className="section-eyebrow">Background</div>
            <h2 className="section-title">Education & Awards</h2>
          </Reveal>
          <div className="timeline-grid">
            {data.education.map((edu, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="timeline-card">
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-school">{edu.school}</div>
                  <div className="edu-meta">{edu.meta}</div>
                  <div className="edu-detail">{edu.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <div className="awards-list" style={{ marginTop: 18 }}>
              {data.awards.map((award, i) => (
                <div key={i} className="award-item">
                  <span className="award-icon">{award.icon}</span>
                  <div>
                    <strong>{award.title}</strong>
                    <span>{award.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <Reveal>
            <div className="contact-card">
              <h2>Let's Talk</h2>
              <p>Looking for an internship April–October 2027. Backend, fullstack, or data engineering — I'm flexible.</p>
              <div className="contact-links">
                <a href="mailto:tithipan.the@gmail.com" className="contact-link">📧 tithipan.the@gmail.com</a>
                <a href="https://github.com/ttithipan" className="contact-link" target="_blank" rel="noreferrer">🐙 GitHub</a>
                <a href="https://www.linkedin.com/in/ttithipan/" className="contact-link" target="_blank" rel="noreferrer">💼 LinkedIn</a>
              </div>
            </div>
          </Reveal>
          <div className="copyright">
            © {new Date().getFullYear()} Tithipan Thepsuthin · Built with React + Vite
          </div>
        </section>
      </div>
    </>
  );
}
