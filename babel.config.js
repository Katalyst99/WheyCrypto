module.exports = function (api) {
  api.cache(true);

  const presets = ["react-app"];
  const plugins = ["@babel/plugin-transform-private-property-in-object"];

  if (process.env.NODE_ENV === 'test') {
    // Configuration for Jest tests
    return {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: plugins
    };
  } else {
    // Configuration for running the app
    return {
      presets: presets,
      plugins: plugins
    };
  }
};
