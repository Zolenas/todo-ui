import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskDialogComponent } from './new-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

xdescribe('NewTaskDialogComponent', () => {
  let component: NewTaskDialogComponent;
  let fixture: ComponentFixture<NewTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskDialogComponent ],
      imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule
      ],
      providers: [
        MatDialogRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
