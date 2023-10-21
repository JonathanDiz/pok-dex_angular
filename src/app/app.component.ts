import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'pokedex_angular';
  currentPage: number = 1;
  totalPages: number = 1;
  pokemonList: any[] = [];
  pageChange = new EventEmitter<number>();
}
