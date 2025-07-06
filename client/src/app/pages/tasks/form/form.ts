import { Component, inject } from '@angular/core';
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
  protected readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    done: new FormControl(false),
  });

  onSubmit() {
    const task = this.form.value as Omit<Task, 'id'>;
    const isValid = this.form.valid;

    if (!isValid) {
      this.form.markAllAsTouched();
      return;
    }

    this.taskService.createTask(task).subscribe((data) => {
      this.router.navigate(['/tasks']);
    });
  }
}
