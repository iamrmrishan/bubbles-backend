import { FilesModule } from '../files/files.module';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { VerificationsController } from './verifications.controller';
import { RelationalVerificationsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    FilesModule,

    UsersModule,

    // import modules, etc.
    RelationalVerificationsPersistenceModule,
  ],
  controllers: [VerificationsController],
  providers: [VerificationsService],
  exports: [VerificationsService, RelationalVerificationsPersistenceModule],
})
export class VerificationsModule {}
