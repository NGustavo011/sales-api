import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column()
    name: string

  @Column()
    avatar: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date
}
