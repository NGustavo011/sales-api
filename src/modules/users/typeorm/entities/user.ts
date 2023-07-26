import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import env from '@config/env'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column()
    name: string

  @Column()
    email: string

  @Column()
  @Exclude()
    password: string

  @Column()
    avatar: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl (): string | null {
    if (!this.avatar) { return null }
    return `${env.apiUrl}/files/${this.avatar}`
  }
}
