import { SubscriptionPlanEntity } from '../../../../../subscription-plans/infrastructure/persistence/relational/entities/subscription-plans.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'messages',
})
export class MessagesEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  sentAt: string;

  @ManyToOne(() => SubscriptionPlanEntity, { eager: true, nullable: false })
  plan: SubscriptionPlanEntity;

  @Column({
    nullable: false,
    type: String,
  })
  MessageContent: string;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  receiver: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  sender: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
