import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Publication } from './publication.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'bool', nullable: false })
  status: boolean;
  @Column({ type: 'bool', nullable: false })
  active: boolean;
  @Column({ type: 'int', nullable: false })
  quantity: number;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => User, user => user.likes, { eager: false })
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Publication, publication => publication.likes, { eager: false })
  publication: Publication;
}