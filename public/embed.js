/**
 * Your Political Shape — JavaScript Embed Widget
 *
 * Usage:
 *
 * 1. Add a container div with your data:
 *    <div
 *      id="political-shape-widget"
 *      data-name="Candidate A"
 *      data-scores='{"immigration":0.6,"government":0.65,"economy":0.55,"healthcare":0.8,"education":0.7,"environment":0.85,"civilLiberties":0.6,"foreignPolicy":0.4,"technology":0.55,"social":0.7}'
 *    ></div>
 *
 * 2. Include this script:
 *    <script src="https://your-domain.com/embed.js"></script>
 */
(function () {
  "use strict";

  var BASE_URL = (document.currentScript && document.currentScript.src)
    ? new URL(document.currentScript.src).origin
    : "https://your-domain.com";

  function encodeData(name, scores) {
    try {
      return btoa(JSON.stringify({ name: name, scores: scores }));
    } catch (e) {
      return "";
    }
  }

  function createWidget(container) {
    var name = container.getAttribute("data-name") || "Political Shape";
    var scoresAttr = container.getAttribute("data-scores") || "{}";
    var width = container.getAttribute("data-width") || "600";
    var height = container.getAttribute("data-height") || "520";
    var legend = container.getAttribute("data-legend") !== "false" ? "true" : "false";

    var scores;
    try {
      scores = JSON.parse(scoresAttr);
    } catch (e) {
      console.error("[PoliticalShape] Invalid data-scores JSON:", scoresAttr);
      return;
    }

    var encoded = encodeData(name, scores);
    if (!encoded) return;

    var src =
      BASE_URL +
      "/embed?data=" +
      encodeURIComponent(encoded) +
      "&legend=" +
      legend;

    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.width = width;
    iframe.height = height;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.title = name + "'s Political Shape";
    iframe.style.cssText =
      "border:none;max-width:100%;display:block;";

    container.innerHTML = "";
    container.appendChild(iframe);
  }

  function init() {
    var containers = document.querySelectorAll("[data-political-shape]");
    if (containers.length === 0) {
      // Fallback: look for the legacy ID
      var legacy = document.getElementById("political-shape-widget");
      if (legacy) createWidget(legacy);
      return;
    }
    containers.forEach(createWidget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
