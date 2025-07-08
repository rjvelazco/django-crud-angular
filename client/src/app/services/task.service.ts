import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description?: string;
  done?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  protected readonly httpClient = inject(HttpClient);

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`http://localhost:8000/api/v1/tasks/${id}/`);
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:8000/api/v1/tasks');
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8000/api/v1/tasks/${id}/`);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.httpClient.post<Task>('http://localhost:8000/api/v1/tasks/', task);
  }

  updateTask(id: number, task: Omit<Task, 'id'>): Observable<Task> {
    return this.httpClient.put<Task>(`http://localhost:8000/api/v1/tasks/${id}/`, task);
  }
}
