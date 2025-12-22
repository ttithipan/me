import { useState } from 'react'
import './App.css';

const resumeData = {
  header: {
    name: "Tithipan Thepsuthin",
    title: "Computer Engineer | Optimization & AI",
    contact: {
      email: "tithipan.the@gmail.com",
      phone: "+66(0)95 472 0165",
      github: "github.com/ttithipan",
      linkedin: "https://www.linkedin.com/in/ttithipan/", 
      location: "Bangkok, Thailand"
    }
  },
  summary: "Mathematics and Computer Engineering undergraduate specialized in Optimization and Artificial Intelligence. Expert in building complex mathematical models and backend logic (Python), with experience prototyping full-stack solutions using React and Docker to visualize algorithms.",
  skills: [
    "Python (Expert: Algorithms & Modeling)",
    "Mathematical Modeling (Google OR-Tools)",
    "AI & NLP (PyTorch, Scikit-learn)",
    "Backend Dev (FastAPI, Docker, SQL)",
    "Frontend (React, JS - Project Based)",
    "Optimization (VRP, P-Median)",
    "Tools (Git, OSRM, LaTeX)"
  ],
  experience: [
    {
      role: "Lead Engineer (Project)",
      company: "Web-Optimizer: Logistic Platform",
      date: "2023 - Present",
      description: "Engineered a combinatorial optimization system solving Vehicle Routing Problems (VRP). Implemented a self-hosted OSRM engine for matrix computations and prototyped a React/Leaflet frontend for map visualization."
    },
    {
      role: "AI Developer (Project)",
      company: "Local AI Support Consolidator",
      date: "2023",
      description: "Developed a privacy-first NLP microservice using PyTorch and DBSCAN clustering to group support tickets without cloud APIs. Optimized inference performance with CUDA acceleration."
    }
  ],
  education: [
    {
      degree: "B.Eng. Computer Engineering (Intl. Program)",
      school: "KMITL (GPA: 3.67)",
      date: "Expected 2027"
    },
    {
      degree: "Science & Mathematics Program",
      school: "Mahidol Wittayanusorn School (MWIT)",
      date: "Graduated 2023"
    }
  ],
  awards: [
    "Silver Medal, 25th Young Scientist Competition (Waste Management Optimization)",
    "POSN Astronomy Olympiad (2nd Round Qualifier)"
  ]
};

// --- 2. THE COMPONENTS ---

const Header = ({ data }) => (
  <header className="resume-header">
    <h1>{data.name}</h1>
    <p className="title">{data.title}</p>
    <div className="contact-info">
      <span>{data.contact.email}</span> • 
      <span>{data.contact.phone}</span> • 
      <span>{data.contact.location}</span>
      <div className="socials">
        <a href={`https://${data.contact.github}`} target="_blank" rel="noreferrer">GitHub</a> | 
        <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
  </header>
);

const Section = ({ title, children }) => (
  <section className="resume-section">
    <h2>{title}</h2>
    <hr />
    <div className="section-content">
      {children}
    </div>
  </section>
);

// --- 3. THE MAIN APP COMPONENT ---

function App() {
  return (
    <div className="resume-container">
      <Header data={resumeData.header} />

      <Section title="About Me">
        <p>{resumeData.summary}</p>
      </Section>

      <Section title="Skills">
        <div className="skills-grid">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        {resumeData.experience.map((job, index) => (
          <div key={index} className="experience-item">
            <div className="job-header">
              <h3>{job.role}</h3>
              <span className="date">{job.date}</span>
            </div>
            <h4>{job.company}</h4>
            <p>{job.description}</p>
          </div>
        ))}
      </Section>
      
      <Section title="Education">
        {resumeData.education.map((edu, index) => (
          <div className="education-item" key={index}>
            <h3>{edu.degree}</h3>
            <p>{edu.school}</p>
            <p className="date">{edu.date}</p>
          </div>
        ))}
      </Section>
      
      <footer className="resume-footer">
        <p>Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
