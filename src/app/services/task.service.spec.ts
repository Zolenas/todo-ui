import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';

import { HttpClientModule } from '@angular/common/http';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let spy: any;

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
    let t = new Task('id01', 'Task test', false, 'desc test');
    spy = spyOn(service, 'getTask').and.returnValue(t);
    expect(service.getTask('id01')).toBe(t);
  }));

  it('should return a list of task', inject([TaskService], (service: TaskService) => {
    let t1 = new Task('id01', 'Task test', false, 'desc test');
    let t2 = new Task('id02', 'Task test', false, 'desc test');
    let tArray = [t1, t2];
    spy = spyOn(service, 'getTasks').and.returnValue(tArray);
    expect(service.getTasks()).toBe(tArray);
  }));

  it('should remove a task', inject([TaskService], (service: TaskService) => {
    let t1 = new Task('id01', 'Task test', false, 'desc test');
    let t2 = new Task('id02', 'Task test', false, 'desc test');
    let tArray = [t1, t2];

    spy = spyOn(service, 'removeTask').and.returnValue(tArray.pop());
    service.removeTask('id01');

    expect(tArray.length).toBe(1);
  }));

  it('should modify a task', inject([TaskService], (service: TaskService) => {
    let t1 = new Task('id01', 'Task test', false, 'desc test');
    let t2 = new Task('id02', 'Task test', false, 'desc test');

    spy = spyOn(service, 'removeTask').and.returnValue(t1 = t2);
    service.modifyTask('id01', t2 )

    expect(t2).toBe(t1);
  }));
});
