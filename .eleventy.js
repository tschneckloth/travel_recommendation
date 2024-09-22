module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy(".nojekyll");

    return {
        dir: {
            input: "src",
            output: "docs",
        },
    };
};
