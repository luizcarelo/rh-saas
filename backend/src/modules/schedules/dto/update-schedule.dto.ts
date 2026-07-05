import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateScheduleDto
  implements Partial<CreateScheduleDto> {

  name?: string;
  type?: any;
  workDays?: number[];
  expectedMinutesPerDay?: number;
  dailyToleranceMinutes?: number;
  entry1?: string;
  exit1?: string;
  entry2?: string;
  exit2?: string;
  expectedMinutes?: number;
}
