import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';

import { HttpClientModule } from '@angular/common/http';
import { Task } from '../models/task.model';

describe('TaskService', () => {
    let task01: Task;
    let tasks;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [TaskService]
        });
    });

    it('should be created', inject([TaskService], (service: TaskService) => {
        expect(service).toBeTruthy();
    }));

    it('should return a list of tasks', inject([TaskService], (service: TaskService) => {
        service.getTasks().then(ts => {
            tasks = ts;
            expect(ts).toBeTruthy();
        });
    }));

    it('should add a task', inject([TaskService], (service: TaskService) => {
        let l1, l2;
        service.getTasks()
            .then(a => {
                l1 = a.length;
                return;
            })
            .then(() => {
                const t1 = new Task('id01', 'Task test', false, 'desc test');
                return service.addTask(t1);
            })
            .then(res => {
                return service.getTasks();
            })
            .then(a => {
                task01 = a[0];
                l2 = a.length;
                return;
            })
            .then(() => {
                expect(l2).toBe(l1++);
            });
    }));

    xit('should get a task', inject([TaskService], (service: TaskService) => {
        const id = task01.getId();
        service.getTask(id).then(t => {
            expect(t).toBeTruthy();
        });
    }));

    it('should modify a task', inject([TaskService], (service: TaskService) => {
        task01.setStatus(true);

        service.modifyTask(task01).then(t => {
            expect(t.getStatus()).toBe(true);
        });
    }));

    it('should remove a task', inject([TaskService], (service: TaskService) => {
        service.removeTasks().then(() => {
            expect(tasks.length).toBe(0);
        });
    }));
});
