import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'verifications',
})
export class VerificationsEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  verifiedBy?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  verifiedAt?: string | null;

  @Column({
    nullable: false,
    type: Boolean,
    default: false,
  })
  isVerified: boolean;

  @Column({
    nullable: true,
    type: String,
  })
  rejectionReason?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  status: string;

  @OneToOne(() => FileEntity, { eager: true, nullable: false })
  @JoinColumn()
  selfieWithId: FileEntity;

  @OneToOne(() => FileEntity, { eager: true, nullable: false })
  @JoinColumn()
  idDocument: FileEntity;

  @Column({
    nullable: false,
    type: String,
  })
  address: string;

  @Column({
    nullable: false,
    type: String,
  })
  state: string;

  @Column({
    nullable: false,
    type: String,
  })
  country: string;

  @Column({
    nullable: false,
    type: String,
  })
  dateOfBirth: string;

  @Column({
    nullable: false,
    type: String,
  })
  fullName: string;

  @OneToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn()
  user: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
