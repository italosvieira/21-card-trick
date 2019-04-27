import { TestBed, async } from '@angular/core/testing';
import { CardTrickComponent } from './card-trick.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/*import 'zone.js';
import 'zone.js/dist/async-test.js';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';*/

describe('21CardTrickComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        CardTrickComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CardTrickComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular'`, () => {
    const fixture = TestBed.createComponent(CardTrickComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.gameState).toEqual(3);
  });

  it('Should render a button with Start Game text.', () => {
    const fixture = TestBed.createComponent(CardTrickComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Start Game');
  });
});
