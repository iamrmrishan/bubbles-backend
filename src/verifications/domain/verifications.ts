import { FileType } from '../../files/domain/file';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Verifications {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  verifiedBy?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  verifiedAt?: string | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  isVerified: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  rejectionReason?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  status: string;

  @ApiProperty({
    type: () => FileType,
    nullable: false,
  })
  selfieWithId: FileType;

  @ApiProperty({
    type: () => FileType,
    nullable: false,
  })
  idDocument: FileType;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  address: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  state: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  country: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  dateOfBirth: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  fullName: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
