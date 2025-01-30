import { SubscriptionPlansEntity } from '../../../../../subscription-plans/infrastructure/persistence/relational/entities/subscription-plans.entity';

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
  name: 'subscriptions',
})
export class SubscriptionsEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  endDate: string;

  @Column({
    nullable: false,
    type: String,
  })
  startDate: string;

  @Column({
    nullable: false,
    type: String,
  })
  status: string;

  @ManyToOne(() => SubscriptionPlansEntity, { eager: true, nullable: false })
  plan: SubscriptionPlansEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  subscriber: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
