import { Component, inject, OnInit, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Task, TaskService } from '@/app/services/task.service';
import { SkeletonModule } from 'primeng/skeleton';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tasks-listing',
  imports: [TableModule, ButtonModule, SkeletonModule, NgStyle, RouterLink],
  templateUrl: './listing.html',
  styleUrl: './listing.css',
})
export class TasksListing implements OnInit {
  protected readonly loading = signal(true);
  protected readonly tasks = signal<Task[]>([]);
  protected readonly taskService = inject(TaskService);

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.set(tasks);
      this.loading.set(false);
    });
  }


  protected deleteTask(id: number) {
    const confirm = window.confirm('Are you sure you want to delete this task?'); 
    if (confirm) {
      this.taskService.deleteTask(id).subscribe((data) => {
        console.log(data);
        this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
      });
    };
  }
}
