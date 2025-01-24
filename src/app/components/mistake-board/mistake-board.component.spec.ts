import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistakeBoardComponent } from './mistake-board.component';

describe('MistakeBoardComponent', () => {
  let component: MistakeBoardComponent;
  let fixture: ComponentFixture<MistakeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MistakeBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MistakeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
