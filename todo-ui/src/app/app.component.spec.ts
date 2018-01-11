import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Location } from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { TaskMenuComponent } from './components/task-menu/task-menu.component';
import { MatIconModule, MatDialogModule } from '@angular/material';
import { TaskService } from './services/task.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TaskMenuComponent
      ],
      imports: [
        MatIconModule,
        MatDialogModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [TaskService]
    }).compileComponents();

    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
  }));
  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));
  it(`should have as title 'Todo'`, async(() => {
    expect(comp.title).toEqual('Todo');
  }));
  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Todo');
  }));
  it('should navigate to home page', async(() => {
    comp.goHome();
    expect(location.path()).toBe('');
  }));
});
