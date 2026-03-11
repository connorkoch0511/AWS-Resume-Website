import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.target;

    try {
      const res = await fetch(
        "https://2h3azmze1h.execute-api.us-east-1.amazonaws.com/prod/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
          }),
        }
      );

      if (!res.ok) throw new Error("Request failed");

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-sf">
    <div className="container contact-page">

      <div className="sf-versus">
        <div className="sf-fighter">
          <div className="sf-fighter-name p1">Connor</div>
          <div className="sf-health-track">
            <div className="sf-health-fill p1" />
          </div>
        </div>
        <div className="sf-vs-badge">VS</div>
        <div className="sf-fighter">
          <div className="sf-fighter-name p2">Recruiter</div>
          <div className="sf-health-track">
            <div className="sf-health-fill p2" />
          </div>
        </div>
      </div>

      <div className="sf-round">⚡ ROUND 1 — FIGHT! ⚡</div>

      <h1>Contact</h1>
      <p className="contact-subtitle">
        Send your message. I’m always open to new opportunities and conversations.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input name="name" placeholder="Your name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com" required />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            placeholder="What would you like to talk about?"
            rows={5}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Charging..." : "⚡ HADOUKEN! ⚡"}
        </button>

        {status === "success" && (
          <p className="success">Thanks! Your message has been sent.</p>
        )}
        {status === "error" && (
          <p className="error">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
    </div>
  );
}
