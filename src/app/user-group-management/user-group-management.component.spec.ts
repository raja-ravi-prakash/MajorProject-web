import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupManagementComponent } from './user-group-management.component';

describe('UserGroupManagementComponent', () => {
  let component: UserGroupManagementComponent;
  let fixture: ComponentFixture<UserGroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
