import type { APIRoute } from 'astro';
import { empresa } from '../config/empresa';
import { ruta } from '../config/rutas';
import { markdownInicio } from '../lib/markdown';

/** Versión en markdown de la página de inicio, para agentes de IA. */
export const GET: APIRoute = ({ site }) => {
  const origen = site?.href.replace(/\/$/, '') ?? empresa.sitio;
  const url = (p: string) => origen + ruta(p);

  return new Response(markdownInicio(url), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
    },
  });
};
