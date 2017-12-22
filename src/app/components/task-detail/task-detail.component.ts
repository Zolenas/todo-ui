import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  
  private task: Task;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.route.params.subscribe(res => 
      /*taskService.getTask(res.id).subscribe(t => 
        this.task = t
      )*/
      this.task = new Task("Test ::: "+res.id, true ,"blablabla")
    );
  }

  ngOnInit() {
  }
}
