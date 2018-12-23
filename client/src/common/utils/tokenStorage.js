const key = 'footbal_manager_token'

const tokenStorage = {
  getToken: () => window.localStorage.getItem(key),
  saveToken: (token) => window.localStorage.setItem(key, token),
  clearToken: () => window.localStorage.removeItem(key)
}

export default tokenStorage
