import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

  private tasks: Task[];

  constructor(private _htc: HttpClient) {
    this.getTasks();
  }

  /**
   * Post a new task
   * @param Task
   */
  addTask(task: Task): Promise<void> {
    return this._htc.post<any>('http://localhost:20491/todo-app/todos', task)
      .toPromise()
      .then(taskObj => {
        this.tasks.unshift(new Task(taskObj._id, taskObj.title, taskObj.status, taskObj.description));
      });
  }

  /**
   * Get task by id
   * @param string
   */
  getTask(id: string): Promise<Task> {
    const task = this.tasks.find(t => {
      return t.getId() === id;
    });

    return Promise.resolve(task);
    // return this._htc.get<Task>(`http://localhost:20491/todo-app/todos/${id}`)
    //   .toPromise()
    //   .then();
  }

  /**
   * Get all tasks
   */
  getTasks(): Promise<Task[]> {
    if (!this.tasks) {
      return this._htc.get<any[]>('http://localhost:20491/todo-app/todos')
        .toPromise()
        .then(tasks => {
          this.tasks = [];

          for (const task of tasks) {
            this.tasks.push(new Task(task._id, task.title, task.status, task.description, task.createdOn));
          }

          // Sort tasks array by date
          this.tasks.sort((a, b) => {
            if (a.getCreatedOn() > b.getCreatedOn()) {
              return -1;

            } else if (a.getCreatedOn() < b.getCreatedOn()) {
              return 1;

            } else {
              return 0;
            }
          });

          return this.tasks;
        });

    } else {
      return Promise.resolve(this.tasks);
    }
  }

  /**
   * Remove task by id
   * @param string
   */
  removeTask(task: Task): Promise<void> {
    return this._htc.delete<void>(`http://localhost:20491/todo-app/todos/${task.getId()}`)
      .toPromise()
      .then(() => {
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
      });
  }

  /**
   * Remove all tasks
   * @param string
   */
  removeTasks(): Promise<void[]> {
    const promises = [];
    for (const task of this.tasks) {
      if (task.getStatus()) {
        promises.push(this.removeTask(task));
      }
    }

    return Promise.all(promises);
  }


  /**
   * Modify task by id
   * @param string
   * @param Task
   */
  modifyTask(task: Task): Promise<any> {
    return this._htc.put(`http://localhost:20491/todo-app/todos/${task.getId()}`, task)
      .toPromise();
  }

  private handleError(err): void {
    console.log('An error occured:', err.message);
  }

}
