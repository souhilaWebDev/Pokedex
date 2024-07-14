import { Injectable } from '@angular/core';
import { POKEMONS } from './api-pokemons';
import { Pokemon } from './pokemon.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  /**
   * Récupère une liste de tous les Pokémon depuis le serveur.
   * @returns Un Observable (un carton) qui émet un tableau d'objets Pokémon.
   * Cette fonction effectue une requête HTTP GET vers le point de terminaison API spécifié ('api/pokemons').
   * L'utilisation de `pipe` permet de traiter les données dès qu'elles arrivent :
   * - `tap` est utilisé pour afficher les données reçues (comme si on regardait à l'intérieur du carton sans prendre les objets).
   * - `catchError` est utilisé pour gérer les erreurs lors de la requête. En cas d'erreur, on affiche celle-ci et on renvoie un nouveau carton vide (tableau vide).
   */
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap( (response) => console.table(response) ),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  } 
  /**
   * Récupère un Pokémon spécifique par son identifiant depuis le serveur.
   * @param pokemonId L'identifiant du Pokémon à récupérer.
   * @returns Un Observable (un carton) qui émet un objet Pokémon ou `undefined` si non trouvé.
   * Cette fonction effectue une requête HTTP GET à un point de terminaison API formé en ajoutant l'ID du Pokémon à l'URL.
   * - `tap` est utilisé pour afficher les données du Pokémon récupéré (comme si on ouvrait le carton pour montrer l'objet).
   * - `catchError` est utilisé pour gérer les erreurs lors de la requête. En cas d'erreur, on affiche celle-ci et on renvoie un carton contenant `undefined`.
  */
  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap( (response) => console.table(response) ),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )
  }

  updatePokemon(updatedPokemon: Pokemon): Observable<null|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
    }

    return this.http.put<null>(`api/pokemons`, updatedPokemon, httpOptions).pipe(
      tap( (response) => console.table(response) ),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )

  }
  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response))
    );
  }

  private log(message: any) {
    console.log(message);
  }
  addPokemon(pokemon: Pokemon): Observable<Pokemon | null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => console.table(response)),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
  postPokemon(newPokemon: Pokemon): Observable<null|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
    }
 
    return this.http.post<null>(`api/pokemons`, newPokemon, httpOptions).pipe(
      tap( (response) => console.table(response) ),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )
  }
  
  getTypesList(): string[] {
    return [
      'Feu', 
      'Eau', 
      'Plante',
      'Insecte',
      'Normal',
      'Vol',
      'Poison',
      'Fée',
      'Psy',
      'Electrik',
      'Combat'
    ]
  }
}
