import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon.models';
import { PokemonService } from '../pokemon.service';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styles: [
  ]
})
export class PokemonFormComponent {
  @Input() pokemon: Pokemon | undefined;
  types: string[] = [];
  newPokemon: Pokemon = new Pokemon(); // Nouvelle instance de Pokemon
  hasParam: boolean = false;
 
  constructor(public pokemonService: PokemonService, public router: Router, private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.types = this.pokemonService.getTypesList();
 
    // Vérifier si un paramètre est présent dans l'URL
     this.route.paramMap.subscribe(params => {
      this.hasParam = params.has('id');
    });
 
  }
 
  /* Cette fonction permet de déterminer si le pokémon en cours d'édition possède le type passé en paramètre */
  hasType(type: string): boolean {
    return (this.pokemon && this.pokemon.types.includes(type)) || (this.newPokemon && this.newPokemon.types.includes(type)) || false;
  }
 
  /* Cette fonction permet d'ajouter le type passé en paramètre sur le pokémon en cours d'édition, ou de le retirer s'il est déjà affecté */
  selectType($event: Event, type: string): void {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
 
    if (isChecked) {
      if (this.pokemon) {
        this.pokemon.types.push(type);
      } else if (this.newPokemon) {
        this.newPokemon.types.push(type);
      }
    } else {
      if (this.pokemon) {
        const index = this.pokemon.types.indexOf(type);
        if (index !== -1) {
          this.pokemon.types.splice(index, 1);
        }
      } else if (this.newPokemon) {
        const index = this.newPokemon.types.indexOf(type);
        if (index !== -1) {
          this.newPokemon.types.splice(index, 1);
        }
      }
    }
  }
 
  updatePokemonName(newName: string) {
    if (this.pokemon) {
      this.pokemon.name = newName;
    }
  }
 
  updatePokemonHp(newHp: number) {
    if (this.pokemon) {
      this.pokemon.hp = newHp;
    }
  }
 
  updatePokemonCp(newCp: number) {
    if (this.pokemon) {
      this.pokemon.cp = newCp;
    }
  }
 
   
  onSubmit() {
if (this.pokemon) {
        this.pokemonService.updatePokemon(this.pokemon)
          .subscribe(() => {
            this.router.navigate(['/pokemons']);
          });
      } else {
        this.pokemonService.postPokemon(this.newPokemon)
          .subscribe(() => {
            this.router.navigate(['/pokemons']);
          });
      }
    }
  }
// Dispose d’un menu contextuel