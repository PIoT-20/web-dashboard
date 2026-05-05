import { Point } from './point-model.ts'
import { EJSON, ObjectId } from 'bson'

class User {
  _id: ObjectId
  name: string
  email: string
  svg_map: string
  points: Point[]
  constructor(
    id: ObjectId = new ObjectId(),
    name: string = '',
    email: string = '',
    svg_map: string = '',
    points: Point[] = [],
  ) {
    this._id = id
    this.name = name
    this.email = email
    this.svg_map = svg_map
    this.points = points
  }
}
function parseUser(user_str: string): User {
  const user_obj = EJSON.parse(user_str) as User
  return Object.assign(new User(), user_obj)
}
function parseUsers(user_str: string): User[] {
  const users: User[] = EJSON.parse(user_str)
  return users.map((user) => Object.assign(new User(), user))
}

export { User, parseUser, parseUsers }
