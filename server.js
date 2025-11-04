app.post("/api/sendMail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: "hemantvaradkar2000@gmail.com",
      to: "hemantvaradkar2000@gmail.com",
      subject: subject,
      html: `<h3>${subject}</h3><p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
