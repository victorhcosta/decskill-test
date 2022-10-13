import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextboxComponent } from './components/textbox/textbox.component';
import { TimelineComponent } from './components/timeline/timeline.component';

import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotesComponent,
	   TextboxComponent,
	   TimelineComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
