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
import { User } from '../../user/entities/user.entity'

@Entity()
export class Publication extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    userId : User;

    @ManyToOne(type => User, user => user.id, { nullable: true})
    @JoinColumn({ name: "user_sorted" })
    userSorted : string;

    @Column({ nullable: true, type: 'varchar' })
    description : string;

    @Column({ nullable: true, name: "thumbnail_url", type: 'varchar' })
    thumbnailUrl : string;

    @Column({nullable : true, name: 'deleted_at', type: 'timestamp'})
    deletedAt: Date;
}
