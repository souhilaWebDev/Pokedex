import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <h2 class="text-center">Page introuvable</h2>
  <div class="text-center">
    <a routerLink="/pokemons">Retour</a>
  </div>`,
  styles: [
  ]
})
export class NotFoundComponent {

}
