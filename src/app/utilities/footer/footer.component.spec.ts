import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year', () => {
    fixture.detectChanges();
    const year = new Date().getFullYear();
    const copyrightText = fixture.nativeElement.querySelector('div').textContent;
    expect(copyrightText).toContain(year.toString());
  });

  it('should contain a link to Cognizant Technology Solutions', () => {
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.href).toContain('https://www.cognizant.com/us/en/about-cognizant');
    expect(link.textContent).toContain('Cognizant Technology Solutions');
  });

  afterEach(() => {
    // Clean up after each test
    fixture.destroy();
  });
});
