export const useAuthRedirect = () => {
  
  const auth = useRuntimeConfig().public.auth

  const redirect = (redirects: string | Record<string, string>, role: string | null) => {
    if( typeof role == 'string' &&
        typeof redirects != 'string' &&
        Object.hasOwn(redirects, role)
      ) return redirects[role]

    if(typeof redirects == 'string') return redirects

    throw createError({ statusCode: 404, statusMessage: 'Missing role login redirection' })
  }

  const loginRedirect = (role: string | null) => {
    return redirect(auth.loginRedirects, role)
  }

  const logoutRedirect = (role: string | null) => {
    return redirect(auth.loginRedirects, role)
  }

  return {loginRedirect, logoutRedirect}
}
