import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

const HOSTNAME = environment.todoServerHost;
const PORT = environment.todoServerPort;
const URL = `http://${HOSTNAME}:${PORT}/todo-app/todos`;

@Injectable()
export class TaskService {

  private tasks: Task[];

  constructor(private _htc: HttpClient) {
    this.getTasks();
  }

  /**
   * Post a new task.
   *
   * @param {Task} task
   * @returns {Promise<void>}
   * @memberof TaskService
   */
  addTask(task: Task): Promise<void> {
    return this._htc.post<any>(URL, task)
      .toPromise()
      .then(taskObj => {
        this.tasks.unshift(new Task(taskObj._id, taskObj.title, taskObj.status, taskObj.description));
      });
  }

  /**
   * Get task by id.
   *
   * @param {string} id
   * @returns {Promise<Task>}
   * @memberof TaskService
   */
  getTask(id: string): Promise<Task> {
    const task = this.tasks.find(t => {
      return t.getId() === id;
    });

    return Promise.resolve(task);
  }

    /**
     * Get all tasks
     *
     * @returns {Promise<Task[]>}
     * @memberof TaskService
     */
    getTasks(): Promise<Task[]> {
        if (!this.tasks) {
            return this._htc.get<any[]>(URL)
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
                }).catch(err => {
                this.tasks = [];
                return this.tasks;
                });
        } else {
            return Promise.resolve(this.tasks);
        }
    }

    /**
     * Remove task by id
     *
     * @param {Task} task
     * @returns {Promise<void>}
     * @memberof TaskService
     */
    removeTask(task: Task): Promise<void> {
    return this._htc.delete<void>(`${URL}/${task.getId()}`)
        .toPromise()
        .then(() => {
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        });
    }

    /**
     * Remove all inactive tasks
     *
     * @returns {Promise<void[]>}
     * @memberof TaskService
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
     *
     * @param {Task} task
     * @returns {Promise<any>}
     * @memberof TaskService
     */
    modifyTask(task: Task): Promise<any> {
        return this._htc.put(`${URL}/${task.getId()}`, task)
        .toPromise();
    }

    /**
     * Log an error message
     *
     * @private
     * @param {any} err
     * @memberof TaskService
     */
    private handleError(err): void {
        console.log('An error occured:', err.message);
    }
}
