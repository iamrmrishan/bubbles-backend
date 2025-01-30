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
import { ContentEntity } from '../../../../../contents/infrastructure/persistence/relational/entities/content.entity';

@Entity({
  name: 'content_report',
})
export class ContentReportEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  resolutionNote?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  reason?: string | null;

  @ManyToOne(() => ContentEntity, { eager: true, nullable: false })
  contentId: ContentEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  reporterId?: UserEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
