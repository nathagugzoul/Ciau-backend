const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).send({ error: 'Question manquante' });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });

    const answer = completion.data.choices[0].message.content;
    res.send({ answer });
  } catch (error) {
    res.status(500).send({ error: 'Erreur OpenAI : ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en ligne sur le port ${port}`);
});
