import { Component, Input } from '@angular/core';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
 
@Component({
  selector: 'app-add-pokemon',
  templateUrl: '../pokemon-form/pokemon-form.component.html',
  styles: [
  ]
})
export class AddPokemonComponent extends PokemonFormComponent{
}