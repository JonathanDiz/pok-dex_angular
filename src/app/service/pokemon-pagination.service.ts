import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonPaginationService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private itemsPerPage: number = 20;

  constructor(private httpClient: HttpClient) { }

  getPokemonDetails(name: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${name}`);
  }

  getPokemonList(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}?limit=${this.itemsPerPage}`);
  }

  getPokemonPage(page: number): Observable<any> {
    const offset = (page - 1) * this.itemsPerPage;
    return this.httpClient.get<any>(`${this.apiUrl}?limit=${this.itemsPerPage}&offset=${offset}`);
  }
  
  getPokemonCount(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/?limit=1`);
  }

  getItemsPerPage(): number {
    return this.itemsPerPage;
  }
}

