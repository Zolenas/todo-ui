import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;

  constructor() {}

  ngOnInit() {

  }

  toggleStatus() {
    let st = this.task.getStatus();
    this.task.setStatus(!st);
  }

  openDetail() {

  }
}