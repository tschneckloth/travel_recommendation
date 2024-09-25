const dotenv = require("dotenv");
const ENV = process.env.ELEVENTY_ENV || "development";

dotenv.config({ path: `.env.${ENV}` });

module.exports = function (eleventyConfig) {
    eleventyConfig.addGlobalData("baseUrl", process.env.BASE_URL);
    eleventyConfig.addGlobalData("assetPath", process.env.ASSET_PATH);

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy(".nojekyll");

    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: ["html", "md", "njk"],
        dir: {
            input: "src",
            output: "docs",
            layouts: "_includes/layouts",
        },
    };
};
