import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Array<Task>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  /**
   * Call task service to get the task list
   *
   * @memberof TaskListComponent
   */
  loadTasks() {
    this.taskService.getTasks()
      .then(tasks => {
        this.tasks = tasks;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
