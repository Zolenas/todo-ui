import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';

import { HttpClientModule } from '@angular/common/http';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [TaskService]
    });
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list', inject([TaskService], (service: TaskService) => {
    expect(service.getTasks()).toBeTruthy();
  }));

  it('should add a task', inject([TaskService], (service: TaskService) => {
    expect(service.getTasks()).toBeTruthy();
  }));

  it('should get a task', inject([TaskService], (service: TaskService) => {
    expect(service.getTask('id1')).toBeTruthy();
  }));

  it('should return a list of task', inject([TaskService], (service: TaskService) => {
    expect(service.getTasks()).toBeTruthy();
  }));

  it('should remove a task', inject([TaskService], (service: TaskService) => {
    expect(service.removeTask('id1')).toBeTruthy();
  }));

  it('should modify a task', inject([TaskService], (service: TaskService) => {
    let t = new Task('id2', 'Task 02', false, 'desc');
    expect(service.modifyTask('id1', t )).toBeTruthy();
  }));
});
