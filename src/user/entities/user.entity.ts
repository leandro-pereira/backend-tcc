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

    @Column({ nullable: false, name: 'id_istagram', type: 'varchar' })
    idIstagram : string;

    @Column({ nullable: false, type: 'varchar' })
    password : string;

    @Column({ nullable: false, type: 'varchar' })
    tel : string;

    @Column({ nullable: false, type: 'date' })
    birthdate : Date;

    @Column({ nullable: false, name: 'is_business', type: 'boolean' })
    isBusiness : boolean;

    @Column({ nullable: true, type: 'varchar' })
    description

    @Column({ nullable: true, name: 'photo_url', type: 'varchar' })
    photoUrl : string;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
