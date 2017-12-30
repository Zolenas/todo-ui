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
    this.tasks = [new Task("id1", "Test01", true ,"blablabla"), new Task("id2", "Test02"), new Task("id3", "Test03"), new Task("id4", "Test04")];
    //this.taskService.getTasks().subscribe(t => this.tasks = t);
  }
}
