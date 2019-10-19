'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "xc-meet-manager",
    short_name: "xc-meet-manager",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#002B36",
    theme_color: "#002B36",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    ms: {
      tileColor: '#002B36'
    }
  };
}
