import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatTooltipModule } from '@angular/material';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';

describe('Router: App', () => {

  let location: Location;
  let router: Router;
  let fixtureList, fixtureDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatTooltipModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        TaskListComponent,
        TaskDetailComponent,
        TaskItemComponent
      ],
      providers: [ TaskService ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixtureList = TestBed.createComponent(TaskListComponent);
    fixtureDetail = TestBed.createComponent(TaskDetailComponent);

    router.initialNavigation();
  });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => done = true);
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['']);
    tick(50);
    expect(location.path()).toBe('/home');
  }));

  xit('navigate to "task" takes you to /task', fakeAsync(() => {
    router.navigate(['/task/id1']);
    tick(50);
    expect(location.path()).toBe('/task/id1');
  }));
});
