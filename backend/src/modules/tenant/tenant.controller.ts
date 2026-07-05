import {
  Controller,
  Get,
  Put,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantService } from './tenant.service';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('v1/tenant')
@UseGuards(JwtAuthGuard)
export class TenantController {

  constructor(
    private readonly tenantService: TenantService,
  ) {}

  @Get()
  async getTenant(
    @Req() req: any,
  ) {
    return this.tenantService.findOne(
      req.user.tenantId,
    );
  }

  @Put()
  async updateTenant(
    @Req() req: any,
    @Body() dto: UpdateTenantDto,
  ) {
    return this.tenantService.update(
      req.user.tenantId,
      dto,
    );
  }
}
