import { useState } from 'react'
import { useReveal, useActiveSection, useScrollProgress } from './hooks.js'
import CommandPalette from './CommandPalette.jsx'

const SECTION_IDS = ['top', 'about', 'achievements', 'projects', 'skills', 'contact']
const NAV_LABELS = { achievements: 'Achievements' }

const projects = [
  {
    id: 'distometer',
    category: 'embedded',
    tag: 'Embedded',
    title: 'Distometer',
    desc: 'A device that measures the distance to an object using ultrasonic sensing, with real-time readout and simple onboard logic.',
    detail: 'Reads ultrasonic pulse timing to compute distance, then drives a live numeric readout. Focused on getting stable, low-noise readings from cheap sensor hardware.',
    stack: ['Arduino', 'C', 'Sensors'],
  },
  {
    id: 'workloadpro',
    category: 'web',
    tag: 'Web',
    title: 'WorkloadPro',
    desc: 'A web platform that calculates and visualizes faculty workload across departments, replacing manual spreadsheets.',
    detail: 'Takes raw teaching-hour and course-load data and turns it into per-faculty and per-department views, so coordinators can spot imbalances at a glance instead of digging through spreadsheets.',
    stack: ['Web', 'Data Viz'],
  },
  {
    id: 'ignisyl',
    category: 'security',
    tag: 'Security',
    title: 'Ignisyl',
    desc: 'Real-time network monitoring system that flags anomalous traffic and surfaces potential threats as they happen.',
    detail: 'Watches live network traffic for patterns that deviate from baseline behavior and raises alerts, aiming for signal over noise so real threats do not get lost in false positives.',
    stack: ['Networking', 'Python'],
  },
  {
    id: 'cityex',
    category: 'ml',
    tag: 'AI / ML',
    title: 'CityEx',
    desc: 'An AI-based system for modeling and planning city expansion, using data-driven scenarios to guide growth.',
    detail: 'Models different growth scenarios for a city and scores them against constraints like infrastructure and land use, giving planners a data-backed starting point instead of a blank map.',
    stack: ['Python', 'ML'],
  },
  {
    id: 'heart-disease',
    category: 'ml',
    tag: 'ML pipeline',
    title: 'Heart Disease Risk Prediction',
    desc: 'End-to-end pipeline on the UCI Cleveland dataset: EDA, preprocessing, feature selection, and comparison across Logistic Regression, KNN, Random Forest, ensembles, and a Keras ANN.',
    detail: 'Full workflow from raw clinical data to a compared shortlist of models, including feature selection to cut noise and an ANN built in Keras to check whether a neural approach earns its extra complexity.',
    stack: ['Pandas', 'Scikit-learn', 'Keras'],
  },
  {
    id: 'washington-ev',
    category: 'ml',
    tag: 'ML pipeline',
    title: 'Washington EV Dataset Analysis',
    desc: 'Cleaning and preparing a statewide electric vehicle registration dataset, including missing-value handling, outlier clipping, and feature encoding ahead of modeling.',
    detail: 'Handles messy real-world registration data: imputing missing values by matching make and model, clipping outliers with IQR, and encoding categorical fields ahead of modeling.',
    stack: ['Pandas', 'Seaborn', 'Scikit-learn'],
  },
]

const filters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'ml', label: 'ML' },
  { id: 'security', label: 'Security' },
  { id: 'embedded', label: 'Embedded' },
]

const skillGroups = [
  {
    label: 'Programming & tools',
    items: [
      { name: 'Python', level: 85 },
      { name: 'C', level: 75 },
      { name: 'Java (basics)', level: 50 },
      { name: 'Arduino', level: 70 },
      { name: '8051', level: 55 },
    ],
  },
  {
    label: 'Applied ML',
    items: [
      { name: 'Pandas', level: 80 },
      { name: 'Scikit-learn', level: 75 },
      { name: 'Seaborn', level: 70 },
      { name: 'Keras / TensorFlow', level: 60 },
    ],
  },
]

const achievements = [
  'Idea selected by Cognizant in its Idea Pitching Competition',
  'Hosted several blood donation camps at Sreebuddha College of Engineering',
  'NSS Volunteer (2023 to 2025) and Rudhirasena Unit Coordinator (2023 to 2025)',
  'College Ambassador, NIT Ragam (2023)',
]

