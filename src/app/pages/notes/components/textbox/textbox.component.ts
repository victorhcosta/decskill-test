import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INote } from '../../../../shared/interfaces/notes';
import { UserService } from '../../../../shared/services/user.service';
import { NotesService } from '../../notes.service';

@Component({
	selector: 'app-textbox',
	templateUrl: './textbox.component.html',
	styleUrls: ['./textbox.component.scss'],
})
export class TextboxComponent implements OnInit {
	readonly limit = 130;
	counter = this.limit;
	showCounter = false;
	noteForm: FormGroup = new FormGroup({});
	canSave = false;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _notesService: NotesService,
		private readonly _userService: UserService,
	) {}

	ngOnInit(): void {
		this.createForm();
	}

	toggleCounter(showCounter: boolean) {
		if (this.counter < this.limit) {
			this.showCounter = true;
			return;
		};
		this.showCounter = showCounter;
	}

	change() {
		this.counter = this.limit - this.noteForm.get('note')?.value?.length;
		this.canSave = this.counter < 0;
	}

	saveNote() {
		const user = this._userService.getUserData();
		const note: INote = {
			username: user.username,
			content: this.noteForm.get('note')?.value,
			background: user.color,
			date: new Date(),
		};
		this._notesService.addNote(note);
		this.noteForm.get('note')?.setValue('');
	}

	createForm() {
		this.noteForm = this._formBuilder.group({
			note: ['', Validators.required]
		});
	}
}
