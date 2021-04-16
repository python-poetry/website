const isProduction = process.env.NODE_ENV === "production";

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || []
    }
}


module.exports = {
    plugins: [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
        require("postcss-nested"),
        ...(isProduction ? [require("@fullhuman/postcss-purgecss")({
            content: [
                "./themes/**/*.html",
            ],
            defaultExtractor: content => content.match(/[\w-:/]+(?<!:)/g) || []
        })] : []),
    ],
};
