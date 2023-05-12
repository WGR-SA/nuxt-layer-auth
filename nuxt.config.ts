// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@wgr-sa/nuxt-form'
  ],
  runtimeConfig: {
    app: { },
    public: {
      apiUrl:'',
      apiToken: '',
      thumbBaseUrl: '',
      gaTrackingId: '',
      recaptchaSitekey: '',
      api: {
        initialCache: true
      },
      auth: {
        loginRedirects: '/admin',
        logoutRedirects: '/',
        endpoints: {
          signIn: { path: '/auth/login', method: 'post', url: '/users/who-am-i' },
          signOut: { path: '/auth/logout', method: 'post', url: '/users/who-am-i' },
          signUp: { path: '/auth/register', method: 'post', url: '/users/who-am-i' },
          getSession: { path: '/auth/session', method: 'get', url: '/users/who-am-i' },
        },
        token: {
          useLocaleStorage: true,
          fallbackToApiToken: true,
          acceptUrlQueryToken: true,
        },
        identity: {
          useLocaleStorage: false
        }
      }
    },
  },
})
