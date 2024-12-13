export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const OPENAI_CONFIG = {
  model: 'gpt-4',
  temperature: 0.7,
  max_tokens: 3000,
  presence_penalty: 0.3,
  frequency_penalty: 0.3
};