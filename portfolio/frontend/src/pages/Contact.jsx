export default function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    await fetch("https://3qo252mmdj.execute-api.us-east-1.amazonaws.com/prod/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      }),
    });

    form.reset();
    alert("Message sent!");
  };

  return (
    <div className="container contact-page">
      <h1>Contact</h1>
      <p className="contact-subtitle">
        Feel free to reach out — I’m always open to new opportunities and conversations.
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
          {loading ? "Sending..." : "Send Message"}
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
  );

}
