
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany

} from "typeorm";

import User from "./User";
import Conversation from "./Conversation";

@Entity()
 class ConversationTable extends BaseEntity {
    @PrimaryGeneratedColumn()
     id: number;

 @OneToMany(() => Conversation, (conversation) => conversation.conversationTableID)
 conversationID: Conversation[]

 @OneToMany(() => User, (user) => user.conversationTableID)
 userID: User[]
}

export default ConversationTable;