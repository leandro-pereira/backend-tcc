import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';

@Entity()
export class User  extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({ nullable: false, type: 'varchar' })
    fullname : string;

    @Column({ nullable: false, type: 'varchar' })
    email : string;

    @Column({ nullable: false, type: 'varchar' })
    password : string;

    @Column({ nullable: true, type: 'date' })
    birthdate : Date;

    @Column({ nullable: true, name: 'photo_url', type: 'varchar' })
    photoUrl : string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
