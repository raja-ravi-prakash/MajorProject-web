import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupPreviewComponent } from './user-group-preview.component';

describe('UserGroupPreviewComponent', () => {
  let component: UserGroupPreviewComponent;
  let fixture: ComponentFixture<UserGroupPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
