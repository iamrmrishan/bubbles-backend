import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'content',
})
export class ContentEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  title: string;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  creator: UserEntity;

  @Column({ nullable: true, type: 'text' })
  visibility?: string;

  @Column({ nullable: true, type: 'decimal' })
  ppvPrice?: number;

  @Column('text', { array: true, nullable: true })
  tags?: string[];

  @ManyToMany(() => FileEntity, { eager: true })
  @JoinTable({ name: 'content_media' })
  media?: FileEntity[] | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
