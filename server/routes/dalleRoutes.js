import express from 'express';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `HuggingFace Error: ${errorText}` });
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error('[HuggingFace Error]:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

export default router;
