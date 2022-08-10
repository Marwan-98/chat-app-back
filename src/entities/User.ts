
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,

} from "typeorm";

@Entity("user")
 class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;


    @Column()
    email: string;

    @Column()
    password: string;


    @CreateDateColumn({ type: "timestamp" })
    date_created: Date;

    @UpdateDateColumn({ type: "timestamp" })
    date_updated: Date;
}

export default User;