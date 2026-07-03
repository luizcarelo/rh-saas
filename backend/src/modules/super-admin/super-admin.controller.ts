import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { SuperAdminService } from './super-admin.service';

@Controller('v1/super-admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuperAdminController {

  constructor(
    private readonly service: SuperAdminService,
  ) {}

  @Get('health')
  @Roles('SUPER_ADMIN' as any)
  health() {
    return this.service.health();
  }

  @Get('clients')
  @Roles('SUPER_ADMIN' as any)
  async clients() {
    return this.service.listClients();
  }
}
