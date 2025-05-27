require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post('/enrich-profile', async (req, res) => {
  const userProfile = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that enriches user profiles by inferring likely profession and personality based on name, age, city, and interests. Be concise and realistic. Return only structured data.`
        },
        {
          role: 'user',
          content: JSON.stringify(userProfile)
        }
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'enrichUserProfile',
            description: 'Enriches user data with inferred personality and profession',
            parameters: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'number' },
                city: { type: 'string' },
                interests: {
                  type: 'array',
                  items: { type: 'string' }
                },
                likely_profession: { type: 'string' },
                personality: { type: 'string' }
              },
              required: ['name', 'age', 'city', 'interests'] // profession/personality not required
            }
          }
        }
      ],
      tool_choice: 'auto'
    });

    const args = completion.choices[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error('No tool function arguments returned by GPT');

    const enrichedData = JSON.parse(args);
    res.json(enrichedData);

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to enrich data' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
