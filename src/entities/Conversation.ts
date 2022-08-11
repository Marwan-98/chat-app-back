
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable
} from "typeorm";

import User from "./User";
import Message from "./Message";
import ConversationTable from "./Conversation_User"

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