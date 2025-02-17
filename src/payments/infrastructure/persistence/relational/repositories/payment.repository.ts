// src/payments/infrastructure/persistence/relational/repositories/payment.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentRepository } from '../../payment.repository';
import { PaymentMapper } from '../mappers/payment.mapper';
import { Payment } from '../../../../domain/payment';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { DeepPartial } from '../../../../../utils/types/deep-partial.type';

@Injectable()
export class PaymentRelationalRepository implements PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async create(
    data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Payment> {
    const persistenceModel = PaymentMapper.toPersistence(data as Payment);
    const newEntity = await this.paymentRepository.save(
      this.paymentRepository.create(persistenceModel),
    );
    return PaymentMapper.toDomain(newEntity);
  }

  async findById(id: string): Promise<NullableType<Payment>> {
    const entity = await this.paymentRepository.findOne({
      where: { id },
      relations: ['fromWallet', 'toWallet'],
    });
    return entity ? PaymentMapper.toDomain(entity) : null;
  }

  async findOne(options: {
    where: FindOptionsWhere<Payment>;
  }): Promise<NullableType<Payment>> {
    const entity = await this.paymentRepository.findOne({
      where: options.where as unknown as FindOptionsWhere<PaymentEntity>,
      relations: ['fromWallet', 'toWallet'],
    });
    return entity ? PaymentMapper.toDomain(entity) : null;
  }

  async find(options?: {
    where: FindOptionsWhere<Payment> | FindOptionsWhere<Payment>[];
  }): Promise<Payment[]> {
    const entities = await this.paymentRepository.find({
      where: options?.where as unknown as
        | FindOptionsWhere<PaymentEntity>
        | FindOptionsWhere<PaymentEntity>[],
      relations: ['fromWallet', 'toWallet'],
    });
    return entities.map((entity) => PaymentMapper.toDomain(entity));
  }

  async update(id: string, payload: DeepPartial<Payment>): Promise<Payment> {
    const entity = await this.paymentRepository.findOne({
      where: { id },
      relations: ['fromWallet', 'toWallet'],
    });

    if (!entity) {
      throw new Error('Payment not found');
    }

    const updateEntity = this.paymentRepository.merge(
      entity,
      PaymentMapper.toPersistence(payload as Payment),
    );

    const savedEntity = await this.paymentRepository.save(updateEntity);
    return PaymentMapper.toDomain(savedEntity);
  }

  async findByStripePaymentId(
    stripePaymentId: string,
  ): Promise<NullableType<Payment>> {
    const entity = await this.paymentRepository.findOne({
      where: { stripePaymentId },
      relations: ['fromWallet', 'toWallet'],
    });
    return entity ? PaymentMapper.toDomain(entity) : null;
  }

  async findByFromWallet(walletId: string): Promise<Payment[]> {
    const entities = await this.paymentRepository.find({
      where: { fromWallet: { id: walletId } },
      relations: ['fromWallet', 'toWallet'],
    });
    return entities.map((entity) => PaymentMapper.toDomain(entity));
  }

  async findByToWallet(walletId: string): Promise<Payment[]> {
    const entities = await this.paymentRepository.find({
      where: { toWallet: { id: walletId } },
      relations: ['fromWallet', 'toWallet'],
    });
    return entities.map((entity) => PaymentMapper.toDomain(entity));
  }

  async findByWalletId(walletId: string): Promise<Payment[]> {
    return this.find({
      where: [{ fromWallet: { id: walletId } }, { toWallet: { id: walletId } }],
    });
  }

  createQueryBuilder(alias: string) {
    return this.paymentRepository.createQueryBuilder(alias);
  }

  async remove(id: string): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
