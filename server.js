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

app.get("/webhooks/wa", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "CHANGE_ME";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`whabid-api listening on ${PORT}`));


