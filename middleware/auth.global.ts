export default defineNuxtRouteMiddleware(async (to, from) => {

  // Config
  const auth = useRuntimeConfig().public.auth

  // MIDDLEWARE: ACCEPT URL TOKEN FROM QUERY
  if(auth.token.urlQueryToken.active)
  {
    if(to.query[auth.token.urlQueryToken.param])
    {
      const {set} = useAuthStorage();
      set('token', to.query.token as string)
    }
  }
  
  // MIDDLEWARE: AUTH RBAC
  const rbac: string | true = await useAuthRbac(to)
  if(rbac !== true ) return navigateTo(rbac)

})