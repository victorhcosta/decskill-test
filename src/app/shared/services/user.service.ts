import { Injectable } from '@angular/core';

import { IUserData } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _key = 'userData';
  private _userListKey = 'users';

  constructor() { }

  saveUserData(userData: IUserData) {
	localStorage.setItem(this._key, JSON.stringify(userData));
	this._setUserInList(userData);
  }

  logout() {
	localStorage.removeItem(this._key);
  }

  getUserData(): IUserData {
	const userInfos = localStorage.getItem(this._key) ?? '';

	if(!userInfos) throw new Error("Don't have any user in the storage");

	return JSON.parse(userInfos);
  }

  isLogged(): boolean {
	return !!(localStorage.getItem(this._key));
  }

  getUserList(): IUserData[] {
	const list = localStorage.getItem(this._userListKey);
	return JSON.parse(list || '[]');
  }

  private _setUserInList(userData: IUserData) {
	const list = this.getUserList().filter(user => user.username !== userData.username);
	const listToBeSaved = list.length > 0 ? [list, userData] : [userData];
	localStorage.setItem(this._userListKey, JSON.stringify(listToBeSaved));
  }
}
