import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';  
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  //private link: string;
  
  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit() {
    //this.link = 'task/'+this.task.id;
    //this.link = 'task/1';
  }

  // Set task status and persist it
  toggleStatus(e) {
    e.stopPropagation();
    let st = this.task.getStatus();
    let id = this.task.getId();
    this.task.setStatus(!st);
    /* Fixme
    setStatus SHOULD be done after the service response !
    */
    this.taskService.modifyTask(id, this.task);
  }

  // Open detail view for this task item
  openDetail() {
    this.router.navigate(['task/'+this.task.getId()]);
  }
}
