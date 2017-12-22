import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatInputModule, MatButtonModule, MatCardModule, MatIconRegistry, MatTooltipModule, MatDialogModule, MatFormFieldModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskService } from './services/task.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskMenuComponent } from './components/task-menu/task-menu.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskDetailComponent,
    TaskMenuComponent,
    NewTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [MatIconRegistry, TaskService],
  entryComponents: [NewTaskDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
