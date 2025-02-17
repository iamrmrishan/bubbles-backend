import { Payment } from '../../../../domain/payment';
import { PaymentEntity } from '../entities/payment.entity';
import { WalletMapper } from '../../../../../wallets/infrastructure/persistence/relational/mappers/wallet.mapper';

export class PaymentMapper {
  static toDomain(raw: PaymentEntity): Payment {
    const payment = new Payment();
    payment.id = raw.id;
    payment.type = raw.type;
    payment.amount = Number(raw.amount);
    payment.platformFee = Number(raw.platformFee);
    payment.creatorAmount = Number(raw.creatorAmount);
    if (raw.fromWallet) {
      payment.fromWallet = WalletMapper.toDomain(raw.fromWallet);
    }
    if (raw.toWallet) {
      payment.toWallet = WalletMapper.toDomain(raw.toWallet);
    }
    payment.stripePaymentId = raw.stripePaymentId;
    payment.status = raw.status;
    payment.createdAt = raw.createdAt;
    payment.updatedAt = raw.updatedAt;
    return payment;
  }

  static toPersistence(domain: Payment): PaymentEntity {
    const entity = new PaymentEntity();
    if (domain.id) {
      entity.id = domain.id;
    }
    entity.type = domain.type;
    entity.amount = domain.amount;
    entity.platformFee = domain.platformFee;
    entity.creatorAmount = domain.creatorAmount;
    if (domain.fromWallet) {
      entity.fromWallet = WalletMapper.toPersistence(domain.fromWallet);
    }
    if (domain.toWallet) {
      entity.toWallet = WalletMapper.toPersistence(domain.toWallet);
    }
    entity.stripePaymentId = domain.stripePaymentId;
    entity.status = domain.status;
    if (domain.createdAt) {
      entity.createdAt = domain.createdAt;
    }
    if (domain.updatedAt) {
      entity.updatedAt = domain.updatedAt;
    }
    return entity;
  }
}
