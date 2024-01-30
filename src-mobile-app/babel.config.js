process.env.EXPO_ROUTER_APP_ROOT = "../../src/app";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // optional, only if you ever use process.env
      "transform-inline-environment-variables",
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts",
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development'
        },
      ],
      // NOTE: this is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
    ],
  };
};
