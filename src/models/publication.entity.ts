import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Trend } from './trend.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity() 
export class Publication extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'varchar', nullable: false })
    title: string;
    @Column({ type: 'varchar', array: true, nullable: false })
    tags: string[];
    @Column({ type: 'varchar', nullable: false })
    content: string;
    @Column({ type: 'varchar', array: true, nullable: false })
    img: string[];
    @Column({ type: 'varchar', array: true, nullable: false })
    publicImgId: string[];
    @Column({ type: 'bool', nullable: false })
    active: boolean;
    @Column({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @Column({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne(type => User, user => user.publications, { eager: false })
    user: User;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne(type => Trend, trend => trend.publications, { eager: false })
    trend: Trend;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => Comment, comment => comment.publication, { eager: true })
    comments: Comment[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => Like, like => like.publication, { eager: true })
    likes: Like[];
}