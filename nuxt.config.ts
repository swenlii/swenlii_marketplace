export default defineNuxtConfig(<object>{
  runtimeConfig: {
    SERVER_URL: process.env.SERVER_URL,
    public: {
      BASE_URL: process.env.BASE_URL,
      PUBLIC_SERVER_URL: process.env.PUBLIC_SERVER_URL,
      MAP_API_KEY: process.env.MAP_API_KEY,
      SENTRY_DSN: process.env.SENTRY_DSN,
      IMAGES_S3: process.env.IMAGES_S3
    }
  },
  modules: ['@nuxt-alt/proxy','nuxt-icons','@nuxtjs/device','nuxt-swiper','@vueuse/nuxt','@nuxt/test-utils/module','@artmizu/nuxt-prometheus','nuxt-delay-hydration'],
  features: {
    inlineStyles: false,
  },
  vite: {
    build: {
      cssCodeSplit: false,
   },
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
        { name: 'title', content: 'Marketplace' }
      ],
      link: [
        { rel: 'preconnect', href: process.env.IMAGES_S3 },
        { rel: 'apple-touch-icon', sizes: "180x180", href: '/favicons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicons/android-chrome-512x512.png'},
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/android-chrome-192x192.png'},
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png'},
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png'},
        { rel: 'manifest', href: '/favicons/site.webmanifest'},
        { rel: 'icon', href: '/favicons/favicon.ico'}
      ]
    }
  },
  devtools: {
    enabled: false
  },
  proxy: {
    proxies: {
      '/spaLayer/': {
        target: process.env.SERVER_URL,
        changeOrigin: false,
        rewrite: process.env.IS_TEST ? "" : (path) => path.replace('/spaLayer/', '')
      },
      '/images/': {
        target: process.env.SERVER_URL,
        changeOrigin: true
      },
      '/sitemap': {
        target: process.env.SERVER_URL,
        changeOrigin: true
      },
    },
  },
  experimental: {
    fetch: false,
    importFunctions: true,
    componentIslands: {
      selectiveClient: true
    },
    renderJsonPayloads: false
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: [
    '~/assets/styles/main.styl',
    '~/assets/styles/layout.styl',
    '~/assets/styles/typography.styl',
    '~/assets/styles/animation.styl'
  ],
  device: {
    refreshOnResize: true
  },
  delayHydration: {
    debug: process.env.NODE_ENV === 'development',
    mode: 'mount',
    exclude: [
      '/seller/**',
      '/catalog/**',
      '/products/**'
    ],
  }
})