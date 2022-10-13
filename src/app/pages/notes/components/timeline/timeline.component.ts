import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { INote } from '../../../../shared/interfaces/notes';
import { NotesService } from '../../notes.service';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
	notes$: Observable<INote[]> = of([]);

	constructor(private readonly _notesService: NotesService) {}

	ngOnInit(): void {
		this.notes$ = this._notesService.getNotes();
	}

	removeNote(note: INote) {
		this._notesService.removeNote(note);
	}
}
