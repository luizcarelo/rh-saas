import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SuperAdminService {

  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async health() {
    return {
      status: 'ok',
      module: 'super-admin',
    };
  }

  async listClients() {

    const rows = await this.dataSource.query(`
      SELECT
          sc.id,
          sc.slug,
          sc.status,
          sp.code  AS "planCode",
          sp.name  AS "planName"
      FROM saas_clients sc
      LEFT JOIN saas_plans sp
          ON sp.id = sc.plan_id
      ORDER BY sc.slug
    `);

    return rows;
  }
}
