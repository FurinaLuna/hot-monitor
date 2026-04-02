/**
 * Cloudflare Worker - API 反向代理
 * 用途：将前端请求代理到 Railway 后端，实现国内加速
 * 部署地址示例：hotmonitorapi.furinaluna.top
 */

export default {
  async fetch(request) {
    // 处理 CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': 'https://hotmonitorfrontend.furinaluna.top',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const url = new URL(request.url);

    // 注意：必须带协议 (https://)
    const railwayUrl = 'https://hot-monitor-production.up.railway.app';

    // 构建新的URL(保留原始路径和查询参数)
    const newUrl = new URL(url.pathname + url.search, railwayUrl);

    // 复制并可修改的 headers
    const headers = new Headers(request.headers);
    headers.delete('Host');

    // 为 GET/HEAD 不传 body
    const init = {
      method: request.method,
      headers,
    };
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = request.body;
    }

    try {
      const response = await fetch(new Request(newUrl.toString(), init));

      // 创建新的响应，添加 CORS 头
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', 'https://hotmonitorfrontend.furinaluna.top');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return newResponse;
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Backend unavailable', message: error.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
