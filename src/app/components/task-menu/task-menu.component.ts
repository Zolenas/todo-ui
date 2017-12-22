import { Component, OnInit } from '@angular/core';
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

  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit() {
  }

  createTask(): void {
    let dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '250px',
      data: new Task("id5", "New task")
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.taskService.addTask(result);
    });
  }

  removeTasks(): void {
   
  }
}
