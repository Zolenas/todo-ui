import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';

import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private activeComponent: any;

  title = 'Todo';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {
    iconRegistry.addSvgIcon('up_or_down', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/thumbs_up_down.svg'));
    iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete_sweep.svg'));
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
  }

  goHome() {
    this.router.navigate(['']);
  }

  onActivate(componentRef) {
    this.activeComponent = componentRef;
  }

  private loadTasks(e: Event): void {
    if (this.activeComponent instanceof TaskListComponent) {
      this.activeComponent.loadTasks();
    }
  }

}
