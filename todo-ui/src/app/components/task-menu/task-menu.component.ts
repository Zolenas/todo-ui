import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.css']
})
export class TaskMenuComponent implements OnInit {

  @Output() loadTaskEvent = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit() {
  }

  /**
   * Open a new dialog to create a prefilled task
   *
   * @memberof TaskMenuComponent
   */
  createTask(): void {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '250px',
      data: new Task('id5', 'New task')
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.taskService.addTask(result)
          .then(() => {
            this.loadTaskEvent.emit();
          });
      }
    });
  }

  /**
   * Call task service to remove all inactive task
   *
   * @memberof TaskMenuComponent
   */
  removeTasks(): void {
    this.taskService.removeTasks()
      .then(() => {
        this.loadTaskEvent.emit();
      });
  }
}
