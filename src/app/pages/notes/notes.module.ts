import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TextboxComponent } from './components/textbox/textbox.component';

@NgModule({
  declarations: [
    NotesComponent,
    TextboxComponent,
    TimelineComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
