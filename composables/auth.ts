
export const useAuth = () => {

  // Storage
  const storage = useAuthStorage();

  // auth 
  const getIdentity = () => {
    const rawIdentity = storage.get('identity')
    if(rawIdentity === undefined || rawIdentity === null || rawIdentity === '') return null
    return JSON.parse(rawIdentity)
  }

  return { getIdentity }
}