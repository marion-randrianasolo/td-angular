import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserLdap} from '../../model/user-ldap';
import {UsersService} from '../../service/users.service';
import {FormBuilder} from '@angular/forms';
import {ConfirmValidParentMatcher, passwordValidator} from './passwords-validator.directive';

export abstract class LdapDetailComponent {
  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  // Le PlaceHolder pour les mots de passes en fonction de l'édition ou non
  passwordPlaceHolder: string;
  // Message d'erreur
  errorMessage = '';

  userForm = this.fb.group({
    id: [''],
    login: [''], // Valeur de départ vide
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator }),
    mail: {value: '', disabled: true},
  });

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé)');
  }
  protected onInit(): void {
  // Permet d'initialiser le formulaire au cas où
    // Nous n'en avons pas besoin ici
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  onSubmitForm(): void {
    this.validateForm();
  }


  abstract validateForm(): void;

  updateLogin(): void {
    this.userForm.get('login').setValue((this.formGetValue('prenom') + '.' +
      this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  updateMail(): void {
    this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@kilroy.lan');
  }

  isFormValid(): boolean {
    return this.userForm.valid
      // Exemple de validation d'un champ :
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  protected copyUserToFormControl(): void {
    this.userForm.get('id').setValue(this.user.id);
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    /* Il faudra ajouter les champs suivant au formulaire
     this.userForm.get('employeNumero').setValue(this.user.employeNumero);
     this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
     this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
     this.userForm.get('publisherId').setValue(this.user.publisherId);
     this.userForm.get(‘active’).setValue(this.user.active);
     */
  }

  protected getUserFromFormControl(): UserLdap {
    return {
      id: this.userForm.get('id').value === '' ? null : this.userForm.get('id').value,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      // Les valeurs suivantes devraient être eprise du formulaire
      employeNumero: 1, // this.userForm.get('employeNumero').value,
      employeNiveau: 1, // this.userForm.get('employeNiveau').value,
      dateEmbauche: '2020-04-24', // this.userForm.get('dateEmbauche').value,
      publisherId: 1, // this.userForm.get('publisherId').value,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }


}
