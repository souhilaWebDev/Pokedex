import { Component } from '@angular/core';
import { POKEMONS } from './pokemon/api-pokemons';
import { Pokemon } from './pokemon/pokemon.models';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean|undefined;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  
  logout() {
    this.authService.logout();
  }
}
