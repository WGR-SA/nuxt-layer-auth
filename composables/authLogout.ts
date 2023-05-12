export const useAuthLogout = () => {

  // Config
  const config = useRuntimeConfig()
  const auth = config.public.auth

  const logout = async (): Promise<boolean> => {

    const url: boolean | String = auth.endpoints.signOut.url;
    if(typeof url === 'string')
    {
      const { query } = useApi()
      const { error } = await query(url, {method: auth.endpoints.signOut.method})
      if(error.value) return false
    }

    // Storage
    const {del} = useAuthStorage();
    del('token')
    del('idetity')

    return true
  }

  return { logout }
}
