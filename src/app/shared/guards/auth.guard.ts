import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

import { UserService } from '../../shared/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private readonly _userService: UserService,
		private readonly _router: Router,
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const isLogged = this._userService.isLogged();
		if(!isLogged) {
			this._router.navigate(['/login']);
			return false;
		}

		return true;
	}
}
