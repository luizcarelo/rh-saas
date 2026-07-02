import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {

    const existing = await this.userRepo.findOne({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Usuário já cadastrado.',
      );
    }

    const passwordHash = await bcrypt.hash(
      data.password,
      10,
    );

    const user = this.userRepo.create({
      tenantId: data.tenantId,
      email: data.email,
      passwordHash,
      isActive: true,
    });

    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async findAll() {
    return this.userRepo.find({
      order: {
        email: 'ASC',
      },
    });
  }

}