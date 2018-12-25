export default function renderRole (profileData) {
  const rolePath = 'https://customer-service.com/roles'
  const roleIdentifiers = profileData[rolePath]
  const userRoles = roleIdentifiers
    .map(normalizeRole)
    .join('')

  return userRoles
}

function normalizeRole (roleIdentifier) {
  const role = roleIdentifier
    .split('-')
    .map(upperCaseFirstLetter)
    .join(' ')

  return role
}

function upperCaseFirstLetter (str = '') {
  return str[0].toUpperCase() + str.slice(1)
}
