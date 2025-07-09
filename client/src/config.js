const isProd = import.meta.env.MODE === 'production';

export const BASE_URL = isProd
  ? 'https://your-backend-name.onrender.com/api/v1'
  : 'http://localhost:8080/api/v1';