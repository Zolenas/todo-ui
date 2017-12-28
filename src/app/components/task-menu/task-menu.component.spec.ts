import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMenuComponent } from './task-menu.component';
import { MatIconModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { TaskService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskMenuComponent', () => {
  let component: TaskMenuComponent;
  let fixture: ComponentFixture<TaskMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMenuComponent ],
      imports: [ MatIconModule, HttpClientModule, MatTooltipModule, MatDialogModule ],
      providers: [ TaskService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new task dialog', () => {
    expect(component.createTask()).toBeTruthy();
  });

  it('should create a new task after dialog is closed', () => {
    expect(component.createTask()).toBeTruthy();
  });

  it('should call remove task function from task service', () => {
    expect(component.removeTasks()).toBeTruthy();
  });
});
