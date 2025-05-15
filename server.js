const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialisation OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ⚠️ Ta clé OpenAI doit être dans Render (onglet "Environment")
});

// Route API
app.post('/ask', async (req, res) => {
  const { question } = req.body;
  console.log("✅ Question reçue :", question);

  if (!question) {
    return res.status(400).json({ error: 'Question manquante' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    });

    const response = completion.choices[0].message.content;
    console.log("✅ Réponse IA :", response);
    res.json({ answer: response });
  } catch (err) {
    console.error("❌ Erreur OpenAI :", err.message);
    res.status(500).json({ error: 'Erreur de l\'IA' });
  }
});

// Démarrage serveur
app.listen(port, () => {
  console.log(`🚀 Backend prêt sur le port ${port}`);
});
