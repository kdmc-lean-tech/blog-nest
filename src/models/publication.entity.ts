import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
    publicImgId: string;
    @Column({ type: 'varchar', nullable: false })
    content: string;
    @Column({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @Column({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne(type => User, user => user.publications, { eager: false })
    @JoinColumn({ name: "user_id" })
    user: User;
}