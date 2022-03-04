import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    
    constructor(@InjectModel('Task') private _ga: Model<Task>) { }

    async getTasks(): Promise<Task[]> {
        return await this._ga.find().exec();
    }

    async getTask(id: string): Promise<Task>{
        return await this._ga.findById(id);
    }

    async createTask(task: CreateTaskDto): Promise<string> {
        const newTask = new this._ga(task);
        const response = await newTask.save();
        console.log(response);
        return 'saved';
    }

    async updateTask(id: string, taskBody: CreateTaskDto): Promise<string> {
        const task = this._ga.findById(id);

        if( !task ) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        const updateTask = await this._ga.findByIdAndUpdate(id, {
            title: taskBody.title,
            description: taskBody.description,
            done: taskBody.done
        });

        console.log(updateTask);

        return 'updated';

    }

    async deleteTask( id: string ): Promise<string> {

        await this._ga.findByIdAndDelete(id);   

        return `Task w/ id: ${id} deleted`;

    }

}
