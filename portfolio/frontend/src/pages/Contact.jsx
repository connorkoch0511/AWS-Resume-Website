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
    <div className="container">
      <h1>Contact</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <textarea name="message" placeholder="Message" required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
