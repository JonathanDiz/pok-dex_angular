import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon-search.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.sass']
})
export class PokemonSearchComponent implements OnInit{
  nombrePokemon: string = '';
  pokemonList: any[] = [];
  listaPokemon: any[] = [];
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 20; // Cantidad de Pokémon por página
  totalPages: number = 0; // Total de páginas disponibles
  
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
      this.totalPages = Math.ceil(data.count / this.itemsPerPage);
    });
  
    // Carga la primera página de Pokémon inicialmente
    this.loadPokemonPage(1);
  }
  
  changePage(page: number) {
    this.currentPage = page;
    this.loadPokemonPage(this.currentPage);
  }
  
  loadPokemonPage(page: number) {
    // Implementa la lógica para cargar Pokémon de la página indicada
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemonPage(this.currentPage);
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPokemonPage(this.currentPage);
    }
  }
  }
  
