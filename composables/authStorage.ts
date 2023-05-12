export const useAuthStorage = () => {
  
  // Config
  const config = useRuntimeConfig()
  const auth = config.public.auth
  const defaultToken = config.public.apiToken;

  const useLocale = (key: string) => {
    if(!process.client) return false;
    if(key === 'token') return auth.token.useLocaleStorage;
    if(key == 'identity') return auth.identity.useLocaleStorage;
    return false;
  }

  const getKey = (key: string) => `auth.${key}`

  const set = (key: string, value: string) => {
    if(useLocale(key)) localStorage.setItem(getKey(key), value)
    else useState(getKey(key)).value = value;
  }

  const get = (key: string) => {
    let value:string| null = null;
    if(useLocale(key)) value = localStorage.getItem(getKey(key))
    else value = useState<string |null>(getKey(key)).value

    if((value === null || value === '') && key === 'token' && auth.token.fallbackToApiToken) value = defaultToken;

    return value;
  }
  
  return { set, get }
}
