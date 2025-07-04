import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListing } from './listing';

describe('Listing', () => {
  let component: TasksListing;
  let fixture: ComponentFixture<TasksListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
