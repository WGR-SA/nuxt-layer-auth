import {minimatch} from 'minimatch'
import type { RouteLocationRaw, RouteLocationNormalized } from 'vue-router'

export const useAuthRbac = async (to: RouteLocationNormalized): Promise<RouteLocationRaw | Function | true> => {
  
  // Config
  const config = useRuntimeConfig()
  const auth = config.public.auth
  const rbac = auth.rbac
  let path = to.path
  auth.prefixes.forEach(prefix => {
    path = path.replace(prefix, '')
  });
  
  // look for matching rule
  for(let i = 0; i < rbac.length; i++)
  {
    const rule = rbac[i]
    if(minimatch(path, rule.path, rule.options?? 8))
    {
      // log
      console.log('match found!', rule.path)

      // OK - bypassAuth
      if(rule.bypassAuth) return true;
      
      const { get, set } = useAuthStorage();

      // KO - if no token at all
      if(!get('token')) {
        console.log('KO - if no token at all')
        return auth.endpoints.signIn.path
      }

      // OK - if rule.role = *
      if(rule.role && rule.role === '*') return true

      // KO - if no identity
      let rawIdentity = get('identity')
      
      if(rawIdentity === undefined || rawIdentity === null || rawIdentity === '') 
      {
        const { query } = useApi()
        const { data, error } = await query(auth.endpoints.getSession.url, {method: auth.endpoints.getSession.method})
        
        // KO - if no identity
        if(error.value){
          console.log('KO - if no identity')
          return auth.endpoints.signIn.path
        }
        const key = auth.endpoints.getSession.identityKey

        // @ts-ignore
        const id = key? data.value[key]: data.value
        
        rawIdentity = JSON.stringify(id)
        set('identity', rawIdentity)
      }
      
      const identity = JSON.parse(rawIdentity)

      // KO - if identity but no role
      if(!identity.role) 
      {
        console.log('KO - if identity but no role')
        return auth.endpoints.signIn.path
      }

      // OK - string role match
      if (typeof rule.role === 'string' && identity.role === rule.role ) return true

      // OK - role matched
      if(rule.role.find(identity.role) !== -1) return true
      
      // Unknow 
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
  }
  console.log('no match found for:', to.path);
  return rbac.length  === 0? true : auth.endpoints.signIn.path
}