function Reveal({ children }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'in-view' : ''}`}>
      {children}
    </div>
  )
}

function SkillBar({ name, level, visible }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-label">
        <span>{name}</span>
        <span className="skill-bar-pct">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: visible ? `${level}%` : '0%' }} />
      </div>
    </div>
  )
}

function SkillsBlock({ groups }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'in-view' : ''}`}>
      <p className="eyebrow">Skills</p>
      <h2>What I work with</h2>
      <div className="skills-grid">
        {groups.map((g) => (
          <div className="skill-group" key={g.label}>
            <h4>{g.label}</h4>
            {g.items.map((item) => (
              <SkillBar key={item.name} name={item.name} level={item.level} visible={visible} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function CopyLink({ value, display, href }) {
  const [copied, setCopied] = useState(false)

  async function handleClick(e) {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      window.location.href = href
    }
  }

  return (
    <a href={href} onClick={handleClick} className="contact-link">
      <span className="sq" />
      {display}
      <span className="copy-flag">{copied ? 'Copied' : 'Copy'}</span>
    </a>
  )
}

function labelFor(id) {
  return NAV_LABELS[id] || id[0].toUpperCase() + id.slice(1)
}

export default function App() {
  const active = useActiveSection(SECTION_IDS)
  const progress = useScrollProgress()
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const visibleProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const commands = [
    ...SECTION_IDS.filter((id) => id !== 'top').map((id) => ({
      id: `go-${id}`,
      label: `Go to ${labelFor(id)}`,
      hint: 'section',
      action: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
    })),
    {
      id: 'download-resume',
      label: 'Download resume',
      hint: 'pdf',
      action: () => window.open('/R_Anand_Resume.pdf', '_blank'),
    },
    {
      id: 'email',
      label: 'Email R. Anand',
      hint: 'mailto',
      action: () => { window.location.href = 'mailto:ranand2623@gmail.com' },
    },
    {
      id: 'github',
      label: 'Open GitHub profile',
      hint: 'external',
      action: () => window.open('https://github.com/R-Anand123', '_blank'),
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn profile',
      hint: 'external',
      action: () => window.open('https://linkedin.com/in/R-Anand', '_blank'),
    },
  ]

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <CommandPalette commands={commands} />

      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="nav-mark">R. Anand</a>
          <ul className="nav-links">
            {SECTION_IDS.filter((id) => id !== 'top').map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'active' : ''}>
                  {labelFor(id)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="wrap">
        <header className="hero" id="top">
          <div className="hero-eyebrow">Open to IT & software roles</div>
          <h1>
            R. Anand builds <span className="accent">clean, reliable software.</span>
          </h1>
          <p className="lede">
            Final-year Computer Science student with hands-on experience across web platforms,
            security tooling, and applied machine learning. Currently deepening my AI/ML skills
            through a dedicated course, and looking for an IT role where I can keep building
            things that work end to end.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/R_Anand_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download resume
            </a>
            <a className="btn btn-secondary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn-secondary" href="https://github.com/R-Anand123" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </header>

        <main>
          <section id="about">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2>A little about me</h2>
              <div className="about-grid">
                <div>
                  <p>
                    I'm a proactive, detail-oriented engineer in training, comfortable moving
                    between web platforms, security tooling, and applied machine learning
                    pipelines. That range comes from genuine curiosity about how software
                    actually works end to end.
                  </p>
                  <p>
                    Outside coursework, I coordinate community initiatives. I've helped run
                    blood donation drives and served as an NSS volunteer, which has sharpened
                    how I lead, communicate, and manage time under pressure.
                  </p>
                </div>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="t-role">B.Tech, Computer Science & Engineering</div>
                    <div className="t-org">Sreebuddha College of Engineering, Pattoor, Alappuzha</div>
                    <div className="t-meta">2022 to 2026, CGPA 7.19/10</div>
                  </div>
                  <div className="timeline-item">
                    <div className="t-role">Higher Secondary & Secondary Education</div>
                    <div className="t-org">Bishop Moore Vidyapith, Mavelikara</div>
                    <div className="t-meta">2019 to 2022, 12th: 72%, 10th: 87%</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="achievements">
            <Reveal>
              <p className="eyebrow">Achievements</p>
              <h2>Beyond the classroom</h2>
              <ul className="list-plain">
                {achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Reveal>
          </section>

          <section id="projects">
            <Reveal>
              <p className="eyebrow">Projects</p>
              <h2>Things I've built</h2>
              <div className="tabs" role="tablist">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={filter === f.id}
                    className={'tab-btn' + (filter === f.id ? ' active' : '')}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="project-grid">
                {visibleProjects.map((p) => {
                  const isOpen = expanded === p.id
                  return (
                    <div className={'card' + (isOpen ? ' expanded' : '')} key={p.id}>
                      <span className="card-tag">{p.tag}</span>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className={'card-detail' + (isOpen ? ' open' : '')}>
                        <p>{p.detail}</p>
                      </div>
                      <div className="card-footer">
                        <div className="card-stack">
                          {p.stack.map((s) => (
                            <span className="chip" key={s}>{s}</span>
                          ))}
                        </div>
                        <button
                          className="card-toggle"
                          onClick={() => setExpanded(isOpen ? null : p.id)}
                          aria-expanded={isOpen}
                        >
                          {isOpen ? 'Less' : 'More'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </section>

          <section id="skills">
            <SkillsBlock groups={skillGroups} />
          </section>

          <section id="contact">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <div className="contact-card">
                <div>
                  <h2>Let's talk</h2>
                  <p>Open to IT and software roles. Happy to share more about any project above or walk through my resume.</p>
                </div>
                <div className="contact-links">
                  <CopyLink value="ranand2623@gmail.com" display="ranand2623@gmail.com" href="mailto:ranand2623@gmail.com" />
                  <CopyLink value="+91 95269 01900" display="+91 95269 01900" href="tel:+919526901900" />
                  <a className="contact-link" href="https://linkedin.com/in/R-Anand" target="_blank" rel="noopener noreferrer">
                    <span className="sq" />linkedin.com/in/R-Anand
                  </a>
                  <a className="contact-link" href="https://github.com/R-Anand123" target="_blank" rel="noopener noreferrer">
                    <span className="sq" />github.com/R-Anand123
                  </a>
                </div>
              </div>
            </Reveal>
          </section>
        </main>

        <footer>
          © {new Date().getFullYear()} R. Anand. Press Cmd/Ctrl+K to jump anywhere.
        </footer>
      </div>
    </>
  )
}
