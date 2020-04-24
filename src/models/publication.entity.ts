import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Publication extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    subtitle: string;
    @Column()
    img: string;
    @Column()
    public_id: string;
    @Column()
    content: string;
    @Column()
    create_at: Date
    @Column()
    update_at: Date
}