import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HygComponent } from './hyg.component';

describe('HygComponent', () => {
  let component: HygComponent;
  let fixture: ComponentFixture<HygComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HygComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
