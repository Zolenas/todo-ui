import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Task } from '../../models/task.model';

@Component({
  selector: 'new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) { }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
