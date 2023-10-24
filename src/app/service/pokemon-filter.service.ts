import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonFilterService {

  constructor() { }

  // Filtrar por letra inicial del nombre
  filterByLetter(pokemonList: any[], letter: string): any[] {
    return pokemonList.filter((pokemon) =>
      pokemon.name.startsWith(letter.toUpperCase())
    );
  }

  // Filtrar por tipo de Pokémon
  filterByType(pokemonList: any[], type: string): any[] {
    return pokemonList.filter((pokemon) =>
      pokemon.types.includes(type.toUpperCase())  
    );
  }
}
