import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ROLES } from '../enums/roles.enum';
import { Publication } from './publication.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    username: string;
    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;
    @Column({ type: 'varchar', nullable: false })
    password: string;
    @Column({ type: 'varchar', nullable: true })
    img: string;
    @Column({ type: 'varchar', default: ROLES.USER })
    rol: ROLES;
    @Column({ type: 'bool', nullable: false })
    active: boolean;
    @Column({ type: 'varchar', nullable: false }) 
    publicImgId: string;
    @Column({ type: 'timestamp' })
    createdAt: Date;
    @Column({ type: 'timestamp' })
    updatedAt: Date;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => Publication, publication => publication.user, { eager: true })
    publications: Publication[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => Comment, comment => comment.user, { eager: true })
    comment: Comment[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => Like, like => like.user, { eager: true })
    likes: Like[];
}
