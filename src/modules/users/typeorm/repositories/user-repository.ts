import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities/user'

@EntityRepository(User)
export class UserRepository extends Repository <User> {
  public async findByName (name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name
      }
    })
    return user
  }

  public async findById (id: number): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id
      }
    })
    return user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email
      }
    })
    return user
  }
}
