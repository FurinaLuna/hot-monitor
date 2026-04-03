export default {
  async fetch(request, env) {
    const frontendOrigin = env.FRONTEND_ORIGIN || 'https://frontend.your-domain.com';
    const railwayUrl = env.RAILWAY_BACKEND_URL || 'https://your-service.up.railway.app';

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': frontendOrigin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const url = new URL(request.url);
    const newUrl = new URL(url.pathname + url.search, railwayUrl);
    const headers = new Headers(request.headers);
    headers.delete('Host');
    const init = {
      method: request.method,
      headers,
    };
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = request.body;
    }

    try {
      const response = await fetch(new Request(newUrl.toString(), init));
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', frontendOrigin);
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return newResponse;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return new Response(JSON.stringify({ error: 'Backend unavailable', message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
