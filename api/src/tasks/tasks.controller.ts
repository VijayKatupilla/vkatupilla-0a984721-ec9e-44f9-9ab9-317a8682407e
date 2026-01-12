import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';
import { JwtUser } from '../auth/jwt-user.interface';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('OWNER', 'ADMIN')
  create(@Body() body: { title: string }, @Req() req: any) {
    return this.tasksService.createTask(body.title, req.user as JwtUser);
  }

  @Get()
  getAll(@Req() req: any) {
    return this.tasksService.getTasks(req.user as JwtUser);
  }

  @Put(':id')
  @Roles('OWNER', 'ADMIN')
  update(
    @Param('id') id: string,
    @Body() body: { title: string },
    @Req() req: any,
  ) {
    return this.tasksService.updateTask(
      Number(id),
      body.title,
      req.user as JwtUser,
    );
  }

  @Delete(':id')
  @Roles('OWNER', 'ADMIN')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.deleteTask(
      Number(id),
      req.user as JwtUser,
    );
  }
}
