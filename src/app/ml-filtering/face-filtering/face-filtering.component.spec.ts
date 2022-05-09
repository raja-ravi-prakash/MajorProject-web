import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceFilteringComponent } from './face-filtering.component';

describe('FaceFilteringComponent', () => {
  let component: FaceFilteringComponent;
  let fixture: ComponentFixture<FaceFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceFilteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
