import express from 'express';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Hugging Face DALL·E clone!' });
});

router.route('/').post(async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HuggingFace Error: ${errorText}`);
    }

    const buffer = await response.buffer();
    const base64Image = buffer.toString('base64');

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error('[HF Image Generation Error]', error.message);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

export default router;
