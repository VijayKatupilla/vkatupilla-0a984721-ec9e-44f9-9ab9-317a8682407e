import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  log(event: {
    action: string;
    userId: number;
    role: string;
    taskId?: number;
  }) {
    console.log('AUDIT LOG:', event);
  }

  getLogs() {
    return [];
  }
}
