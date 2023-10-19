import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private cache: { [key: string]: any } = {}; // Objeto para cachear datos

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<any> {
    // Verificar si la lista de Pokémon está en caché
    if (this.cache['pokemonList']) {
      return of(this.cache['pokemonList']);
    }

    // Si no está en caché, realizar la solicitud a la API
    return this.http.get(`${this.apiUrl}`).pipe(
      tap((data) => {
        // Almacenar en caché la lista de Pokémon
        this.cache['pokemonList'] = data;
      })
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    // Verificar si los detalles del Pokémon están en caché
    if (this.cache[name]) {
      return of(this.cache[name]);
    }

    // Si no están en caché, realizar la solicitud a la API
    return this.http.get(`${this.apiUrl}/${name}`).pipe(
      tap((data) => {
        // Almacenar en caché los detalles del Pokémon, incluyendo la imagen
        this.cache[name] = data;
        this.cache[name].image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.extractPokemonId(data)}.png`;
      })
    );
  }

  private extractPokemonId(pokemonData: any): number {
    // Extraer el ID del Pokémon a partir de la propiedad 'url' en la respuesta de la API
    const urlParts = pokemonData.url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
  }
}
