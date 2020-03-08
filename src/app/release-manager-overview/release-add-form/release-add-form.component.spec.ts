import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseAddFormComponent } from './release-add-form.component';

describe('ReleaseAddFormComponent', () => {
  let component: ReleaseAddFormComponent;
  let fixture: ComponentFixture<ReleaseAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseAddFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
