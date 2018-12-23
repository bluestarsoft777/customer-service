import { userRepository } from './interfaces/storage/userRepository'
import { customerRepository } from './interfaces/storage/customerRepository'
// import { makeGetUserProfile } from './app/getUserProfile'
// import { makeLoginUser } from './app/loginUser';
// import { makeRegisterUser } from './app/registerUser'
import { makeGetCustomerList } from './app/getCustomerList'
import { makeGetCustomer } from './app/getCustomer'
import { emailService } from './infrastructure/email'

// const getUserProfile = makeGetUserProfile({ userRepository })
// const loginUser = makeLoginUser({ userRepository })
// const registerUser = makeRegisterUser({ userRepository, emailService })

const getCustomerList = makeGetCustomerList({customerRepository})
const getCustomer = makeGetCustomer({customerRepository})


export const container = {
  getCustomer,
  getCustomerList
  // loginUser,
  // registerUser
}

export type Container = typeof container
