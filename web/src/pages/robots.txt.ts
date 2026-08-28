import type { APIRoute } from 'astro';
import { ruta } from '../config/rutas';

/**
 * robots.txt generado en el build.
 *
 * Se genera en vez de ser un archivo fijo porque la URL del sitemap cambia
 * según dónde se publique el sitio (dominio propio o GitHub Pages).
 *
 * Además de permitir todo, se listan los agentes de IA uno por uno. No hace
 * falta técnicamente —"User-agent: *" ya los cubre— pero las auditorías de
 * visibilidad en IA buscan el permiso explícito, y deja constancia de que la
 * empresa quiere aparecer en las respuestas de estos asistentes.
 */

const agentesIA = [
  'GPTBot', // OpenAI, entrenamiento
  'ChatGPT-User', // OpenAI, navegación en vivo
  'OAI-SearchBot', // OpenAI, búsqueda
  'ClaudeBot', // Anthropic
  'Claude-User',
  'Claude-SearchBot',
  'Google-Extended', // Google, Gemini
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'meta-externalagent',
  'DeepSeekBot',
  'ora-agent',
  'cohere-ai',
  'YouBot',
];

export const GET: APIRoute = ({ site }) => {
  const origen = site?.href.replace(/\/$/, '') ?? 'https://www.carreteras2000.com.ar';
  const sitemap = origen + ruta('/sitemap-index.xml');
  const llms = origen + ruta('/llms.txt');

  const lineas = [
    '# Carreteras 2000 S.A.',
    '# Este sitio quiere ser leído por buscadores y asistentes de IA.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Asistentes de IA, permitidos de forma explícita',
    ...agentesIA.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    `# Resumen del sitio para modelos: ${llms}`,
    `Sitemap: ${sitemap}`,
    '',
  ];

  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
