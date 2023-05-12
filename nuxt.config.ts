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
          signIn: { path: '/auth/login', method: 'post', url: '/users/who-am-i', identityKey: 'data', tokenKey: 'token' },
          signOut: { method: 'post', url: false },
          signUp: { path: '/auth/register', method: 'post', url: '/users/who-am-i' },
          getSession: { method: 'get', url: '/users/who-am-i', identityKey: 'data' },
        },
        token: {
          useLocaleStorage: true,
          fallbackToApiToken: true,
          urlQueryToken: {
            active: true,
            param: 'token'
          }
        },
        identity: {
          useLocaleStorage: false
        },
        rbac: []
      }
    },
  },
})
