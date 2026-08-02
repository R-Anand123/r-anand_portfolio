const projects = [
  {
    tag: 'EMBEDDED',
    title: 'Distometer',
    desc: 'A device that measures the distance to an object using ultrasonic sensing, with real-time readout and simple onboard logic.',
    stack: ['Arduino', 'C', 'Sensors'],
  },
  {
    tag: 'WEB',
    title: 'WorkloadPro',
    desc: 'A web platform that calculates and visualizes faculty workload across departments, replacing manual spreadsheets.',
    stack: ['Web', 'Data Viz'],
  },
  {
    tag: 'SECURITY',
    title: 'Ignisyl',
    desc: 'Real-time network monitoring system that flags anomalous traffic and surfaces potential threats as they happen.',
    stack: ['Networking', 'Python'],
  },
  {
    tag: 'AI/ML',
    title: 'CityEx',
    desc: 'An AI-based system for modeling and planning city expansion, using data-driven scenarios to guide growth.',
    stack: ['Python', 'ML'],
  },
  {
    tag: 'ML PIPELINE',
    title: 'Heart Disease Risk Prediction',
    desc: 'End-to-end pipeline on the UCI Cleveland dataset: EDA, preprocessing, feature selection, and comparison across Logistic Regression, KNN, Random Forest, ensembles, and a Keras ANN.',
    stack: ['Pandas', 'Scikit-learn', 'Keras'],
  },
  {
    tag: 'ML PIPELINE',
    title: 'Washington EV Dataset Analysis',
    desc: 'Cleaning and preparing a statewide electric vehicle registration dataset, including missing-value handling, outlier clipping, and feature encoding ahead of modeling.',
    stack: ['Pandas', 'Seaborn', 'Scikit-learn'],
  },
]

const skillGroups = [
  { label: 'Programming & Tools', items: ['C', 'Python', 'Java (basics)', 'Arduino', '8051'] },
  { label: 'Applied ML', items: ['Pandas', 'Scikit-learn', 'Seaborn', 'Keras / TensorFlow'] },
  { label: 'Working on', items: ['AI/ML coursework in progress'] },
]

const certifications = [
  'NPTEL: Python for Data Science',
  'Bug Bounty Training & Certification',
  'Social Media API Development and Integration to CRM Software, Codea Technologies',
  'Full Stack Web Development with AI Tools',
]

const achievements = [
  'Idea selected by Cognizant in its Idea Pitching Competition',
  'Hosted several blood donation camps at Sreebuddha College of Engineering',
  'NSS Volunteer (2023–2025) and Rudhirasena Unit Coordinator (2023–2025)',
  'College Ambassador, NIT Ragam (2023)',
]

function TraceNode({ children }) {
  return (
    <div className="trace-node">
      <span className="node" />
      <span className="stub" />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="nav-mark">
            <span className="dot" />
            R. ANAND
          </a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="wrap">
        <header className="hero" id="top">
          <div className="hero-eyebrow">
            <span className="pulse" />
            Open to IT & software roles
          </div>
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
              Download résumé
            </a>
            <a className="btn btn-secondary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn-secondary" href="https://github.com/R-Anand123" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </header>

        <main className="trace">
          <section id="about">
            <TraceNode>
              <p className="eyebrow">01 · About</p>
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
                    <div className="t-meta">2022 – 2026 · CGPA 7.19/10</div>
                  </div>
                  <div className="timeline-item">
                    <div className="t-role">Higher Secondary & Secondary Education</div>
                    <div className="t-org">Bishop Moore Vidyapith, Mavelikara</div>
                    <div className="t-meta">2019 – 2022 · 12th: 72% · 10th: 87%</div>
                  </div>
                </div>
              </div>
            </TraceNode>
          </section>

          <section id="resume">
            <TraceNode>
              <p className="eyebrow">02 · Résumé</p>
              <h2>Certifications & achievements</h2>
              <div className="about-grid">
                <div>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>
                    Certifications
                  </h4>
                  <ul className="list-plain">
                    {certifications.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>
                    Achievements & volunteering
                  </h4>
                  <ul className="list-plain">
                    {achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TraceNode>
          </section>

          <section id="projects">
            <TraceNode>
              <p className="eyebrow">03 · Projects</p>
              <h2>Things I've built</h2>
              <div className="project-grid">
                {projects.map((p) => (
                  <div className="card" key={p.title}>
                    <span className="card-tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="card-stack">
                      {p.stack.map((s) => (
                        <span className="chip" key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TraceNode>
          </section>

          <section id="skills">
            <TraceNode>
              <p className="eyebrow">04 · Skills</p>
              <h2>What I work with</h2>
              <div className="skills-grid">
                {skillGroups.map((g) => (
                  <div className="skill-group" key={g.label}>
                    <h4>{g.label}</h4>
                    <div>
                      {g.items.map((i) => (
                        <span className="chip" key={i}>{i}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TraceNode>
          </section>

          <section id="contact">
            <TraceNode>
              <p className="eyebrow">05 · Contact</p>
              <div className="contact-card">
                <div>
                  <h2>Let's talk</h2>
                  <p>Open to IT and software roles. Happy to share more about any project above or walk through my résumé.</p>
                </div>
                <div className="contact-links">
                  <a href="mailto:ranand2623@gmail.com"><span className="sq" />ranand2623@gmail.com</a>
                  <a href="tel:+919526901900"><span className="sq" />+91 95269 01900</a>
                  <a href="https://linkedin.com/in/R-Anand" target="_blank" rel="noopener noreferrer"><span className="sq" />linkedin.com/in/R-Anand</a>
                  <a href="https://github.com/R-Anand123" target="_blank" rel="noopener noreferrer"><span className="sq" />github.com/R-Anand123</a>
                </div>
              </div>
            </TraceNode>
          </section>
        </main>

        <footer>
          © {new Date().getFullYear()} R. Anand · built with React
        </footer>
      </div>
    </>
  )
}
