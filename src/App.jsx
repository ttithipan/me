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
    "Python",
    "Mathematical Modeling (Google OR-Tools)",
    "AI & NLP (PyTorch, Scikit-learn)",
    "Backend Dev (FastAPI, Docker, SQL)",
    "Frontend (React, JS, Vite)",
    "Optimization (VRP, P-Median)",
    "Tools (Git, OSRM, QGIS)"
  ],
  experience: [
    {
      skill: "Optimization with mathrmatical model",
      company: "Web-Optimizer: Logistic Platform",
      date: "2022 - 2025",
      description: "Engineered a combinatorial optimization system solving Vehicle Routing Problems (VRP). Implemented a self-hosted OSRM engine for matrix computations and prototyped a React/Leaflet frontend for map visualization."
    },
    {
      skill: "Natural Language Processing",
      company: "AI Support Ticket Consolidator",
      date: "2025",
      description: "Developed an NLP microservice using PyTorch and DBSCAN clustering to group support tickets based on semantic meaning. Accelerated with CUDA"
    }
  ],
  education: [
    {
      degree: "B.Eng. Computer Engineering",
      school: "King Mongkut's Institute of Technology Ladkrabang (GPA: 3.67)",
      date: "Exp. 2027"
    },
    {
      degree: "High School Diploma",
      school: "Mahidol Wittayanusorn School (GPA: 3.71)",
      date: "2023"
    }
  ],
  awards: [
    "Silver Medal, 25th Young Scientist Competition (Waste Management using P-median Model)",
    "POSN Astronomy Olympiad (2nd Round Qualifier)"
  ]
};

// --- COMPONENTS ---

const Header = ({ data }) => (
  <header className="resume-header">
    <h1>{data.name}</h1>
    <div className="header-row">
      <span className="title">{data.title}</span>
      <span className="separator">|</span>
      <div className="contact-info">
        <span>{data.contact.email}</span>
        <span>{data.contact.phone}</span>
        <span>{data.contact.location}</span>
        <a href={`https://${data.contact.github}`} target="_blank" rel="noreferrer">GitHub</a>
        <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
  </header>
);

const Section = ({ title, children, className }) => (
  <section className={`resume-section ${className}`}>
    <h2>{title}</h2>
    <div className="section-content">
      {children}
    </div>
  </section>
);

// --- MAIN APP ---

function App() {
  return (
    <div className="page-wrapper">
      <div className="resume-grid">
        
        {/* AREA: HEADER */}
        <div className="area-header">
          <Header data={resumeData.header} />
        </div>

        {/* AREA: SUMMARY */}
        <Section title="About Me" className="area-summary">
          <p>{resumeData.summary}</p>
        </Section>

        {/* AREA: LEFT COL (Education + Awards) */}
        <div className="area-left">
          <Section title="Education">
            {resumeData.education.map((edu, index) => (
              <div className="education-item" key={index}>
                <div className="edu-header">
                  {/* Degree and Date on the same line */}
                  <span className="degree">{edu.degree}</span>
                  <span className="date">{edu.date}</span>
                </div>
                <p className="school">{edu.school}</p>
              </div>
            ))}
          </Section>

          <Section title="Awards">
            <ul className="awards-list">
              {resumeData.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </Section>
        </div>

        {/* AREA: CENTER (Experience) */}
        <Section title="Experience" className="area-center">
          {resumeData.experience.map((job, index) => (
            <div key={index} className="experience-item">
              <div className="job-header">
                <h3>{job.skill}</h3>
                <span className="date">{job.date}</span>
              </div>
              <h4>{job.company}</h4>
              <p>{job.description}</p>
            </div>
          ))}
        </Section>

        {/* AREA: RIGHT (Skills) */}
        <Section title="Skills" className="area-right">
          <div className="skills-list">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="bullet">›</span> {skill}
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

export default App;