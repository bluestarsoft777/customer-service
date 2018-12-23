export type User = {
  name: string,
  email: string,
  password: string
}

export type EditUser = {
  name?: string
  // ...optional fields
}

export function toUser (userData: any) : User {
  return {
    name: userData.name,
    email: userData.email,
    password: ''
  }
}


export type UserRepository = {
  create: (userData: any) => Promise<User>,
  delete: (userId: number) => Promise<any>,
  update: (userId: number, userData: EditUser) => Promise<User>,
  findByEmail: (email: string) => Promise<User|null>,
  getOne: (userId: number) => Promise<User|null>,
  getAll: (userId: number) => Promise<User[]>
}
