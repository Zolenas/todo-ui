import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Observable } from 'rxjs/Observable';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { MatCardModule, MatTooltipModule } from '@angular/material';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';


/*class MockService {
  getTasks():Observable<[Task]>  {
    let t1 = new Task('id1', 'task 01', false, 'description 01');
    let t2 = new Task('id2', 'task 02', false, 'description 02');
    let tArray = [t1, t2];
    return Observable.of(tArray);
  }
}*/

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    //TestBed.overrideProvider(TaskService, { useValue: new MockService() })
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent, TaskItemComponent ],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatCardModule, MatTooltipModule ],
      providers: [
        TaskService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task list from task service', () => {
    expect(component.loadTasks()).toBeTruthy();
  });
});
