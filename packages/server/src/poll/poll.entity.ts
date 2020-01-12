// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { User } from '../user/user.entity';
// import { PollOption } from './pollOption.entity';
// import { ObjectType, Field } from 'type-graphql';

// @ObjectType()
// @Entity()
// export class Poll {
//   @Field()
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Field()
//   @Column('text')
//   name: string;

//   @Field()
//   @Column()
//   userId: string; // added in 12

//   @ManyToOne(
//     () => User,
//     user => user.poll,
//   )
//   // @JoinColumn()
//   user: Promise<User>; // generated a userId

//   @Field(() => [PollOption])
//   @OneToMany(
//     () => PollOption,
//     pollOption => pollOption.poll,
//   )
//   pollOption: Promise<PollOption[]>;
// }

import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PollOption } from './pollOption.entity';

@ObjectType()
@Entity()
export class Poll {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column()
  userId: string;

  @ManyToOne(
    () => User,
    user => user.poll,
  )
  user: Promise<User>; // generated a userId

  @Field(() => [PollOption])
  @OneToMany(
    () => PollOption,
    pollOption => pollOption.poll,
  )
  pollOption: Promise<PollOption[]>;
}
