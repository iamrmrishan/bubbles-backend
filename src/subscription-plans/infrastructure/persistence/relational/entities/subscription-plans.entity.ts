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
  name: 'subscription_plans',
})
export class SubscriptionPlansEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Number,
  })
  duration: number;

  @Column({
    nullable: false,
    type: Number,
  })
  price: number;

  @Column({
    nullable: false,
    type: String,
  })
  description: string;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  user: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
