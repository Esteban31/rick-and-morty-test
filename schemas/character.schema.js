import { buildSchema } from 'graphql';
import { getCharacters } from '../controllers/characters.controller.js';

const schema = buildSchema(`
  type Character {
    id: ID!
    name: String
    status: String
    species: String
    gender: String
    origin: String
  }

  type Query {
    characters(
      name: String
      status: String
      species: String
      gender: String
      origin: String
    ): [Character]
  }
`);

export const root = {
  characters: getCharacters
};

export default schema;
