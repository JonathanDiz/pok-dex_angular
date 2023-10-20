import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {
  nombrePokemon: string = '';
  pokemonList: any[] = [];
  listaPokemon: any[] = [];
  visiblePokemonList: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0; // Define la propiedad totalPages y establece su valor

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.cargarListaPokemon();
  }

  buscarPokemon() {
    this.listaPokemon = [];

    if (this.nombrePokemon) {
      this.pokemonService.getPokemonDetails(this.nombrePokemon).subscribe((data) => {
        this.listaPokemon.push({
          nombre: data.name,
          imagen: data.sprites.front_default
        });
      });
    }
  }

  cargarListaPokemon() {
    this.pokemonService.getPokemonList().subscribe((data) => {
      this.pokemonList = data.results;
      this.totalPages = Math.ceil(data.count / 20); // Calcula el número total de páginas
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadPokemonPage(this.currentPage);
  }

  loadPokemonPage(page: number) {
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Verifica que el rango no supere la longitud de la lista completa
    if (startIndex < this.pokemonList.length) {
      // Actualiza la lista de Pokémones visibles con el rango actual
      this.visiblePokemonList = this.pokemonList.slice(startIndex, endIndex);
      // Actualiza la página actual
      this.currentPage = page;
    }
    console.log(this.pokemonList);
  }
}
