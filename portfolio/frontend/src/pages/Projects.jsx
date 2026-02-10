import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://3qo252mmdj.execute-api.us-east-1.amazonaws.com/prod";

const META = {
  "aws-portfolio": {
    tags: ["AWS", "Lambda", "API Gateway", "DynamoDB", "SES", "Terraform", "React", "Go"],
    liveUrl: "https://d2k3tmmmuxn4oo.cloudfront.net",
    repoUrl: "https://github.com/connorkoch0511/AWS-Resume-Website",
    codeUrl: "https://github.com/connorkoch0511/AWS-Resume-Website/tree/main/portfolio",
  },
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [apiTest, setApiTest] = useState({ loading: false, output: "" });

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const merged = useMemo(
    () => projects.map((p) => ({ ...p, meta: META[p.id] || null })),
    [projects]
  );

  const testProjectsApi = async () => {
    setApiTest({ loading: true, output: "" });
    try {
      const res = await fetch(`${API_BASE}/projects`);
      const text = await res.text();
      setApiTest({ loading: false, output: text });
    } catch {
      setApiTest({ loading: false, output: "Failed to call API." });
    }
  };

  return (
    <div className="container">
      <div className="projects-header">
        <div>
          <h1>Projects</h1>
          <p className="projects-subtitle">
            Live demos, source code, and AWS-backed features you can try.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={testProjectsApi}
          disabled={apiTest.loading}
        >
          {apiTest.loading ? "Testing..." : "Try Projects API"}
        </button>
      </div>

      {apiTest.output && <pre className="code-block">{apiTest.output}</pre>}

      <div className="project-grid">
        {merged.map((project) => (
          <div key={project.id} className="project-card retro-card">
            <div className="project-card-top">
              <div>
                <h3>
                  <Link to={`/projects/${project.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {project.name}
                  </Link>
                </h3>
                <p className="project-desc">{project.description}</p>
              </div>
              <span className="pill">{project.id}</span>
            </div>

            {project.meta?.tags?.length ? (
              <div className="tag-row">
                {project.meta.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            ) : null}

            <div className="btn-row">
              <Link className="btn btn-secondary" to={`/projects/${project.id}`}>
                Details
              </Link>

              {project.meta?.liveUrl && (
                <a className="btn btn-primary" href={project.meta.liveUrl} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
              {project.meta?.repoUrl && (
                <a className="btn btn-secondary" href={project.meta.repoUrl} target="_blank" rel="noreferrer">
                  GitHub Repo
                </a>
              )}
              {project.meta?.codeUrl && (
                <a className="btn btn-secondary" href={project.meta.codeUrl} target="_blank" rel="noreferrer">
                  View Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}