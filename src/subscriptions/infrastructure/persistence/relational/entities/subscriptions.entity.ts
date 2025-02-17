import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SubscriptionPlanEntity } from '../../../../../subscription-plans/infrastructure/persistence/relational/entities/subscription-plans.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SubscriptionStatus } from '../../../../domain/subscriptions';

@Entity({ name: 'subscription' })
export class SubscriptionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  subscriber: UserEntity;

  @ManyToOne(() => SubscriptionPlanEntity)
  plan: SubscriptionPlanEntity;

  @Column()
  stripeSubscriptionId: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
