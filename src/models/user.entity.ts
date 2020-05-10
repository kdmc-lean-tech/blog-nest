import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ROLES } from '../enums/roles.enum';
import { Publication } from './publication.entity';

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
    @Column({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @Column({ type: 'bool', nullable: false })
    active: boolean;
    @Column({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => Publication, publication => publication.user, { eager: true })
    @JoinColumn()
    publications: Publication[];
}
