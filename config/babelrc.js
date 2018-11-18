module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage"
      }
    ]
  ],
  plugins: [
    "syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 2
      }
    ],
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
