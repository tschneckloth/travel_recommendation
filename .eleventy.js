module.exports = function (eleventyConfig) {
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
