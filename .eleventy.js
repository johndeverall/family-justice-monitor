const { DateTime } = require("luxon");
const { execSync } = require("child_process");

// A short, stable string that changes on every commit — used to cache-bust
// static assets (CSS/JS) so a CDN/browser cache from a previous deploy can't
// keep serving stale styles after a build. Falls back to a timestamp if git
// isn't available (e.g. a shallow checkout with no history).
function getBuildVersion() {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (e) {
    return String(Date.now());
  }
}

module.exports = function(eleventyConfig) {
  const buildVersion = getBuildVersion();
  eleventyConfig.addGlobalData("buildVersion", buildVersion);

  // Copy static assets to output
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Format an ISO date string, e.g. {{ someIsoDate | date("d LLLL yyyy") }}
  eleventyConfig.addFilter("date", (isoString, format = "d LLLL yyyy") => {
    if (!isoString) return "";
    return DateTime.fromISO(isoString, { zone: "utc" }).toFormat(format);
  });

  // The current year at build time, e.g. {% currentYear %} — for a copyright
  // notice that never needs manual updating.
  eleventyConfig.addShortcode("currentYear", () => String(new Date().getFullYear()));

  // Set custom directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
