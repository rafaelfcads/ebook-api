import { Get, Controller } from '@nestjs/common';

@Controller()
export class HealthCheckController {

  @Get('/health-check')
  root(): string {
    return 'Health Care API Running';
  }
}