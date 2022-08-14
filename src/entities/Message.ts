
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne

} from "typeorm";

import User from "./User";
import Conversation from "./Conversation";

@Entity()
 class Message extends BaseEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 body: string;

 @CreateDateColumn({ type: "timestamp" })
 date_created: Date;

 @UpdateDateColumn({ type: "timestamp" })
 date_updated: Date;

 @ManyToOne(() => User, (user) => user.messages)
 user: User

 @ManyToOne(() => Conversation, (conversation) => conversation.messages)
 conversationID: Conversation
}

export default Message;