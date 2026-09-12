import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeAiComponent } from './resume-ai.component';

describe('ResumeAiComponent', () => {
  let component: ResumeAiComponent;
  let fixture: ComponentFixture<ResumeAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeAiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
