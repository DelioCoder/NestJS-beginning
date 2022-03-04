import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { taskSchema } from './schemas/task.schema';

@Module({
    imports: [ MongooseModule.forFeature([
        { name: 'Task', schema: taskSchema }
    ]) ],
    controllers: [ TasksController ],
    providers: [ TasksService ],
})
export class TasksModule {}
