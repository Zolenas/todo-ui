import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task: Task;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.route.params.subscribe(res =>
      taskService.getTask(res.id)
        .then(t => {
          this.task = t;
        }));
  }

  ngOnInit() {
  }

  /**
   * Use task service to set the task status
   *
   * @param {any} e
   * @memberof TaskDetailComponent
   */
  toggleStatus(e) {
    e.stopPropagation();
    this.taskService.modifyTask(this.task)
      .then(() => {
        const st = this.task.getStatus();
        this.task.setStatus(!st);
      });
  }

  /**
   * Get the task status
   *
   * @returns
   * @memberof TaskDetailComponent
   */
  getStatus() {
    return this.task.getStatus();
  }
}
