import { Module } from '@nestjs/common';
import { VerificationsRepository } from '../verifications.repository';
import { VerificationsRelationalRepository } from './repositories/verifications.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationsEntity } from './entities/verifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationsEntity])],
  providers: [
    {
      provide: VerificationsRepository,
      useClass: VerificationsRelationalRepository,
    },
  ],
  exports: [VerificationsRepository],
})
export class RelationalVerificationsPersistenceModule {}
