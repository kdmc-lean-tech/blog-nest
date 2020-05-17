import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Publication } from './publication.entity';

@Entity()
export class Trend extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'bool', nullable: false })
  active: boolean;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Publication, publication => publication.trend, { eager: true })
  publications: Publication[];
}