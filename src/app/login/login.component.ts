import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required),
  })
  message: string|undefined;

  constructor(public authService: AuthService, private router: Router) {}

  login() {
    this.message = 'Tentative de connexion en cours ...';

    const name = this.loginForm.get('name')
    const password = this.loginForm.get('password')

    if(name?.value && password?.value){
      this.authService.login(name.value, password.value)
      .subscribe((isLoggedIn) => {
        if(isLoggedIn) {
          this.router.navigate(['/pokemons'])
        }else{
          this.loginForm.reset();
        }
      })
    }else{
      this.message = 'Les champs sont obligatoires';
    }
  }

}
