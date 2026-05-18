export function buildEmbedUrl(
  base: string,
  scores: Record<string, number>,
  name?: string
): string {
  const data = btoa(JSON.stringify({ name, scores }));
  const params = new URLSearchParams({ data });
  return `${base}/embed?${params.toString()}`;
}

export function iframeSnippet(embedUrl: string, name?: string): string {
  return `<iframe
  src="${embedUrl}"
  width="600"
  height="520"
  frameborder="0"
  scrolling="no"
  title="${name ? `${name}'s Political Shape` : "Political Shape"}"
  style="border:none;max-width:100%;"
></iframe>`;
}

export function jsSnippet(embedUrl: string): string {
  return `<div id="political-shape-widget"></div>
<script>
  (function() {
    var el = document.getElementById('political-shape-widget');
    var iframe = document.createElement('iframe');
    iframe.src = "${embedUrl}";
    iframe.width = "600";
    iframe.height = "520";
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.style.cssText = "border:none;max-width:100%;";
    el.appendChild(iframe);
  })();
</script>`;
}
