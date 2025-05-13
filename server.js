const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).send({ error: 'Question manquante' });

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });

    const answer = chat.choices[0].message.content;
    res.send({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erreur OpenAI : ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend en ligne sur le port ${port}`);
});const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).send({ error: 'Question manquante' });

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });

    const answer = chat.choices[0].message.content;
    res.send({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erreur OpenAI : ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend en ligne sur le port ${port}`);
});
