import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EventEmitter } from '@angular/core';

import { TaskDetailComponent } from './task-detail.component';
import { TaskService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatTooltipModule } from '@angular/material';

xdescribe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailComponent ],
      imports: [ HttpClientModule, FormsModule, RouterTestingModule, MatCardModule, MatTooltipModule ],
      providers: [
        TaskService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return the status value', () => {
    const status = component.getStatus();
    expect(status).toBeDefined();
  });

  it('should change status value', () => {
    const status = component.getStatus();
    let newStatus;
    if (status) {
      newStatus = component.getStatus();
      component.toggleStatus(new EventEmitter());
      expect(newStatus).not.toBeTruthy();
    } else {
      newStatus = component.getStatus();
      component.toggleStatus(new EventEmitter());
      expect(newStatus).toBeTruthy();
    }
  });
});
