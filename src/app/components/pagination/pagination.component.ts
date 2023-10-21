import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  @Input() pokemonList: any[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() itemsPerPage: number = 20;
  @Output() pageChange = new EventEmitter<number>();
  visiblePokemonList: any[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // Inicialmente, carga los Pokémon de la primera página
    this.loadVisiblePokemonList(this.currentPage);
  }

  loadVisiblePokemonList(page: number): void {
    const itemsPerPage = this.itemsPerPage;
    const offset = (page - 1) * itemsPerPage;

    // Construye la URL para obtener los Pokémon de la página actual
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`;

    // Realiza una solicitud HTTP para obtener los Pokémon
    this.httpClient.get(apiUrl).subscribe((data: any) => {
      const results = data.results;
      const visiblePokemonList: any[] = [];

      // Itera sobre los resultados y obtén la información de cada Pokémon
      results.forEach((result: any) => {
        const pokemonName = result.name;
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonId(result.url)}.png`;

        // Agrega la información del Pokémon a la lista
        visiblePokemonList.push({
          name: pokemonName,
          image: imageUrl
        });
      });

      // Asigna los Pokémon visibles a la propiedad visiblePokemonList
      this.visiblePokemonList = visiblePokemonList;
    });
  }

  private getPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
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
