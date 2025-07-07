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

    deleteTask(id: number): Observable<Object> {
        return this.httpClient.delete(`http://localhost:8000/api/v1/tasks/${id}/`);
    }

    createTask(task: Omit<Task, 'id'>): Observable<Object> {
        return this.httpClient.post('http://localhost:8000/api/v1/tasks/', task);
    }

    updateTask(id: number, task: Omit<Task, 'id'>): Observable<Object> {
        return this.httpClient.put(`http://localhost:8000/api/v1/tasks/${id}/`, task);
    }
}