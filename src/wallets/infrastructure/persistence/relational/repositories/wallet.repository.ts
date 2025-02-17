import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from '../entities/wallet.entity';
import { WalletRepository } from '../../wallet.repository';
import { WalletMapper } from '../mappers/wallet.mapper';
import { Wallet } from '../../../../domain/wallet';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { DeepPartial } from '../../../../../utils/types/deep-partial.type';

@Injectable()
export class WalletRelationalRepository implements WalletRepository {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  async create(
    data: Omit<Wallet, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Wallet> {
    const persistenceModel = WalletMapper.toPersistence(data as Wallet);
    const newEntity = await this.walletRepository.save(
      this.walletRepository.create(persistenceModel),
    );
    return WalletMapper.toDomain(newEntity);
  }

  async findById(id: string): Promise<NullableType<Wallet>> {
    const entity = await this.walletRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    return entity ? WalletMapper.toDomain(entity) : null;
  }

  async findByUserId(userId: string): Promise<NullableType<Wallet>> {
    const entity = await this.walletRepository.findOne({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });
    return entity ? WalletMapper.toDomain(entity) : null;
  }

  async update(id: string, payload: DeepPartial<Wallet>): Promise<Wallet> {
    const entity = await this.walletRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!entity) {
      throw new Error('Wallet not found');
    }

    const updateEntity = this.walletRepository.merge(
      entity,
      WalletMapper.toPersistence(payload as Wallet),
    );

    const savedEntity = await this.walletRepository.save(updateEntity);
    return WalletMapper.toDomain(savedEntity);
  }

  async updateBalance(id: string, amount: number): Promise<Wallet> {
    const entity = await this.walletRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!entity) {
      throw new Error('Wallet not found');
    }

    entity.balance = Number(entity.balance) + amount;
    const savedEntity = await this.walletRepository.save(entity);
    return WalletMapper.toDomain(savedEntity);
  }
}
