import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

  private tasks: Observable<[Task]>;
  constructor(private _htc:HttpClient) { }

  /**
   * Post a new task
   * @param Task
   */
  addTask(task: Task) {
    this._htc.post("http://localhost:3001/todos", task);
  }

  /**
   * Get task by id
   * @param string
   */
  getTask(id: string):Observable<Task> {
    return this._htc.get<Task>("http://localhost:3001/todos/"+id);
  }

  /**
   * Get all tasks
   */
  getTasks():Observable<[Task]> {
    return this._htc.get<[Task]>("http://localhost:3001/todos");
  }

  /**
   * Remove task by id
   * @param string
   */
  removeTask(task: Task) {
    this._htc.delete("http://localhost:3000/todos/"+task.getId());
  }

  /**
   * Modify task by id
   * @param string
   * @param Task
   */
  modifyTask(id: string, task: Task) {
    this._htc.put("http://localhost:3000/todos/"+id, task);
  }
}
