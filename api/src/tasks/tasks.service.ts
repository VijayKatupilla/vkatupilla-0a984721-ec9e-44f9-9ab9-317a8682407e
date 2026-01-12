import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Organization } from '../entities/organization.entity';
import { JwtUser } from '../auth/jwt-user.interface';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,

    private readonly auditService: AuditService,
  ) {}

  async createTask(title: string, user: JwtUser) {
    const org = await this.orgRepo.findOne({
      where: { id: user.organizationId },
    });

    const task = this.taskRepo.create({
      title,
      organization: org!,
    });

    const saved = await this.taskRepo.save(task);

    this.auditService.log({
      action: 'CREATE_TASK',
      userId: user.sub,
      role: user.role,
      taskId: saved.id,
    });

    return saved;
  }

  async getTasks(user: JwtUser) {
    return this.taskRepo.find({
      where: {
        organization: {
          id: user.organizationId,
        },
      },
    });
  }

  async updateTask(id: number, title: string, user: JwtUser) {
    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task || task.organization.id !== user.organizationId) {
      throw new ForbiddenException();
    }

    task.title = title;
    const updated = await this.taskRepo.save(task);

    this.auditService.log({
      action: 'UPDATE_TASK',
      userId: user.sub,
      role: user.role,
      taskId: task.id,
    });

    return updated;
  }

  async deleteTask(id: number, user: JwtUser) {
    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task || task.organization.id !== user.organizationId) {
      throw new ForbiddenException();
    }

    await this.taskRepo.remove(task);

    this.auditService.log({
      action: 'DELETE_TASK',
      userId: user.sub,
      role: user.role,
      taskId: task.id,
    });

    return { deleted: true };
  }
}
