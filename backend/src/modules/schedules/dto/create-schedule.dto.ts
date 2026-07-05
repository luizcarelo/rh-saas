import { ScheduleType } from '../schedule.entity';

export class CreateScheduleDto {
  name: string;
  type: ScheduleType;
  workDays?: number[];
  expectedMinutesPerDay?: number;
  dailyToleranceMinutes?: number;
  entry1?: string;
  exit1?: string;
  entry2?: string;
  exit2?: string;
  expectedMinutes?: number;
}
