const maxRetry:number = 3

export const useApi = () => {

  // Config
  const config = useRuntimeConfig();
  //console.log(config);

  // Storage
  const storage = useAuthStorage();

  // auth 
  const apiConfig = {
    baseURL: config.public.apiUrl,
    headers: {
      'Authorization': 'Bearer ' + storage.get('token'),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    initialCache: config.public.api.initialCache,
  }

  // methods
  const query = async <DataT>(url: string, opt: Record<string, any>) => {
    const options = Object.assign(apiConfig, {key: url},opt)
    
    return await useFetch<DataT>(url, options)
  }

  const get = async (url: string, opt: Record<string, any> | null) => await query(url, Object.assign({method: 'get'}, opt || {}))
  const post = async (url: string, opt: Record<string, any> | null) => await query(url, Object.assign({method: 'post'}, opt || {}))
  const put = async (url: string, opt: Record<string, any> | null) => await query(url, Object.assign({method: 'put'}, opt || {}))
  const del = async (url: string, opt: Record<string, any> | null) => await query(url, Object.assign({method: 'delete'}, opt || {}))

  return { apiUrl: config.public.apiUrl, token: storage.get('token'), query, get, post, put, del }
}