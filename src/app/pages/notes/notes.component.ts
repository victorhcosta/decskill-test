import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
	userName = '';

	constructor(
		private readonly _router: Router,
		private readonly _userService: UserService,
	) {
	}

	ngOnInit(): void {
		this.userName = this._userService.getUserData()?.username;
	}

	logout() {
		this._userService.logout();
		this._router.navigate(['']);
	}
}
