import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity() 
export class Publication extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'varchar', nullable: false })
    title: string;
    @Column({ type: 'varchar', nullable: false })
    subtitle: string;
    @Column({ type: 'varchar', nullable: false })
    img: string;
    @Column({ type: 'varchar', nullable: false })
    public_id: string;
    @Column({ type: 'varchar', nullable: false })
    content: string;
    @Column({ type: 'timestamp', name: 'created_at' })
    created_at: Date;
    @Column({ type: 'timestamp', name: 'updated_at' })
    updated_at: Date;
    @ManyToOne(type => User, user => user.publications, { eager: false })
    @JoinColumn({ name: "user_id" })
    user: User;
}