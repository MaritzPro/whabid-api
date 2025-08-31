const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "whabid-api", time: new Date().toISOString() });
});

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.post("/webhooks/wa", (req, res) => {
  console.log("WA webhook payload:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`whabid-api listening on ${PORT}`));
