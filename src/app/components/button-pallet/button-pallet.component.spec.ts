import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPalletComponent } from './button-pallet.component';

describe('ButtonPalletComponent', () => {
  let component: ButtonPalletComponent;
  let fixture: ComponentFixture<ButtonPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
