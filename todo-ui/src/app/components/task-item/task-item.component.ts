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

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit() {
  }

  /**
   * Use task service to set the task status
   *
   * @param {any} e
   * @memberof TaskItemComponent
   */
  toggleStatus(e) {
    e.stopPropagation();
    const st = this.task.getStatus();
    this.taskService.modifyTask(this.task).then(() => {
      this.task.setStatus(!st);
    });
  }

  /**
   * Get the task status
   *
   * @returns
   * @memberof TaskItemComponent
   */
  getStatus() {
    return this.task.getStatus();
  }

  /**
   * Open detail view for this task item
   *
   * @memberof TaskItemComponent
   */
  openDetail() {
    this.router.navigate(['task/' + this.task.getId()]);
  }
}
