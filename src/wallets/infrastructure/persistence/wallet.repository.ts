import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Wallet } from '../../domain/wallet';

export abstract class WalletRepository {
  abstract create(
    data: Omit<Wallet, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Wallet>;
  abstract findById(id: string): Promise<NullableType<Wallet>>;
  abstract findByUserId(userId: string): Promise<NullableType<Wallet>>;
  abstract update(id: string, payload: DeepPartial<Wallet>): Promise<Wallet>;
  abstract updateBalance(id: string, amount: number): Promise<Wallet>;
}
