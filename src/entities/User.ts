
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    ManyToMany


} from "typeorm";

import Message from "./Message";
import Conversation from "./Conversation";

@Entity()
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

   @OneToMany(() => Message, (message) => message.user)
   messages: Message[];

   @ManyToMany(() => Conversation, (conversation) => conversation.users)
   conversations: Conversation[]
}

export default User;