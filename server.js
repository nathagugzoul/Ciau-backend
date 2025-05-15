const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Assure-toi que la variable est bien définie dans Render
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  console.log('❓ Question reçue :', question);

  if (!question) {
    console.log('⚠️ Aucune question reçue.');
    return res.status(400).send({ error: 'Question manquante' });
  }

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });

    const answer = chat.choices[0].message.content;
    console.log('✅ Réponse IA :', answer);

    res.send({ answer });
  } catch (error) {
    console.error('❌ Erreur OpenAI :', error.message);
    res.status(500).send({ error: 'Erreur OpenAI : ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend prêt sur le port ${port}`);
});
