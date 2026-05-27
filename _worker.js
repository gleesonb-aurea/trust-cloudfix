import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // Serve exact file if it exists
    // If path has no extension, try .html
    if (!path.includes('.') && path !== '/') {
      path = path + '.html';
    }
    
    // Redirect .html paths to clean URLs
    if (path.endsWith('.html') && url.pathname !== path) {
      return Response.redirect(url.origin + path.replace('.html', ''), 301);
    }
    
    // Build the key for KV
    const key = path === '/' ? 'index.html' : path.replace(/^\//, '');
    
    try {
      const asset = await env.__STATIC_CONTENT.get(key, { type: 'arrayBuffer' });
      if (!asset) {
        return new Response('Not Found', { status: 404 });
      }
      
      // Determine content type
      const contentType = getContentType(key);
      return new Response(asset, {
        headers: { 'Content-Type': contentType },
      });
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
};

function getContentType(path) {
  if (path.endsWith('.html')) return 'text/html; charset=utf-8';
  if (path.endsWith('.css')) return 'text/css; charset=utf-8';
  if (path.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.svg')) return 'image/svg+xml';
  if (path.endsWith('.pdf')) return 'application/pdf';
  if (path.endsWith('.ico')) return 'image/x-icon';
  return 'application/octet-stream';
}
