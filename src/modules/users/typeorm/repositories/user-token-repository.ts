import { EntityRepository, Repository } from 'typeorm'
import { UserToken } from '../entities/user-token'
import { v4 as uuidv4 } from 'uuid'

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository <UserToken> {
  public async findByToken (token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token
      }
    })
    return userToken
  }

  public async generateToken (userId: number): Promise<UserToken> {
    const userToken = this.create({
      user_id: userId,
      token: uuidv4()
    })
    await this.save(userToken)
    return userToken
  }
}
