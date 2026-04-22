import { Point } from './point-model.ts'
import { ObjectId } from 'bson'
import type { BSON, bsonType } from 'bson'
class User {
  id: ObjectId
  name: string
  email: string
  svg_map: string
  points: Point[]
  constructor(
    id: ObjectId = new ObjectId(ObjectId.generate()),
    name: string = '',
    email: string = '',
    svg_map: string = '',
    points: Point[] = [],
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.svg_map = svg_map
    this.points = points
    Object.assign(this, User)
  }
}
function parseUser(user_str: string): User {
  const user_obj = JSON.parse(user_str) as User
  return Object.assign(user_obj, User)
}
function parseUsers(user_str: string): User[] {
  const user_obj = JSON.parse(user_str) as User[]
  return user_obj.map((user) => Object.assign(user, User))
}

export { User, parseUser, parseUsers }
