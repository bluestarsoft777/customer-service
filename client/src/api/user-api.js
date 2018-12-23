import api from './api'

function login (loginData) {
  return api.post('/api/users/login', loginData)
}

function register (registrationData) {
  return api.post('/api/users/register', registrationData)
}

function load (token) {
  return api.get(`/api/users/profile`)
}

// function update (userData) {
//   return api.put('/api/users/profile', userData)
// }

function getAll () {
  return api.get('/api/users')
}

function deleteUser (userId) {
  return api.delete(`/api/users/${userId}`)
}

function create (userData) {
  return api.post(`/api/users/`, userData)
}

function update (userId, userData) {
  return api.put(`/api/users/${userId}`, userData)
}

function get (userId) {
  return api.get(`/api/users/${userId}`)
}

export {
  login,
  register,
  update,
  load,
  getAll,
  deleteUser,
  create,
  get
}
