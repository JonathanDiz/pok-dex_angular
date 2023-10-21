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

export interface Pokemon {
  name: string;
  id: number;
  types: PokemonType[];
  sprites: PokemonSprites;
}

export interface PokemonType {
  name: string;
}

export interface PokemonSprites {
  front_default: string;
}