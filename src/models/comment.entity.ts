import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Publication } from './publication.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', nullable: false })
  text: string;
  @Column({ type: 'bool', nullable: false })
  active: boolean;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Publication, publication => publication.comments, { eager: false } )
  publication: Publication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => User, user => user.comment, { eager: false })
  user: User;
}