import type { RouteLocationRaw } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to, from) => {

  // Config
  const auth = useRuntimeConfig().public.auth

  // MIDDLEWARE: ACCEPT URL TOKEN FROM QUERY
  if(auth.token.urlQueryToken.active)
  {
    if(from.query[auth.token.urlQueryToken.param])
    {
      const {set} = useAuthStorage();
      set('token', from.query.token as string)
    }
  }
  
  // MIDDLEWARE: AUTH RBAC
  const rbac: String | true = await useAuthRbac(to)
  if(rbac !== true ) return navigateTo(rbac as RouteLocationRaw)

})