import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonFilterService } from '../../service/pokemon-filter.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  @Input() pokemonList: any[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() itemsPerPage: number = 2000;
  @Input() alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  @Output() pageChange = new EventEmitter<number>();
  visiblePokemonList: any[] = [];

  private originalPokemonList: any[] = [];
  private filteredPokemonList: any[] = [];
  private currentFilter: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private pokemonFilterService: PokemonFilterService
  ) { }

  ngOnInit() {
    // Inicialmente, carga los Pokémon de la primera página
    this.loadVisiblePokemonList(this.currentPage);
  }

  loadVisiblePokemonList(page: number, filterByLetter?: string): void {
    const itemsPerPage = this.itemsPerPage;
    const offset = (page - 1) * itemsPerPage;

    // Construye la URL para obtener los Pokémon de la página actual
    let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`;

    if (filterByLetter) {
      apiUrl += `&name=${filterByLetter}%`; // Filtra por nombre que comienza con la letra
    }

    // Realiza una solicitud HTTP para obtener los Pokémon
    this.httpClient.get<any>(apiUrl).subscribe((data) => {
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

  loadPokemonPage(page: number) {
    // Usar la lista filtrada o completa según el filtro actual
    const sourceList = this.currentFilter ? this.filteredPokemonList : this.pokemonList;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, sourceList.length);

    this.visiblePokemonList = sourceList.slice(startIndex, endIndex);
  }

  // Método para filtrar Pokémon por letra
  applyFilterByLetter(letter: string) {
    this.currentFilter = letter;
    this.filteredPokemonList = this.pokemonFilterService.filterByLetter(this.pokemonList, letter);
    this.loadPokemonPage(1);
  }

  clearFilter() {
    this.currentFilter = null;
    this.filteredPokemonList = [];
    this.loadPokemonPage(1);
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
