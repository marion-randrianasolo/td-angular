import {UserLdap} from '../model/user-ldap';
import {LDAP_USERS} from '../model/ldap-mock-data';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryUsersService implements InMemoryDbService {
  createDb() {
    const users: UserLdap[] = LDAP_USERS;
    return {users};
  }
  // Overrides the genId method to ensure that a user always has an id.
  // If the users array is empty,
  // the method below returns the initial number (4).
  // if the users array is not empty, the method below returns the highest
  // user id + 1.
  // Cette méthode ne peut retourne qu'un entier : il faut donc faire des modifications
  // voir chapitre suivant
  genId(users: UserLdap[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 4;
  }
}
