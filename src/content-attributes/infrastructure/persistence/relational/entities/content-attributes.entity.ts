import { ContentEntity } from '../../../../../contents/infrastructure/persistence/relational/entities/content.entity';

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
  name: 'content_attributes',
})
export class ContentAttributesEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  value: string;

  @Column({
    nullable: false,
    type: String,
  })
  key: string;

  @ManyToOne(() => ContentEntity, { eager: true, nullable: false })
  content: ContentEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
