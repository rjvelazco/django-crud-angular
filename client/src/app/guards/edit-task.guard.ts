import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Task, TaskService } from '../services/task.service';
import { map, Observable, of } from 'rxjs';

export const editTaskGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const router = inject(Router);
  const taskService = inject(TaskService);

  const navigationState = router.getCurrentNavigation()?.extras.state as {
    task: Task;
  };
  const id = route.params['id'];

  console.log(navigationState);

  if (navigationState?.task) {
    return of(true);
  }

  return taskService.getTaskById(id).pipe(map(task => !!task));
};
