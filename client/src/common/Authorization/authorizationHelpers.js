const rolePath = 'https://customer-service.com/roles'

export function getRoles (profileData) {
  return profileData[rolePath]
}

export function isBasic (profileData) {
  const userRoles = profileData[rolePath]
  return userRoles.includes('basic')
}

export function isSalesRepresentative (profileData) {
  const userRoles = profileData[rolePath]
  return userRoles.includes('sales-representative')
}

export function isUserLoginSaved () {
  return window.localStorage.getItem('isLoggedIn') === 'true'
}

export function saveUserLogin () {
  window.localStorage.setItem('isLoggedIn', 'true')
}

export function clearUserLogin () {
  window.localStorage.removeItem('isLoggedIn')
}
