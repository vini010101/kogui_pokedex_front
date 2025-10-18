export interface Pokemon {
  id: any;
  name: any;
  types: {
    type: { name: string };
  }[];
  sprites: { front_default: string };
}
