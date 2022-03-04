import { Controller, Delete, Get, Post, Put, Body, Param, Req, Res } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';

@Controller('tasks')
export class TasksController {

    constructor( private _taskService: TasksService ) { }

    @Get()
    getTasks(): Promise<Task[]>{
        return this._taskService.getTasks();
    }
    // getTask(@Req() req, @Res() res): Response{
    //     return res.send('Hello world');
    // }
    @Get(':taskId')
    getTask(@Param('taskId') taskId): Promise<Task>{
        return this._taskService.getTask(taskId);
    }

    @Post()
    createPost(@Body() task: CreateTaskDto): Promise<string>{
        return this._taskService.createTask(task);
    }

    @Put(`:id`)
    updatePost(@Body() task: CreateTaskDto, @Param('id') id): Promise<string> {
        return this._taskService.updateTask(id, task);
    }

    @Delete(`:taskId`)
    deletePost(@Param('taskId') taskId): Promise<string> {
        return this._taskService.deleteTask(taskId);
    }

}
