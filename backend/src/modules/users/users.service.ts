import { AuditService } from '../audit/audit.service';
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

    private readonly auditService: AuditService,
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

    const savedUser =
      await this.userRepo.save(user);

    await this.auditService.create({
      tenantId: savedUser.tenantId,
      entityId: savedUser.id,
      action: 'USER_CREATED',
      entityType: 'User',
      details: savedUser.email,
    });

    return savedUser;
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

    const users = await this.userRepo.find({
      order: {
        email: 'ASC',
      },
    });

    return users.map(
      ({ passwordHash, ...user }) => user,
    );
  }
}