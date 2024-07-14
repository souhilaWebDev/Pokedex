import { Component } from '@angular/core';
import { Pokemon } from '../pokemon.models';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
 
@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css'] 
})
export class ListPokemonComponent {
  pokemonList: Pokemon[] = [];
  pokemonSelected: Pokemon|undefined;
  newPokemon: Pokemon = new Pokemon();
 
  constructor(private router: Router, public pokemonService: PokemonService) {}
 
  ngOnInit(){
    this.pokemonService.getPokemonList()
    .subscribe(pokemons => this.pokemonList = pokemons)
  }
 
  selectPokemon(PokemonName: string): void {
  }
 
  goToDetail(pokemon: Pokemon){
    //On recupere l'id du pokemon passé en parametre
    const id:number = pokemon.id;
    //On navigue vers le details du pokemon en question
    this.router.navigate(['pokemon/', id]);
  }
 
  goToPokemonPost(): void {
    // Naviguer vers la page d'ajout avec un paramètre contenant le nouveau Pokémon
    this.router.navigate(['add/pokemon'], { state: { newPokemon: this.newPokemon } });
  }
}