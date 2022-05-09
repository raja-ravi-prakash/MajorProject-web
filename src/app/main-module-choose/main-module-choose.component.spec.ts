import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModuleChooseComponent } from './main-module-choose.component';

describe('MainModuleChooseComponent', () => {
  let component: MainModuleChooseComponent;
  let fixture: ComponentFixture<MainModuleChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainModuleChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModuleChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
