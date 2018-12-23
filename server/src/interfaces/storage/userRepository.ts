import db from '../../infrastructure/db'
import humps from 'humps'
import { UserRepository, User, EditUser, toUser } from '../../domain/user';

const userColumns = ['id', 'email', 'first_name', 'last_name', 'user_type_id']

export const userRepository : UserRepository = {
  create,
  getAll,
  getOne,
  findByEmail,
  delete: _delete, // workaround for delete keyword
  update
}

async function create (userData: any) : Promise<User> {
  const user = humps.decamelizeKeys(userData)

  const [createdUser] = await db('users')
    .insert(user)
    // .transacting(transaction)
    .returning(userColumns)

  const userEntry = humps.camelizeKeys(createdUser)
  return toUser(userEntry)
}

async function getAll (/*transaction*/) : Promise<User[]> {
  const userEntries = await db('users')
    // .transacting(transaction)
    .select(userColumns)

  return userEntries.map((userEntry: any) => {
    const user = humps.camelizeKeys(userEntry)
    return toUser(user)
  })
}

async function getOne (userId : number) : Promise<User|null> {
  const user = await db('users')
    .first(userColumns)
    // .transacting(transaction)
    .where({ id: userId })

  const userEntry = humps.camelizeKeys(user)
  return toUser(userEntry)
}

async function findByEmail (email : string) : Promise<User|null> {
  const user = await db('users')
    .first([...userColumns, 'password'])
    // .transacting(transaction)
    .where({ email })

  const userEntry = humps.camelizeKeys(user)
  return toUser(userEntry)
}

async function _delete (userId : number) : Promise<any> {
  await db('users')
    .where('id', userId)
    .del()
    // .transacting(transaction)

  return userId
}

async function update (userId : number, userData : EditUser) : Promise<User> {
  const updateData = humps.decamelizeKeys(userData)

  const [user] = await db('users')
    .update(updateData)
    .where('id', userId)
    // .transacting(transaction)
    .returning(userColumns)

  const userEntry = humps.camelizeKeys(user)
  return toUser(userEntry)
}
