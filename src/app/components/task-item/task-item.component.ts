import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  link: string;

  constructor() {}

  ngOnInit() {
    //this.link = 'task/'+this.task.id;
    this.link = 'task/1';
  }

  toggleStatus(e) {
    e.stopPropagation();
    let st = this.task.getStatus();
    this.task.setStatus(!st);
  }

  openDetail() {

  }
}
