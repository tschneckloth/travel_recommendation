module.exports = function (eleventyConfig) {
    eleventyConfig.addGlobalData("baseUrl", "https://tschneckloth.github.io/travel_recommendation");
    // eleventyConfig.addGlobalData("baseUrl", "http://localhost:8080");

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
