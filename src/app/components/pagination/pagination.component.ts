import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pokemonList: any[] = [];
  @Output() pageChange = new EventEmitter<number>();

  getVisiblePokemonList(): any[] {
    // Calcula el indice de inico y fin de la pagina actual
    const itemsPerPage = 20;
    const startIndex = (this.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visiblePokemonList: any[] = [];
    

    // Recorre la lista de Pokémones visibles y crea un objeto con imagen y nombre
    for (let i = startIndex; i < endIndex && i < this.pokemonList.length; i++) {
      const pokemon = this.pokemonList[i];
      const pokemonInfo = {
        name: pokemon.name,
        image: pokemon.sprites.front_default
      };
      visiblePokemonList.push(pokemonInfo);
    }

    // Filtrar los Pokémon en la página actual
    return this.pokemonList.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
