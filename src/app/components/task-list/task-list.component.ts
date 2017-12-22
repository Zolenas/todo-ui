import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  private tasks: Array<any>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = [new Task("Test01", true ,"blablabla"), new Task("Test02")];
    //this.taskService.getTasks().subscribe(t => this.tasks = t);
  }

  addTask(task) {
    //this.taskService.addTask(task).subscribe(t => this.tasks = t);
  }

  removeTask() {
    //this.taskService.removeTask(id).subscribe(t => this.tasks = t);
  }

  openTask() {

  }
}
