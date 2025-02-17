import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { NullableType } from '../../../utils/types/nullable.type';
import { Payment } from '../../domain/payment';

export abstract class PaymentRepository {
  abstract create(
    data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Payment>;
  abstract findById(id: string): Promise<NullableType<Payment>>;
  abstract findOne(options: {
    where: FindOptionsWhere<Payment>;
  }): Promise<NullableType<Payment>>;
  abstract find(options?: {
    where: FindOptionsWhere<Payment> | FindOptionsWhere<Payment>[];
  }): Promise<Payment[]>;
  abstract update(id: string, payload: DeepPartial<Payment>): Promise<Payment>;
  abstract createQueryBuilder(alias: string): any;
  abstract findByWalletId(walletId: string): Promise<Payment[]>;
}
