import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Poll } from './poll.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class PollOption {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  text: string;

  @Field()
  @Column('integer')
  votes: number;

  // added:
  @Field()
  @Column()
  pollId: number;

  @ManyToOne(
    () => Poll,
    poll => poll.pollOption,
    { onDelete: 'CASCADE' },
  )
  // @JoinColumn()  //deleted
  poll: Promise<Poll>; // generated a  pollId
}
