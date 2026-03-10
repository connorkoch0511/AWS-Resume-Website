import Experience from "../components/Experience";

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Connor Koch</h1>
        <p className="subtitle">
          Software Engineer · AWS · Go · React
        </p>
        <p className="description">
          Computer Science graduate with 2+ years of experience as an Oracle
          software developer, transitioning into cloud-native and AWS-focused
          development. Experienced in building serverless applications using
          Go, React, AWS Lambda, API Gateway, and CloudFront.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-label">POSITION</span>
            <span className="hero-stat-value">ENG</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-label">EXPERIENCE</span>
            <span className="hero-stat-value">2+ YRS</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-label">TEAM</span>
            <span className="hero-stat-value">AWS</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-label">STATUS</span>
            <span className="hero-stat-value">ACTIVE</span>
          </div>
        </div>
      </section>

      <Experience />

      <section className="education">
        <h2>Training Grounds</h2>

        <div className="education-card">
          <h3>California State University of Long Beach</h3>
          <p>Bachelor of Science in Computer Science</p>
          <p className="education-dates">August 2019 – May 2023</p>
        </div>
      </section>

      <section>
        <h2>Player Stats</h2>
        <ul className="skills">
          <li>AWS (Lambda, API Gateway, S3, CloudFront, IAM)</li>
          <li>Go (Golang)</li>
          <li>React + Vite</li>
          <li>Python</li>
          <li>C++</li>
          <li>Java</li>
          <li>PL/SQL</li>
          <li>Oracle SQL</li>
          <li>Oracle APEX</li>
          <li>Oracle Cloud Infrastructure</li>
          <li>Oracle Fusion Data Intelligence</li>
          <li>Oracle Integration Cloud</li>
          <li>Oracle E-Business Suite</li>
          <li>Oracle Enterprise Resource Planning</li>
          <li>Oracle BI Publisher</li>
          <li>Oracle Analytics</li>
          <li>Terraform</li>
        </ul>
      </section>
    </div>
  );
}
