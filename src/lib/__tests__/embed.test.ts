import { describe, expect, it } from "vitest";

import { buildEmbedUrl, iframeSnippet, jsSnippet } from "@/lib/embed";

function decodeEmbedData(url: string) {
  const data = new URL(url).searchParams.get("data");
  if (!data) throw new Error("missing data param");
  return JSON.parse(atob(data));
}

describe("embed helpers", () => {
  it("builds an embed URL with encoded scores and optional name", () => {
    const scores = { immigration: 0.5, economy: -0.25 };
    const url = buildEmbedUrl("https://poligon.example", scores, "Avery");

    expect(url).toMatch(/^https:\/\/poligon\.example\/embed\?data=/);
    expect(decodeEmbedData(url)).toEqual({ name: "Avery", scores });
  });

  it("omits the name from embed data when no name is provided", () => {
    expect(decodeEmbedData(buildEmbedUrl("https://poligon.example", { social: 1 }))).toEqual({
      scores: { social: 1 },
    });
  });

  it("creates iframe markup for named and unnamed shapes", () => {
    const named = iframeSnippet("https://poligon.example/embed?data=abc", "Avery");
    const unnamed = iframeSnippet("https://poligon.example/embed?data=abc");

    expect(named).toContain('src="https://poligon.example/embed?data=abc"');
    expect(named).toContain('title="Avery\'s Political Shape"');
    expect(unnamed).toContain('title="Political Shape"');
    expect(named).toContain('style="border:none;max-width:100%;"');
  });

  it("creates JavaScript widget markup that appends the iframe", () => {
    const snippet = jsSnippet("https://poligon.example/embed?data=abc");

    expect(snippet).toContain('id="political-shape-widget"');
    expect(snippet).toContain('iframe.src = "https://poligon.example/embed?data=abc";');
    expect(snippet).toContain("el.appendChild(iframe);");
  });
});
