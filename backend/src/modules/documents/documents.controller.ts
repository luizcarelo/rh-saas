import { Controller, Post, Get, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly docsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any, @Req() req: any) {
    return this.docsService.uploadDocument(req.user.tenantId, req.body.employeeId, file.originalname, file.path);
  }

  @Get('my-docs')
  async list(@Req() req: any) {
    return this.docsService.listForEmployee(req.user.tenantId, req.user.employeeId);
  }
}
