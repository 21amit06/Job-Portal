import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekersApplyComponent } from './jobseekers-apply.component';

describe('JobseekersApplyComponent', () => {
  let component: JobseekersApplyComponent;
  let fixture: ComponentFixture<JobseekersApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekersApplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekersApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
