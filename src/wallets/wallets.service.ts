import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { WalletRepository } from './infrastructure/persistence/wallet.repository';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UsersService } from '../users/users.service';
import { PaymentPort } from '../stripes/infrastructure/ports/payment.port';
import { VerificationsService } from '../verifications/verifications.service';

@Injectable()
export class WalletsService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly paymentPort: PaymentPort,
    private readonly usersService: UsersService,
    private readonly verificationService: VerificationsService,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    const user = await this.usersService.findById(
      createWalletDto.owner.id.toString(),
    );
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'userNotFound' },
      });
    }

    if (!user.email) {
      throw new Error('User email is required for Stripe account creation');
    }

    const verifiedUserDetails = await this.verificationService.findById(
      createWalletDto.owner.id.toString(),
    );

    if (!verifiedUserDetails) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { verifiedUserDetails: 'userVerificationNotFound' },
      });
    }

    const stripeId = user.isCreator
      ? await this.paymentPort.createConnectedAccount({
          email: user.email,
          country: 'US',
        })
      : await this.paymentPort.createCustomer({
          email: user.email,
          name: verifiedUserDetails?.fullName || user.email, // fallback to email if no name
        });
    return this.walletRepository.create({
      owner: user,
      balance: 0,
      stripeAccountId: user.isCreator ? stripeId : null,
      stripeCustomerId: !user.isCreator ? stripeId : null,
      currency: 'USD',
      isActive: false,
    });
  }

  async findById(id: string) {
    return this.walletRepository.findById(id);
  }

  async findByUserId(userId: string) {
    return this.walletRepository.findByUserId(userId);
  }

  async updateBalance(id: string, amount: number) {
    return this.walletRepository.updateBalance(id, amount);
  }
}
