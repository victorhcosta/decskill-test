import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';

import { INote } from '../../shared/interfaces/notes';

@Injectable({
	providedIn: 'root',
})
export class NotesService {
	private readonly _key = 'notes';
	private _notes$: BehaviorSubject<INote[]> = new BehaviorSubject(JSON.parse(sessionStorage.getItem(this._key) || '[]'));

	constructor() {}

	getNotes(): Observable<INote[]> {
		const list = sessionStorage.getItem(this._key) || '[]';
		const notes = JSON.parse(list);
		console.info({ notes });
		this._notes$.next(notes);
		lastValueFrom(this._notes$).then(notes => console.info({ getNotes: notes }));
		// this._notes$.subscribe(notes => console.info({ getNotes: notes }));
		return this._notes$;
	}

	addNote(note: INote) {
		const savedNotes = sessionStorage.getItem(this._key);
		const parsedSavedNotes = JSON.parse(savedNotes || '[]');
		const list = [...parsedSavedNotes, note];
		sessionStorage.setItem(this._key, JSON.stringify(list));
		this._notes$.next(list);
	}

	removeNote(note: INote) {
		const savedNotes = sessionStorage.getItem(this._key);
		const parsedSavedNotes = JSON.parse(savedNotes || '[]') as INote[];
		const list = parsedSavedNotes.filter(savedNote => {
			const diferentUser = savedNote.username !== note.username;
			if(diferentUser) return true;

			const sameTime = new Date(savedNote.date).toISOString() === new Date(note.date).toISOString();
			const sameContent = savedNote.content === note.content;
			const noteToKeep = !(sameTime && sameContent);

			return noteToKeep;
		});
		this._notes$.next(list);
		sessionStorage.setItem(this._key, JSON.stringify(list));
	}
}
