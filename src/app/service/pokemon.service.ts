import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonListResponse, PokemonDetailsResponse, PokemonListItem } from '../models/pokemon.models';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<PokemonListResponse> {
    if (this.cache['pokemonList']) {
      return of(this.cache['pokemonList']);
    }

    return this.http.get<PokemonListResponse>(`${this.apiUrl}`).pipe(
      tap((data) => {
        this.cache['pokemonList'] = data;
      })
    );
  }

  getPokemonDetails(name: string): Observable<PokemonDetailsResponse> {
    if (this.cache[name]) {
      return of(this.cache[name]);
    }

    return this.http.get<PokemonDetailsResponse>(`${this.apiUrl}/${name}`).pipe(
      tap((data) => {
        this.cache[name] = data;
      })
    );
  }

  private extractPokemonId(pokemonData: PokemonListItem): number {
    const urlParts = pokemonData.url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
  }
}
