import axios from 'axios';
import redisClient from '../services/redis.service.js';
import { Character } from '../models/Character.js';

export const getCharacters = async (args) => {
  const cacheKey = JSON.stringify(args);
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log('Cache Hit');
    return JSON.parse(cached);
  }

  console.log('Loading Data FROM Rick and Morty API...');
  const { data } = await axios.post('https://rickandmortyapi.com/graphql', {
    query: `
      {
        characters(filter: {
          name: "${args.name || ''}",
          status: "${args.status || ''}",
          species: "${args.species || ''}",
          gender: "${args.gender || ''}"
        }) {
          results {
            id
            name
            status
            species
            gender
            origin {
              name
            }
          }
        }
      }
    `
  });

  const characters = data.data.characters.results.map(c => ({
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin.name
  }));

  for (const char of characters) {
    await Character.upsert(char);
  }

//   CacheHit for  almost 1 hour
  await redisClient.set(cacheKey, JSON.stringify(characters), { EX: 3600 });

  return characters;
};
