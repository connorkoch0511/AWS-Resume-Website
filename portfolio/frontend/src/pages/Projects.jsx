import { useEffect, useMemo, useState } from "react";

const API_BASE = "https://3qo252mmdj.execute-api.us-east-1.amazonaws.com/prod";

// Add metadata here for each project id returned by your API.
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Live demos, source code, and AWS-backed features you can actually try.
          </p>
        </div>

        <button
          onClick={testProjectsApi}
          disabled={apiTest.loading}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        >
          {apiTest.loading ? "Testing..." : "Try Projects API"}
        </button>
      </div>

      {apiTest.output && (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
          {apiTest.output}
        </pre>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {merged.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {p.description}
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-800">
                {p.id}
              </span>
            </div>

            {p.meta?.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.meta.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-3">
              {p.meta?.liveUrl ? (
                <a
                  href={p.meta.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  Live Demo
                </a>
              ) : null}

              {p.meta?.repoUrl ? (
                <a
                  href={p.meta.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  GitHub Repo
                </a>
              ) : null}

              {p.meta?.codeUrl ? (
                <a
                  href={p.meta.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  View Code Folder
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}