import {UserLdap} from './user-ldap';

export const LDAP_USERS: UserLdap[] = [
  {
    id: 1,
    login: 'test.v1',
    nom: 'V1',
    prenom: 'Test',
    nomComplet: 'V1 Test',
    motDePasse: null,
    mail: 'test.v1@epsi.fr',
    role: 'ROLE_USER',
    employeNumero: 1234,
    employeNiveau: 120,
    dateEmbauche: '2020-01-01',
    publisherId: 186,
    active: true,
  },
  {
    id: 2,
    login: 'test.v8',
    nom: 'V8',
    prenom: 'Test',
    nomComplet: 'V8 Test',
    motDePasse: null,
    mail: 'test.v8@epsi.fr',
    role: 'ROLE_USER',
    employeNumero: 8234,
    employeNiveau: 820,
    dateEmbauche: '2020-08-08',
    publisherId: 886,
    active: true,
  },
];
