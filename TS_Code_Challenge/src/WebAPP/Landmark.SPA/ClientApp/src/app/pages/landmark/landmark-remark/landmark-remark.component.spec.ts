import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkRemarkComponent } from './Landmark-remark.component';

describe('LandmarkRemarkComponent', () => {
  let component: LandmarkRemarkComponent;
  let fixture: ComponentFixture<LandmarkRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandmarkRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
