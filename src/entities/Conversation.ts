
import {
    Entity,
    PrimaryGeneratedColumn,

    BaseEntity,
  
    OneToMany,

    ManyToMany,
    JoinTable
} from "typeorm";

import User from "./User";
import Message from "./Message";

@Entity()
 class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, (user) => user.conversations)
    @JoinTable()
    users: User[]

    @OneToMany(() => Message, (message) => message.conversationID)
    messages: Message[]
}

export default Conversation;