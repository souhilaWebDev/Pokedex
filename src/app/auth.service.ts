import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  login(name:string, password:string): Observable<boolean> {

    /**
     * Normalement ici on a une requete POST vers le serveur en envoyant le name et le mdp 
     * Ensuite, l'API va checker si le name et le mdp existe et si c'est le bon, 
     * et en fonction de cela l'API retournera true ou false
     */

    let isLoggedIn = false; 
    if(name == 'pokemon' && password == 'pokemon'){
      isLoggedIn = true;
    }

    return of(isLoggedIn).pipe(
      delay(1000), 
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    )
  }

  logout() {
    this.isLoggedIn = false
    this.router.navigate(['/login']);
  }
}
