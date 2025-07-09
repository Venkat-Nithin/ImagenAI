import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  try {
    const res = await openai.images.generate({
      prompt: 'a cute cat in a rocket',
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });
    console.log('Image base64:', res.data[0].b64_json.slice(0, 100) + '...');
  } catch (err) {
    console.error('OpenAI test failed:', err);
  }
})();
