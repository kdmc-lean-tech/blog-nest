import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    created_at: Date
    @Column({ type: 'timestamp', name: 'updated_at' })
    updated_at: Date
}