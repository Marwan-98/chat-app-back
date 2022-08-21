
import {
    Entity,
    PrimaryGeneratedColumn,

    BaseEntity,
  
    OneToMany,

    ManyToMany,
    JoinTable,
    Column
} from "typeorm";

import User from "./User";
import Message from "./Message";

@Entity()
 class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    title: string

    @ManyToMany(() => User, (user) => user.conversations)
    @JoinTable()
    users: User[]

    @OneToMany(() => Message, (message) => message.conversationID)
    messages: Message[]
}

export default Conversation;