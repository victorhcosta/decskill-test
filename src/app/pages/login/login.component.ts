import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	readonly colors = ['blueviolet', 'brown', 'cadetblue', 'coral', 'cornflowerblue', 'crimson', 'deeppink', 'dodgerblue', 'firebrick', 'fuchsia', 'indianred', 'indigo', 'navy', 'purple', 'royalblue', 'seagreen', 'skyblue', 'slateblue', 'steelblue', 'teal', 'tomato', 'violet'];

	loginForm: FormGroup = new FormGroup({});

	showErrorMessage = false;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _router: Router,
		private readonly _userService: UserService
	) {}

	ngOnInit(): void {
		this._createForm();
	}

	setColor(event: any) {
		this.loginForm.get('color')?.setValue(event.target.value);
	}

	submit() {
		const { username, color } = this.loginForm.value;
		if(!username || !color) {
			this.showErrorMessage = true;
			return;
		}

		this._userService.saveUserData(this.loginForm.value);
		this._router.navigate(['/notas']);
	}

	private _createForm() {
		this.loginForm = this._formBuilder.group({
			username: ['', Validators.required],
			color: [
				'',
				Validators.compose([
					Validators.required,
					Validators.min(6),
					Validators.maxLength(7),
				]),
			],
		});
	}
}
