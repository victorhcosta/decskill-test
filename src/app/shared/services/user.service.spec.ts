import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockUserInfos = { username: 'user', color: '#951753' };


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call localStorage.setItem with the user information', () => {
    const spy = jest.spyOn(localStorage, 'setItem');
    service.saveUserData(mockUserInfos);

    expect(spy).toBeCalledWith(expect.anything(), JSON.stringify(mockUserInfos));
  });

  it('should save user in the list of users', () => {
    service.saveUserData(mockUserInfos);
    const list = service.getUserList();
    expect(list).toEqual([mockUserInfos]);
  });

  it('should return an empyt list when do not have any user in the list', () => {
    expect(service.getUserList()).toEqual([]);
  });

  it('should return the user information when calling getUserData', () => {
    service.saveUserData(mockUserInfos);
    const userInfos = service.getUserData();

    expect(userInfos).toEqual(mockUserInfos);
  });

  it('should throw an error when calling getUserData without any data in the storage', () => {
    try {
      service.getUserData()
    } catch (error: any) {
      console.info({ error });
      expect(error.message).toBe("Don't have any user in the storage");
    }
  });

  it('should return true when has user info in the storage', () => {
    service.saveUserData(mockUserInfos);
    expect(service.isLogged()).toBeTruthy();
  });

  it('should return false when has user info in the storage', () => {
    expect(service.isLogged()).toBeFalsy();
  });
});
