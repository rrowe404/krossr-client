import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UserService } from '@krossr/client';
import { MockUserService } from 'src/test/MockUserService';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AppModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'krossr-client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('krossr-client');
  });
});
