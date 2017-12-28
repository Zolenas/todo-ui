import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TaskService } from '../../services/task.service';

import { TaskItemComponent } from './task-item.component';
import { MatCardModule, MatTooltipModule } from '@angular/material';
import { RouterTestingModule } from "@angular/router/testing";

xdescribe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
      imports: [ FormsModule, RouterTestingModule ,HttpClientModule, MatCardModule, MatTooltipModule ],
      providers: [
        TaskService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the status value', () => {
    let status = component.getStatus();
    expect(status).toBeDefined();
  });

  it('should change status value', () => {
    let status = component.getStatus();
    let newStatus;
    if(status) {
      newStatus = component.getStatus();
      component.toggleStatus(new EventEmitter());
      expect(newStatus).not.toBeTruthy();
    } else {
      newStatus = component.getStatus();
      component.toggleStatus(new EventEmitter());
      expect(newStatus).toBeTruthy();
    }
  });

  it('should get to the detail view', () => {
    expect(component.openDetail()).toBeDefined();
  });
});
