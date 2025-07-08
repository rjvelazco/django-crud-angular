import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';

import { Task, TaskService } from '@/app/services/task.service';

@Component({
  selector: 'app-tasks-listing',
  imports: [TableModule, ButtonModule, SkeletonModule, NgStyle, RouterLink],
  providers: [TaskService],
  templateUrl: './listing.html',
  styleUrl: './listing.css',
})
export class TasksListing implements OnInit {
  protected readonly taskService = inject(TaskService);

  protected readonly loading = signal(true);
  protected readonly tasks = signal<Task[]>([]);

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.set(tasks);
      this.loading.set(false);
    });
  }

  protected deleteTask(id: number) {
    const confirm = window.confirm('Are you sure you want to delete this task?'); 
    if (confirm) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
      });
    };
  }
}
