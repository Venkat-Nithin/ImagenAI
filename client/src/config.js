const isProd = import.meta.env.MODE === 'production';

export const BASE_URL = isProd
  ? 'https://imagenai-07mz.onrender.com/api/v1'
  : 'http://localhost:8080/api/v1';
