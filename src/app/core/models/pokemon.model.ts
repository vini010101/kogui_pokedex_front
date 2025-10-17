export interface Pokemon {
  name: any;
  types: {
    type: { name: string };
  }[];
  sprites: { front_default: string };
}
