export default defineNuxtRouteMiddleware(async (to, from) => {

  // Config
  const auth = useRuntimeConfig().public.auth

  // look for urlQueryToken
  if(auth.token.acceptUrlQueryToken)
  {
    if(to.query.token)
    {
      const {set} = useAuthStorage();
      set('token', to.query.token as string)
    }
  } 
})