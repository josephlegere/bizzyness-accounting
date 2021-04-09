import colors from 'vuetify/es5/util/colors'
require("dotenv").config();

export default {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/vue-moment.js",
    '~/plugins/localStorage.js',
    { src: '~/plugins/vue-pdf.js', ssr: false }
  ],
  /**
   * Router settings
   */
  router: {
    middleware: ['authenticated']
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    'cookie-universal-nuxt',
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: process.env.NUXT_ENV_API_KEY,
          authDomain: process.env.NUXT_ENV_AUTH_DOMAIN,
          databaseURL: process.env.NUXT_ENV_DATABASE_URL,
          projectId: process.env.NUXT_ENV_PROJECT_ID,
          storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
          messagingSenderId: process.env.NUXT_ENV_MESSAGE_SENDER_ID,
          appId: process.env.NUXT_ENV_APP_ID,
          measurementId: process.env.NUXT_ENV_MEASUREMENT_ID
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  }
};
