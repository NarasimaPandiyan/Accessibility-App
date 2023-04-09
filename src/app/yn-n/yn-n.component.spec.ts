import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YnNComponent } from './yn-n.component';

describe('YnNComponent', () => {
  let component: YnNComponent;
  let fixture: ComponentFixture<YnNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YnNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YnNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
