export interface PokemonListResponse {
  results: PokemonListItem[];
  count: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetailsResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}