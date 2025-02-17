import { Wallet } from '../../../../domain/wallet';
import { WalletEntity } from '../entities/wallet.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

export class WalletMapper {
  static toDomain(raw: WalletEntity): Wallet {
    const wallet = new Wallet();
    wallet.id = raw.id;
    wallet.balance = Number(raw.balance); // Convert decimal to number
    wallet.stripeAccountId = raw.stripeAccountId;
    wallet.stripeCustomerId = raw.stripeCustomerId;
    if (raw.owner) {
      wallet.owner = UserMapper.toDomain(raw.owner);
    }
    wallet.createdAt = raw.createdAt;
    wallet.updatedAt = raw.updatedAt;
    return wallet;
  }

  static toPersistence(domain: Wallet): WalletEntity {
    const entity = new WalletEntity();
    if (domain.id) {
      entity.id = domain.id;
    }
    entity.balance = domain.balance;
    entity.stripeAccountId = domain.stripeAccountId as string;
    entity.stripeCustomerId = domain.stripeCustomerId as string;
    if (domain.owner) {
      entity.owner = UserMapper.toPersistence(domain.owner);
    }
    if (domain.createdAt) {
      entity.createdAt = domain.createdAt;
    }
    if (domain.updatedAt) {
      entity.updatedAt = domain.updatedAt;
    }
    return entity;
  }
}
