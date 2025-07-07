import { Component, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { Task, TaskService } from '@/app/services/task.service';

@Component({
  selector: 'tasks-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    CheckboxModule,
  ],
  providers: [TaskService],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class TasksForm {
  protected readonly router = inject(Router);
  protected readonly taskService = inject(TaskService);

  protected readonly currentId = signal<number | undefined>(undefined);
  protected readonly title = computed(() => this.currentId() ? `Edit Task #${this.currentId()}` : 'Create Task');
  protected readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    done: new FormControl(false),
  });

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { task: Task };
    if (state?.task) {
      this.form.patchValue(state.task);
      this.currentId.set(state.task.id);
    }
  }

  onSubmit() {
    const task = this.form.value as Omit<Task, 'id'>;
    const isValid = this.form.valid;
    const id = this.currentId();

    if (!isValid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = id
      ? this.taskService.updateTask(id, task)
      : this.taskService.createTask(task);

    request.subscribe(() => this.router.navigate(['/tasks']));
  }
}
