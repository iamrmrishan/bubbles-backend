import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'user_blocks',
})
export class UserBlocksEntity extends EntityRelationalHelper {
  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  blocker?: UserEntity | null;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  blockedId?: UserEntity | null;

  @ManyToMany(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn()
  blockerId?: UserEntity[] | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
