import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';

interface Task {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'tasks-listing',
  imports: [TableModule, ButtonModule],
  templateUrl: './listing.html',
  styleUrl: './listing.css'
})
export class TasksListing implements OnInit {

  protected readonly tasks = signal<Task[]>([]);
  protected readonly httpClient = inject(HttpClient);

  ngOnInit() {
    this.httpClient.get<Task[]>('http://localhost:8000/api/v1/tasks').subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

}
