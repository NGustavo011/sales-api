import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column()
    token: string

  @Column()
    user_id: number

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date
}
