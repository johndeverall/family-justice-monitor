const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Format an ISO date string, e.g. {{ someIsoDate | date("d LLLL yyyy") }}
  eleventyConfig.addFilter("date", (isoString, format = "d LLLL yyyy") => {
    if (!isoString) return "";
    return DateTime.fromISO(isoString, { zone: "utc" }).toFormat(format);
  });

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
