const maxRetry:number = 3

export interface CakeResponse<T> {
  data: T | T[] | null;
  pagination?: Record<string, any>;
  success: boolean;
  message?: string;
}

export interface ApiResult<T> {
  loading: boolean;
  data: T | T[] | null;
  error: Error | null;
}

export interface IFetch {
  loading: boolean;
  response: ApiResult<any> | null;
  query: Record<string, any>;
}

export class Fetch implements IFetch {
  response: ApiResult<any> | null = null;
  loading = false;
  query = {};
  fetch = async <T>(method: string, url: string, opt: Record<string, any>): Promise<void> => {}
}

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

  // new methods
  const fetch = async <T>(url: string, opt: Record<string, any>):Promise<ApiResult<T>> => {
    const options = Object.assign(apiConfig, {key: url},opt);
    const {data, error} = await useFetch(url, options);

    if(error.value) return {data: null, error: error.value} as ApiResult<T>;
    const cakeResponse = data.value as CakeResponse<T>;
    if(!cakeResponse.success) return {data: null, error: new Error(cakeResponse.message)} as ApiResult<T>;
    return {data: cakeResponse.data, pagination: cakeResponse.pagination, error: null, loading: false} as ApiResult<T>;
  }

  /*
  const fetch = new Fetch();
  fetch.fetch = async <T>(method: string, url: string, opt: Record<string, any>): Promise<void> => {
    fetch.loading = true;
    fetch.response = await _fetch<T>(url, Object.assign({method: method, query: fetch.query}, opt || {}));
    fetch.loading = false;
  }
  */

  const get = async <DataT>(url: string, opt: Record<string, any> | null) => await <DataT>query(url, Object.assign({method: 'get'}, opt || {}))
  const post = async <DataT>(url: string, opt: Record<string, any> | null) => await <DataT>query(url, Object.assign({method: 'post'}, opt || {}))
  const put = async <DataT>(url: string, opt: Record<string, any> | null) => await <DataT>query(url, Object.assign({method: 'put'}, opt || {}))
  const del = async <DataT>(url: string, opt: Record<string, any> | null) => await <DataT>query(url, Object.assign({method: 'delete'}, opt || {}))

  return { fetch, query, get, post, put, del }
}